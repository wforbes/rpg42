import { DrizzleClientProvider } from '../providers/DrizzleClientProvider';
import { IClientProvider } from '../providers/IClientProvider';
import { IUserRepository } from '../interfaces/IUserRepository';
import { UserRepository } from './UserRepository';

// The Repository Factory provides a single point of access to all repositories.
// It ensures that we use a single instance of each repository (Singleton pattern).
export class RepositoryFactory {
  private static userRepository: IUserRepository;

  // A generic helper to create any repository.
  private static createRepository<T>(
    RepositoryClass: { new (provider: IClientProvider): T },
    provider: IClientProvider
  ): T {
    return new RepositoryClass(provider);
  }

  // The public method to get the UserRepository.
  public static getUserRepository(): IUserRepository {
    if (!this.userRepository) {
      const provider = new DrizzleClientProvider();
      this.userRepository = this.createRepository(UserRepository, provider);
    }
    return this.userRepository;
  }
}
