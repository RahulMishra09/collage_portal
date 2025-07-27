import { useState, useEffect } from 'react';
import type { ExamSchedule } from '../models';

export function useExaminationData() {
  const [fallbackExams, setFallbackExams] = useState<ExamSchedule[]>([]);

  useEffect(() => {
    fetch('/src/pages/Examination/data/fallbackExams.json')
      .then(res => res.json())
      .then(setFallbackExams);
  }, []);

  return {
    fallbackExams,
    setFallbackExams,
  };
} 