import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function submitBridgeCourses(selectedCourses: any[]) {
  return apiRequest(API_ENDPOINTS.registration.submitBridgeCourses, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedCourses),
  });
} 