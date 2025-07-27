import type { TimetableEntry } from '../models';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchTodaysLecture(enrollmentNumber: string): Promise<TimetableEntry[]> {
  const url = new URL(API_ENDPOINTS.dashboard.timetable);
  url.searchParams.append('enrollment_number', enrollmentNumber);
  return apiRequest<TimetableEntry[]>(url.toString());
} 