import { ApiError } from '../errors/ApiError';

// Centralized API client for the project
export async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    let data: unknown = undefined;
    try {
      data = await response.json();
    } catch {
      data = undefined;
    }
    if (!response.ok) {
      throw new ApiError(
        response.status,
        (data && typeof data === 'object' && 'message' in data ? (data as { message?: string }).message : undefined) || response.statusText,
        data
      );
    }
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(0, 'Network error', error);
  }
} 