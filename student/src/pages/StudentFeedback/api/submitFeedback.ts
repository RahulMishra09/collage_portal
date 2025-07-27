import type { FeedbackForm } from '../models';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function submitFeedback(feedback: FeedbackForm) {
  return apiRequest(API_ENDPOINTS.studentFeedback.submit, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
} 