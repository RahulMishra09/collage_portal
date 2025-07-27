import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function submitOpenElectiveCourses(selectedCourses: any[]) {
  return apiRequest(API_ENDPOINTS.registration.submitOpenElectiveCourses, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedCourses),
  });
} 