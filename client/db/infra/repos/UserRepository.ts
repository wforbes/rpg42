import { InsertUserDTO, User } from '@/db/models/User';
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
}
