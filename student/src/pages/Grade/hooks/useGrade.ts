import { useState, useEffect } from 'react';
import { GRADE_FALLBACK_DATA } from '../constants/gradeData';
import { fetchGrades } from '../api/gradeApi';
import type { Course } from '../models';

export function useGrade() {
  const [selectedSemester, setSelectedSemester] = useState('V');
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const semesters = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchGrades(selectedSemester)
      .then((data) => {
        if (Array.isArray(data)) {
          setCourseData(data as Course[]);
          setError(null);
        } else {
          setCourseData(GRADE_FALLBACK_DATA);
          setError('Failed to load data from API. Showing fallback data instead.');
        }
      })
      .catch(() => {
        setCourseData(GRADE_FALLBACK_DATA);
        setError('Failed to load data from API. Showing fallback data instead.');
      })
      .finally(() => setLoading(false));
  }, [selectedSemester]);

  return {
    selectedSemester,
    setSelectedSemester,
    showSemesterDropdown,
    setShowSemesterDropdown,
    loading,
    courseData,
    error,
    semesters,
  };
} 