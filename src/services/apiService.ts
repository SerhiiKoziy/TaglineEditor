import { TaglineConfig } from '../types';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://api') {
    this.baseUrl = baseUrl;
  }

  async saveTaglineConfig(config: TaglineConfig): Promise<void> {
    try {
      // In production, replace with actual API call
      const response = await fetch(`${this.baseUrl}/tagline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // For now, log to console (simulating API)
      console.log('POST http://api/tagline', config);
    } catch (error) {
      console.error('Failed to save tagline config:', error);
      throw error;
    }
  }

  async loadTaglineConfig(): Promise<TaglineConfig | null> {
    try {
      const response = await fetch(`${this.baseUrl}/tagline`, {
        method: 'GET',
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // No config exists yet
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to load tagline config:', error);
      return null; // Return null on error, app will use defaults
    }
  }
}

export const apiService = new ApiService();
