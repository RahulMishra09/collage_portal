import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchProfileData(enrollmentNumber: string) {
  return apiRequest(API_ENDPOINTS.profile.profile(enrollmentNumber));
} 