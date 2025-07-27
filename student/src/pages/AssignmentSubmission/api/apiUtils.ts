import { ApiError } from '../../../errors/ApiError';

/**
 * Enhanced error handling specifically for assignment operations
 */
export class AssignmentApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public endpoint: string,
    public data?: any
  ) {
    super(message);
    this.name = 'AssignmentApiError';
  }
}

/**
 * Retry mechanism for API calls
 */
export async function retryApiCall<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error as Error;
      console.warn(`API call failed (attempt ${i + 1}/${maxRetries}):`, error);
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i))); // Exponential backoff
      }
    }
  }
  
  throw lastError!;
}

/**
 * Check if we should use fallback data based on error type
 */
export function shouldUseFallback(error: any): boolean {
  // Use fallback for network errors, timeouts, or server errors
  if (error instanceof ApiError) {
    return error.status === 0 || error.status >= 500 || error.status === 404;
  }
  
  // Use fallback for network errors
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return true;
  }
  
  // Use fallback for timeout errors
  if (error.name === 'AbortError' || error.message.includes('timeout')) {
    return true;
  }
  
  return false;
}

/**
 * Load fallback data with error handling
 */
export async function loadFallbackData<T>(
  filePath: string,
  dataType: string = 'data'
): Promise<T> {
  try {
    console.log(`Loading ${dataType} from fallback file: ${filePath}`);
    const response = await fetch(filePath);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${dataType}: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Successfully loaded ${dataType} from fallback (${Array.isArray(data) ? data.length : 'object'} items)`);
    return data;
  } catch (error) {
    console.error(`Failed to load ${dataType} from fallback file ${filePath}:`, error);
    throw new Error(`Unable to load ${dataType} from both API and fallback file`);
  }
}

/**
 * API call wrapper with automatic fallback
 */
export async function apiCallWithFallback<T>(
  apiCall: () => Promise<T>,
  fallbackPath: string,
  dataType: string = 'data'
): Promise<{ data: T; fromFallback: boolean }> {
  try {
    const data = await apiCall();
    console.log(`Successfully loaded ${dataType} from API`);
    return { data, fromFallback: false };
  } catch (error) {
    console.warn(`API call failed for ${dataType}, trying fallback...`, error);
    
    if (shouldUseFallback(error)) {
      try {
        const fallbackData = await loadFallbackData<T>(fallbackPath, dataType);
        return { data: fallbackData, fromFallback: true };
      } catch (fallbackError) {
        console.error(`Fallback also failed for ${dataType}:`, fallbackError);
        throw fallbackError;
      }
    } else {
      // If it's not a network/server error, don't use fallback
      throw error;
    }
  }
}

/**
 * Batch API calls with individual fallbacks
 */
export async function batchApiCallsWithFallback<T extends Record<string, any>>(
  calls: Array<{
    key: keyof T;
    apiCall: () => Promise<T[keyof T]>;
    fallbackPath: string;
    dataType: string;
    required?: boolean;
  }>
): Promise<{ data: T; fallbackInfo: Record<keyof T, boolean> }> {
  const results = await Promise.allSettled(
    calls.map(async (call) => {
      try {
        const result = await apiCallWithFallback(call.apiCall, call.fallbackPath, call.dataType);
        return {
          key: call.key,
          data: result.data,
          fromFallback: result.fromFallback,
          success: true,
        };
      } catch (error) {
        if (call.required) {
          throw error;
        }
        console.warn(`Optional API call failed for ${call.dataType}:`, error);
        return {
          key: call.key,
          data: null,
          fromFallback: false,
          success: false,
        };
      }
    })
  );

  const data = {} as T;
  const fallbackInfo = {} as Record<keyof T, boolean>;

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      const { key, data: itemData, fromFallback } = result.value;
      data[key] = itemData;
      fallbackInfo[key] = fromFallback;
    } else {
      const call = calls[index];
      console.error(`Failed to load ${call.dataType}:`, result.status === 'rejected' ? result.reason : 'Unknown error');
    }
  });

  return { data, fallbackInfo };
}

/**
 * File upload progress tracking
 */
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  file: string;
}

export function createProgressTracker(
  onProgress: (progress: UploadProgress) => void
): (event: ProgressEvent, fileName: string) => void {
  return (event: ProgressEvent, fileName: string) => {
    if (event.lengthComputable) {
      const percentage = Math.round((event.loaded / event.total) * 100);
      onProgress({
        loaded: event.loaded,
        total: event.total,
        percentage,
        file: fileName,
      });
    }
  };
}

/**
 * Enhanced file upload with progress tracking
 */
export async function uploadWithProgress(
  url: string,
  formData: FormData,
  onProgress?: (progress: UploadProgress) => void
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (onProgress && event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        onProgress({
          loaded: event.loaded,
          total: event.total,
          percentage,
          file: 'upload',
        });
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(new Response(xhr.response, {
          status: xhr.status,
          statusText: xhr.statusText,
        }));
      } else {
        reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.addEventListener('timeout', () => {
      reject(new Error('Upload timeout'));
    });

    xhr.open('POST', url);
    xhr.timeout = 300000; // 5 minutes timeout
    xhr.send(formData);
  });
}

/**
 * Cache management for assignment data
 */
class AssignmentCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  // Get keys that match a pattern
  getKeysMatching(pattern: RegExp): string[] {
    return Array.from(this.cache.keys()).filter(key => pattern.test(key));
  }

  // Clear all cached data for a specific assignment
  clearAssignmentData(assignmentId: string): void {
    const pattern = new RegExp(`assignment_${assignmentId}`);
    const keys = this.getKeysMatching(pattern);
    keys.forEach(key => this.cache.delete(key));
  }
}

export const assignmentCache = new AssignmentCache();

/**
 * Cached API call wrapper
 */
export async function cachedApiCall<T>(
  key: string,
  apiCall: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Check cache first
  const cached = assignmentCache.get<T>(key);
  if (cached) {
    console.log(`Using cached data for ${key}`);
    return cached;
  }

  // Make API call and cache result
  try {
    const data = await apiCall();
    assignmentCache.set(key, data, ttl);
    return data;
  } catch (error) {
    console.error(`Failed to fetch and cache ${key}:`, error);
    throw error;
  }
}

/**
 * URL and file utilities
 */
export function getFileExtension(filename: string): string {
  return '.' + filename.split('.').pop()?.toLowerCase() || '';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isImageFile(filename: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];
  return imageExtensions.includes(getFileExtension(filename));
}

export function isDocumentFile(filename: string): boolean {
  const docExtensions = ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt'];
  return docExtensions.includes(getFileExtension(filename));
}

export function isCodeFile(filename: string): boolean {
  const codeExtensions = ['.js', '.ts', '.py', '.java', '.cpp', '.c', '.html', '.css', '.jsx', '.tsx'];
  return codeExtensions.includes(getFileExtension(filename));
}

export function getFileIcon(filename: string): string {
  const extension = getFileExtension(filename);
  
  if (isImageFile(filename)) return '🖼️';
  if (isDocumentFile(filename)) return '📄';
  if (isCodeFile(filename)) return '💻';
  if (['.zip', '.rar', '.7z'].includes(extension)) return '📦';
  if (['.mp4', '.avi', '.mov'].includes(extension)) return '🎥';
  if (['.mp3', '.wav', '.flac'].includes(extension)) return '🎵';
  
  return '📁';
}

/**
 * Date and time utilities for assignments
 */
export function formatDateForAPI(date: Date): string {
  return date.toISOString();
}

export function parseAPIDate(dateString: string): Date {
  return new Date(dateString);
}

export function isAssignmentDue(dueDate: string, bufferHours: number = 0): boolean {
  const due = new Date(dueDate);
  const now = new Date();
  const buffer = bufferHours * 60 * 60 * 1000; // Convert hours to milliseconds
  
  return now.getTime() > (due.getTime() - buffer);
}

export function getTimeUntilDue(dueDate: string): {
  days: number;
  hours: number;
  minutes: number;
  isOverdue: boolean;
} {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = due.getTime() - now.getTime();
  
  if (diff < 0) {
    return { days: 0, hours: 0, minutes: 0, isOverdue: true };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes, isOverdue: false };
}

/**
 * Network status detection
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

export function setupNetworkListener(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  const handleOnline = () => {
    console.log('Network connection restored');
    onOnline();
  };
  
  const handleOffline = () => {
    console.log('Network connection lost');
    onOffline();
  };
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}

/**
 * Debug utilities for development
 */
export const debugLog = {
  api: (endpoint: string, method: string = 'GET', data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`🔗 API Call: ${method} ${endpoint}`);
      if (data) console.log('Data:', data);
      console.groupEnd();
    }
  },
  
  fallback: (dataType: string, path: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`⚠️ Using fallback data for ${dataType} from ${path}`);
    }
  },
  
  cache: (key: string, hit: boolean) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`💾 Cache ${hit ? 'HIT' : 'MISS'} for ${key}`);
    }
  },
  
  error: (context: string, error: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.group(`❌ Error in ${context}`);
      console.error(error);
      console.groupEnd();
    }
  }
};