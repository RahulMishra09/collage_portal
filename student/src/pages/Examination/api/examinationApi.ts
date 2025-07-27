// API functions for Examination page
import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchExamSchedules() {
  return apiRequest(API_ENDPOINTS.examination.schedules);
} 