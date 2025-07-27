import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchMakeUpCourses() {
  return apiRequest(API_ENDPOINTS.registration.fetchMakeUpCourses);
} 