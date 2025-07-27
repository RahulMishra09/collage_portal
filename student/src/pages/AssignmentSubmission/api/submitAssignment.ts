import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';
import type { AssignmentFormData, AssignmentSubmissionResponse } from '../models';

export async function submitAssignment(
  formData: AssignmentFormData, 
  files: string[]
): Promise<AssignmentSubmissionResponse> {
  return apiRequest<AssignmentSubmissionResponse>(API_ENDPOINTS.assignments.submit, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formData, files }),
  });
}