import type { ApiStudentResponse } from '../models';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchStudentDetail(enrollmentNumber: string): Promise<ApiStudentResponse> {
  return apiRequest<ApiStudentResponse>(API_ENDPOINTS.dashboard.studentDetail(enrollmentNumber));
} 