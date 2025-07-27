import { useEffect, useState } from 'react';
import type { StudentData } from '../models';
import { fetchStudentDetail } from '../api/fetchStudentDetail';

export function useStudentDetail() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudent() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const data = await fetchStudentDetail(user.enrollmentNumber);
        setStudent({
          name: user.name || 'Student',
          major: 'Batch - ' + (data.batch || 'Unknown'),
          gpa: data.cgpa || 8.75,
          academicStanding: data.academic_standing || "Dean's List",
          credits: data.credits_earned || '42/120',
          majorCode: data.department || 'CS',
          year: data.year_of_study || '3rd',
        });
      } catch (error) {
        setStudent({
          name: 'Student',
          major: 'Computer Science Major',
          gpa: 8.75,
          academicStanding: "Dean's List",
          credits: '42/120',
          majorCode: 'CS',
          year: '3rd',
        });
      } finally {
        setLoading(false);
      }
    }
    loadStudent();
  }, []);

  return { student, loading };
} 