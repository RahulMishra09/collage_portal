// Utility functions for Examination page

export function getBadgeColor(type: string) {
  switch (type.toLowerCase()) {
    case 'quiz':
      return 'bg-blue-400 dark:bg-blue-600';
    case 'midterm':
      return 'bg-yellow-400 dark:bg-yellow-600';
    case 'final':
      return 'bg-red-400 dark:bg-red-600';
    default:
      return 'bg-green-400 dark:bg-green-600';
  }
} 