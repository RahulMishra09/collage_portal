import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchReRegistrationCourses() {
  return apiRequest(API_ENDPOINTS.registration.fetchReRegistrationCourses);
} 