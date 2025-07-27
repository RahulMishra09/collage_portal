import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchSemesterCourses() {
  return apiRequest(API_ENDPOINTS.registration.fetchSemesterCourses);
} 