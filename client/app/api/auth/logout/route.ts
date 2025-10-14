import { NextRequest, NextResponse } from "next/server";
import { invalidateCurrentSession } from "@/lib/session";

export async function POST(request: NextRequest) {
	try {
		await invalidateCurrentSession();
		return NextResponse.json({ message: "Logged out successfully" });
	} catch (error) {
		return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
	}
}