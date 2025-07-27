// Utility functions for Attendance page

export function getAttendanceStatusClass(percentage: number): string {
  if (percentage >= 90) return "bg-green-500";
  if (percentage >= 80) return "bg-blue-500";
  if (percentage >= 75) return "bg-yellow-500";
  return "bg-red-500";
}

export function getAttendanceStatusText(percentage: number): string {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 80) return "Good";
  if (percentage >= 75) return "Average";
  return "Poor";
}

export function getBadgeVariant(percentage: number): "default" | "secondary" | "destructive" | "outline" {
  if (percentage >= 90) return "default";
  if (percentage >= 80) return "secondary";
  if (percentage >= 75) return "outline";
  return "destructive";
}

export function formatAttendanceDate(date: string): string {
  // Example formatting
  return new Date(date).toLocaleDateString();
} 