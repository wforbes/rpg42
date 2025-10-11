import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { IClientProvider } from './IClientProvider';
import * as schema from '@/db/drizzle/schema';

export type DrizzleDB = NodePgDatabase<typeof schema>;

export class DrizzleClientProvider implements IClientProvider<DrizzleDB> {
	private static dbInstance: DrizzleDB;
	private static pgPool: Pool;

	getClient(): any {
		if (!DrizzleClientProvider.pgPool) {
			DrizzleClientProvider.pgPool = new Pool({
				connectionString: process.env.DATABASE_URL
			});
		}
		if (!DrizzleClientProvider.dbInstance) {
			DrizzleClientProvider.dbInstance = drizzle(DrizzleClientProvider.pgPool, { schema });
		}
		return DrizzleClientProvider.dbInstance;
	}
}
