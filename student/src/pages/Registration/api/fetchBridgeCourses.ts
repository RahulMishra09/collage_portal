import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchBridgeCourses() {
  return apiRequest(API_ENDPOINTS.registration.fetchBridgeCourses);
} 