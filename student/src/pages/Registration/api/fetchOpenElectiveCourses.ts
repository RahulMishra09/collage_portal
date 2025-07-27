import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchOpenElectiveCourses() {
  return apiRequest(API_ENDPOINTS.registration.fetchOpenElectiveCourses);
} 