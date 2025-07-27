import type { Event } from '../models';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchUpcomingEvents(): Promise<Event[]> {
  return apiRequest<Event[]>(API_ENDPOINTS.dashboard.upcomingEvents);
} 