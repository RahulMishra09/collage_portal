// API functions for Dashboard page
import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchTimetableData(enrollmentNumber: string) {
  const url = new URL(API_ENDPOINTS.dashboard.timetable);
  url.searchParams.append('enrollment_number', enrollmentNumber);
  return apiRequest(url.toString());
} 