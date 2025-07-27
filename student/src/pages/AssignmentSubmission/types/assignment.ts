export interface Assignment {
  id: string;
  title: string;
  subject: string;
  subjectName: string;
  description: string;
  instructions?: string;
  dueDate: string;
  dueTime: string;
  maxMarks: number;
  fileTypes: string[];
  maxFileSize: string;
  status: 'pending' | 'submitted' | 'overdue' | 'graded';
  submittedAt?: string;
  grade?: number;
  feedback?: string;
  submittedFiles?: SubmittedFile[];
  createdAt: string;
  professorName?: string;
  rubric?: AssignmentRubric[];
}

export interface SubmittedFile {
  id?: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  downloadUrl?: string;
}

export interface AssignmentRubric {
  criteria: string;
  maxPoints: number;
  description: string;
}

export interface Subject {
  code: string;
  name: string;
  semester: string;
  credits: number;
}

export interface AssignmentSubmission {
  assignmentId: string;
  files: File[];
  comments?: string;
  submittedAt: string;
}

export interface AssignmentFilter {
  subject: string;
  status: string;
  semester: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface AssignmentStats {
  total: number;
  pending: number;
  submitted: number;
  graded: number;
  overdue: number;
  averageGrade: number;
}

// API Response Types
export interface ApiAssignmentResponse {
  assignment_id: string;
  title: string;
  description: string;
  instructions?: string;
  subject_code: string;
  subject_name: string;
  due_date: string;
  due_time: string;
  max_marks: number;
  allowed_file_types: string[];
  max_file_size_mb: number;
  status: string;
  created_at: string;
  professor_name?: string;
  submitted_at?: string;
  grade?: number;
  feedback?: string;
  submitted_files?: ApiSubmittedFile[];
  rubric?: ApiAssignmentRubric[];
}

export interface ApiSubmittedFile {
  file_id: string;
  original_name: string;
  file_size_bytes: number;
  file_type: string;
  uploaded_at: string;
  download_url: string;
}

export interface ApiAssignmentRubric {
  criteria: string;
  max_points: number;
  description: string;
}

export interface ApiSubmissionResponse {
  success: boolean;
  message: string;
  submission_id?: string;
  submitted_files?: ApiSubmittedFile[];
}

export interface FileValidationError {
  fileName: string;
  error: string;
}