import { InsertUserDTO, User } from '@/db/models/User';

export interface IUserRepository {
	create(user: InsertUserDTO): Promise<{ success: boolean, data: User }>;
	getUserByUsername(username: string): Promise<User | null>;
	getUserByEmail(email: string): Promise<User | null>;
}
