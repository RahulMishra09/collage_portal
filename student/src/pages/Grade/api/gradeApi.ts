// API functions for Grade page
import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchGrades(semester: string) {
  return apiRequest(API_ENDPOINTS.grade.grades(semester));
} 