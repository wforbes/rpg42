import { RepositoryFactory } from "@/db/infra/repos/RepositoryFactory";
import { loginUserSchema } from "@/db/validation";
import { User } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validation = loginUserSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json(
				{ message: 'Invalid request body', errors: validation.error.flatten().fieldErrors },
				{ status: 400 }
			);
		}
		const { usernameEmail, password } = validation.data;
		const user: User | null = (usernameEmail.includes('@'))
			? await RepositoryFactory.getUserRepository().getUserByEmail(usernameEmail)
			: await RepositoryFactory.getUserRepository().getUserByUsername(usernameEmail);
		if (!user) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		}
		const passwordMatch = await compare(password, user.passhash);
		if (!passwordMatch) {
			return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
		}

		await createSession(user.id);

		return NextResponse.json({ message: 'Login successful', user: user }, { status: 200 });
	} catch (error: any) {
		console.error('Login error:', error);
		return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
	}
}
