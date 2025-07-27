export interface AssignmentFormData {
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
}

export interface AssignmentSubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
}
