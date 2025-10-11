import { IClientProvider } from '../providers/IClientProvider';

export abstract class BaseRepository<T> {
	protected client: T;

	constructor(provider: IClientProvider<T>) {
		this.client = provider.getClient();
	}

	protected handleError(error: Error | unknown): never {
		console.error('Repository Error:', error);
		throw error instanceof Error ? error : new Error(String(error));
	}
}
