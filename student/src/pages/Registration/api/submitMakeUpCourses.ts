import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function submitMakeUpCourses(selectedCourses: any[]) {
  return apiRequest(API_ENDPOINTS.registration.submitMakeUpCourses, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedCourses),
  });
} 