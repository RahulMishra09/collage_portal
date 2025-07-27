import { useState, useEffect } from 'react';
import { fetchBridgeCourses } from '../api/fetchBridgeCourses';
import { submitBridgeCourses } from '../api/submitBridgeCourses';
import type { BridgeCourse } from '../models/BridgeCourse';

export function useBridgeCourses() {
  const [courses, setCourses] = useState<BridgeCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      setError(null);
      try {
        const apiData = await fetchBridgeCourses();
        setCourses(apiData as BridgeCourse[]);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const handleSelectToggle = (courseNumber: string) => {
    setCourses(prev => prev.map(course => course.courseNumber === courseNumber ? { ...course, selected: !course.selected } : course));
  };

  const handleSubmit = async () => {
    const selectedCourses = courses.filter(c => c.selected);
    return submitBridgeCourses(selectedCourses);
  };

  return { courses, loading, error, handleSelectToggle, handleSubmit };
} 