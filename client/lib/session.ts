import 'server-only';

import { DrizzleClientProvider } from '@/db/infra/providers/DrizzleClientProvider';
import { sessionsTable, usersTable } from '@/db/drizzle/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { cache } from 'react';

const SESSION_COOKIE_NAME = 'rpg42-session';
const SESSION_EXPIRES_IN = 1000 * 60 * 60 * 24 * 30; // 30 days

const db = new DrizzleClientProvider().getClient();

// --- Core Functions ---

export const createSession = async (userId: string) => {
  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_EXPIRES_IN);

  await db.insert(sessionsTable).values({
    id: sessionId,
    user_id: userId,
    expires_at: expiresAt,
  });

  (await cookies()).set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
};

export const validateSession = cache(async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) {
    return { session: null, user: null };
  }

  const result = await db
    .select({
        session: sessionsTable,
        user: usersTable
    })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.user_id, usersTable.id))
    .where(eq(sessionsTable.id, sessionId));

  if (result.length === 0) {
    return { session: null, user: null };
  }

  const { session, user } = result[0];

  if (session.expires_at < new Date()) {
    await invalidateCurrentSession();
    return { session: null, user: null };
  }

  const { passhash, ...userWithoutPassword } = user;
  return { session, user: userWithoutPassword };
});


export const invalidateCurrentSession = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return;

  await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));

  cookieStore.set(SESSION_COOKIE_NAME, '', {
    expires: new Date(0),
    path: '/',
  });
};
