import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { NewUserSchema } from '@/db/models/User';
import { RepositoryFactory } from '@/db/infra/repos/RepositoryFactory';
import { createSession } from '@/lib/session';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validation = NewUserSchema.safeParse(body);
		if (!validation.success) {
			return NextResponse.json(
				{ message: 'Invalid request body', errors: validation.error.flatten().fieldErrors },
				{ status: 400 }
			);
		}
		const { username, email, password } = validation.data;
		const hashedPassword = await hash(password, 10);
		const userRepository = RepositoryFactory.getUserRepository();
		const { success, data } = await userRepository.create({
			username,
			email,
			passhash: hashedPassword,
		});
		if (!success) {
			return NextResponse.json({ message: 'User creation failed' }, { status: 500 });
		}
		await createSession(data.id);
		const { passhash, ...userWithoutPassword } = data;
		return NextResponse.json(
			{ message: 'Sign-up successful!', user: userWithoutPassword },
			{ status: 201 }
		);
	} catch (error: any) {
		if (error.code === '23505') {
			return NextResponse.json({ message: 'Username or email already exists' }, { status: 409 });
		}
		return NextResponse.json(
			{ message: 'An unexpected error occurred.' },
			{ status: 500 }
		);
	}
}
