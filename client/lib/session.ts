"server-only";
import { cookies } from "next/headers";
import { JWTPayload, SignJWT, jwtVerify } from "jose";

import { Config } from "@/constants/config";
const key = new TextEncoder().encode(process.env.JWT_SECRET!);

const cookie = {
	name: Config.SESSION_COOKIE_NAME,
	options: {
		httpOnly: true,
		secure: true,
		sameSite: "lax" as const,
		path: "/"
	},
	duration: 24 * 60 * 60 * 1000
};

export async function encrypt(payload: JWTPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1day")
		.sign(key);
}

export async function decrypt(token: string) {
	try {
		if (!token) {
			return null;
		}
		const { payload } = await jwtVerify(token, key);
		return payload;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function createSession(userId: string) {
	try {
		const expires = new Date(Date.now() + cookie.duration);
		const session = await encrypt({ userId, expires });
		const cookieStore = await cookies();
		cookieStore.set(cookie.name, session, { ...cookie.options, expires });
		return session;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export async function verifySession(): Promise<{ userId?: string; error?: string }> {
	const _cookie = (await cookies()).get(cookie.name)?.value;
	if (!_cookie) {
		return { error: 'Unauthorized' };
	}
	const session = await decrypt(_cookie);
	const userId = session?.userId as string;
	if (!userId) {
		return { error: "Unauthorized" };
	}
	return { userId };
}

export async function deleteSession() {
	try {
		const cookieStore = await cookies();
		cookieStore.delete(cookie.name);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
} 