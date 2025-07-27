// src/pages/Assignment/utils/index.ts
import type { FileValidationError } from '../types';

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  return allowedTypes.includes(fileExtension);
}

export function validateFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

export function validateFiles(files: File[], allowedTypes: string[], maxSizeMB: number): FileValidationError[] {
  const errors: FileValidationError[] = [];

  files.forEach(file => {
    if (!validateFileType(file, allowedTypes)) {
      errors.push({
        fileName: file.name,
        error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`
      });
    }

    if (!validateFileSize(file, maxSizeMB)) {
      errors.push({
        fileName: file.name,
        error: `File size exceeds ${maxSizeMB}MB limit`
      });
    }
  });

  return errors;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isAssignmentOverdue(dueDate: string, dueTime: string): boolean {
  const dueDatetime = new Date(`${dueDate}T${dueTime}`);
  return new Date() > dueDatetime;
}

export function getTimeRemaining(dueDate: string, dueTime: string): string {
  const dueDatetime = new Date(`${dueDate}T${dueTime}`);
  const now = new Date();
  const diff = dueDatetime.getTime() - now.getTime();

  if (diff <= 0) return 'Overdue';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days} days remaining`;
  if (hours > 0) return `${hours} hours remaining`;
  return `${minutes} minutes remaining`;
}

export function calculateGradePercentage(grade: number, maxMarks: number): number {
  return Math.round((grade / maxMarks) * 100);
}

export function getGradeColor(percentage: number): string {
  if (percentage >= 90) return 'text-green-600 dark:text-green-400';
  if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
  if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
  if (percentage >= 60) return 'text-orange-600 dark:text-orange-400';
  return 'text-red-600 dark:text-red-400';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400';
    case 'submitted': return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400';
    case 'overdue': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400';
    case 'graded': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400';
    default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-400';
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function sortAssignmentsByDueDate(assignments: any[]): any[] {
  return [...assignments].sort((a, b) => {
    const dateA = new Date(`${a.dueDate}T${a.dueTime}`);
    const dateB = new Date(`${b.dueDate}T${b.dueTime}`);
    return dateA.getTime() - dateB.getTime();
  });
}

export function filterAssignments(assignments: any[], filters: any, searchTerm: string): any[] {
  return assignments.filter(assignment => {
    const matchesSubject = filters.subject === 'all' || assignment.subject === filters.subject;
    const matchesStatus = filters.status === 'all' || assignment.status === filters.status;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subjectName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSubject && matchesStatus && matchesSearch;
  });
}