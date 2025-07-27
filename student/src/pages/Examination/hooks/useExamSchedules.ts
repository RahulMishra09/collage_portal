import { useState, useCallback } from 'react';
import { fetchExamSchedules } from '../api/examinationApi';
import type { ExamSchedule } from '../models';

export function useExamSchedules(fallbackExams: ExamSchedule[]) {
  const [exams, setExams] = useState<ExamSchedule[]>(fallbackExams);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExamSchedules = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchExamSchedules() as ExamSchedule[];
      setExams(data);
    } catch (err: any) {
      setError('Failed to fetch exam schedules. Showing fallback data.');
      setExams(fallbackExams);
    } finally {
      setIsLoading(false);
    }
  }, [fallbackExams]);

  return {
    exams,
    isLoading,
    error,
    loadExamSchedules,
    setExams,
  };
} 