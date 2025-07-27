export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  maxScore: number;
  submittedDate?: string;
  status: 'draft' | 'submitted' | 'graded' | 'overdue' | 'pending';
  score?: number;
  feedback?: string;
  attachments?: AssignmentFile[];
  createdDate: string;
  lastModified: string;
  submissionCount: number;
  allowLateSubmission: boolean;
}

export interface AssignmentFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedDate: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  instructor: string;
  semester: string;
  credits: number;
  description: string;
}

export interface Rubric {
  id: string;
  assignmentId: string;
  criteria: RubricCriterion[];
}

export interface RubricCriterion {
  name: string;
  maxPoints: number;
  description: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedDate: string;
  status: 'submitted' | 'graded' | 'late';
  score?: number;
  feedback?: string;
  files: AssignmentFile[];
  attemptNumber: number;
  gradedDate?: string;
  graderComments?: string;
}

export interface AssignmentFormData {
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  maxScore: number;
  allowLateSubmission: boolean;
  instructions?: string;
}

export interface AssignmentListProps {
  assignments: Assignment[];
  onViewAssignment: (id: string) => void;
  onSubmitAssignment: (id: string) => void;
}

export interface AssignmentCardProps {
  assignment: Assignment;
  onView: () => void;
  onSubmit: () => void;
}

export interface AssignmentFilters {
  status: string;
  courseId: string;
  dueDate: string;
  searchTerm: string;
}