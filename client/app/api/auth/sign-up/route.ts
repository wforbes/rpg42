import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { NewUserSchema } from '@/db/models/User';
import { RepositoryFactory } from '@/db/infra/repos/RepositoryFactory';
import { createSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate request body
    const validation = NewUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid request body', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { username, email, password } = validation.data;

    // 2. Hash the password
    const hashedPassword = await hash(password, 10);

    // 3. Call the repository to create the user
    const userRepository = RepositoryFactory.getUserRepository();
    const result = await userRepository.create({
      username,
      email,
      passhash: hashedPassword,
    });

    if (!result.success) {
        return NextResponse.json({ message: 'User creation failed' }, { status: 500 });
    }

    // 4. Create a session for the new user
    await createSession(result.data.id);

    // 5. Return the new user object (without password)
    const { passhash, ...userWithoutPassword } = result.data;
    return NextResponse.json(
      { message: 'Sign-up successful!', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Sign-up error:', error);
    // Handle specific errors, e.g., unique constraint violation
    if (error.code === '23505') { // PostgreSQL unique violation error code
        return NextResponse.json({ message: 'Username or email already exists' }, { status: 409 });
    }
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
