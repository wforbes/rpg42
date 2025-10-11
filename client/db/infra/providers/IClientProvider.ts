// This interface defines the contract for a database client provider.
// It ensures that any provider we use will have a getClient method.
export interface IClientProvider<T> {
  getClient(): T; // Placeholder for the actual Drizzle client type
}
