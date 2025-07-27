// Service logic for Attendance page
export function calculateAttendancePercentage(records: { status: string }[]): number {
  const total = records.length;
  const present = records.filter(r => r.status === 'Present').length;
  return total === 0 ? 0 : (present / total) * 100;
} 