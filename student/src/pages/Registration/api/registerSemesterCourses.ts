import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function registerSemesterCourses(requests: any[]) {
  return Promise.all(
    requests.map(request =>
      apiRequest(API_ENDPOINTS.registration.registerSemesterCourses, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request),
      })
    )
  );
} 