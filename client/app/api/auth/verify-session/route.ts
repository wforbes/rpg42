import { invalidateCurrentSession, validateSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		const { user } = await validateSession();
		if (!user) {
			await invalidateCurrentSession();
		}
		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to validate session' }, { status: 500 });
	}
}