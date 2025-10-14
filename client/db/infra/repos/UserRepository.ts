import { eq } from 'drizzle-orm';
import { InsertUserDTO, User, UserNoPasshash } from '@/db/models/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { BaseRepository } from './BaseRepository';
import { DrizzleClientProvider } from '../providers/DrizzleClientProvider';
import { DrizzleDB } from '@/db/infra/providers/DrizzleClientProvider';
import { usersTable } from '@/db/drizzle/schema';


export class UserRepository extends BaseRepository<DrizzleDB> implements IUserRepository {
	constructor() {
		super(new DrizzleClientProvider());
	}

	public async create(user: InsertUserDTO): Promise<{ success: boolean, data: User }> {
		try {
			const result = await this.client.insert(usersTable)
				.values(user)
				.returning();
			if (result.length === 0) throw new Error('User creation failed');
			return { success: true, data: result[0] as User };
		} catch (error) {
			this.handleError(error);
		}
	}

	public async getUserByUsername(username: string): Promise<User | null> {
		try {
			const result = await this.client.select()
				.from(usersTable)
				.where(eq(usersTable.username, username));
			return result.length > 0 ? result[0] as User : null;
		} catch (error) {
			this.handleError(error);
		}
	}

	public async getUserByEmail(email: string): Promise<User | null> {
		try {
			const result = await this.client.select()
				.from(usersTable)
				.where(eq(usersTable.email, email));
			return result.length > 0 ? result[0] as User : null;
		} catch (error) {
			this.handleError(error);
		}
	}
}
