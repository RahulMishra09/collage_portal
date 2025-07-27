// src/pages/AssignmentSubmission/utils/index.ts
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'submitted':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'overdue':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'draft':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'graded':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getTimeRemaining(dueDate: string): string {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  
  if (diffMs < 0) {
    return 'Overdue';
  }
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} remaining`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} remaining`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} remaining`;
  } else {
    return 'Due soon';
  }
}

export function formatDate(date: string): string {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function calculateGradePercentage(score: number, maxScore: number): number {
  if (maxScore === 0) return 0;
  return Math.round((score / maxScore) * 100);
}

export function getGradeColor(percentage: number): string {
  if (percentage >= 90) return 'text-green-600 bg-green-50';
  if (percentage >= 80) return 'text-blue-600 bg-blue-50';
  if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
  if (percentage >= 60) return 'text-orange-600 bg-orange-50';
  return 'text-red-600 bg-red-50';
}

export function getGradeLetter(percentage: number): string {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
}

export function isAssignmentOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date();
}

export function getAssignmentUrgency(dueDate: string): 'low' | 'medium' | 'high' | 'overdue' {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  
  if (diffMs < 0) return 'overdue';
  if (diffHours < 24) return 'high';
  if (diffHours < 72) return 'medium';
  return 'low';
}


// File type validation
export const ALLOWED_FILE_TYPES = [
  '.pdf', '.doc', '.docx', '.txt', '.zip', '.rar',
  '.jpg', '.jpeg', '.png', '.gif',
  '.py', '.js', '.ts', '.java', '.cpp', '.c'
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export function validateFileType(fileName: string): boolean {
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  return ALLOWED_FILE_TYPES.includes(extension);
}

export function validateFileSize(fileSize: number): boolean {
  return fileSize <= MAX_FILE_SIZE;
}