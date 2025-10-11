import { InsertUserDTO } from '@/db/models/User';

// This interface defines the contract for all user-related data access operations.
// Any class that handles user data must implement this interface.
export interface IUserRepository {
  create(user: InsertUserDTO): Promise<any>; // Placeholder for the returned user type
  // Later, we might add:
  // findByEmail(email: string): Promise<any | null>;
}
