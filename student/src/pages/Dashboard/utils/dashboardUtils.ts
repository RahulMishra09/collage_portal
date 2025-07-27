// Utility functions for Dashboard page

export function formatClassTime(start: string, end: string): string {
  return `${start.substring(0, 5)} - ${end.substring(0, 5)}`;
} 