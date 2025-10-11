import { z } from 'zod';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import {
	usersTable
} from '@/db/drizzle/schema';

export const baseUserDrizzleSchema = createSelectSchema(usersTable);

export const UserSchema = baseUserDrizzleSchema;
export type User = z.infer<typeof UserSchema>;

export const NewUserSchema = UserSchema.omit({
	id: true,
	passhash: true,
	created_at: true,
	updated_at: true,
	email_verified: true
}).extend({
	password: z.string().min(8, 'Password must be at least 8 characters.')
});

export type NewUserDTO = z.input<typeof NewUserSchema>;

export const InsertUserSchema = createInsertSchema(usersTable, {
	email: z.email('Invalid email address.'),
	passhash: z.string().min(8, 'Password must be at least 8 characters.')
});

export type InsertUserDTO = z.input<typeof InsertUserSchema>;