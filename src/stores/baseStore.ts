/**
 * Base store class with common functionality
 * Can be extended by other stores for consistency
 * Note: MobX observability should be set up in child classes using makeObservable
 */
export abstract class BaseStore {
  isLoading = false;
  error: string | null = null;

  protected setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  protected setError(error: string | null) {
    this.error = error;
  }

  protected clearError() {
    this.error = null;
  }

  protected async executeWithErrorHandling<T>(
    operation: () => Promise<T>,
    errorMessage: string = 'An error occurred'
  ): Promise<T | null> {
    try {
      this.setLoading(true);
      this.clearError();
      return await operation();
    } catch (error) {
      const message = error instanceof Error ? error.message : errorMessage;
      this.setError(message);
      console.error(errorMessage, error);
      return null;
    } finally {
      this.setLoading(false);
    }
  }
}
