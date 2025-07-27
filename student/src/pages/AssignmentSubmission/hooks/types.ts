// src/pages/Assignment/hooks/types.ts
import type { Assignment, Subject, AssignmentFilter, AssignmentStats } from '../types';

export interface UseAssignmentsReturn {
  assignments: Assignment[];
  allAssignments: Assignment[];
  subjects: Subject[];
  stats: AssignmentStats;
  loading: boolean;
  error: string | null;
  filters: AssignmentFilter;
  setFilters: (filters: AssignmentFilter) => void;
  refreshAssignments: () => Promise<void>;
  updateAssignment: (assignment: Assignment) => void;
}

export interface UseAssignmentSubmissionReturn {
  submit: (assignment: Assignment, files: File[], comments?: string) => Promise<boolean>;
  submitting: boolean;
  error: string | null;
  success: boolean;
  clearMessages: () => void;
}

export interface UseFileValidationReturn {
  selectedFiles: File[];
  fileErrors: string[];
  validateAndAddFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  clearFiles: () => void;
  getTotalSize: () => string;
  hasFiles: boolean;
  fileCount: number;
}

export interface UseAssignmentModalReturn {
  selectedAssignment: Assignment | null;
  showSubmissionModal: boolean;
  showDetailsModal: boolean;
  openSubmissionModal: (assignment: Assignment) => void;
  openDetailsModal: (assignment: Assignment) => void;
  closeModals: () => void;
}