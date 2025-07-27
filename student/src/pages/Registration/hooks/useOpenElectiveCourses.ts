import { useState, useEffect } from 'react';
import { fetchOpenElectiveCourses } from '../api/fetchOpenElectiveCourses';
import { submitOpenElectiveCourses } from '../api/submitOpenElectiveCourses';
import type { OpenElectiveCourse } from '../models/OpenElectiveCourse';

export function useOpenElectiveCourses() {
  const [courses, setCourses] = useState<OpenElectiveCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      setError(null);
      try {
        const apiData = await fetchOpenElectiveCourses();
        setCourses(apiData);
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
    return submitOpenElectiveCourses(selectedCourses);
  };

  return { courses, loading, error, handleSelectToggle, handleSubmit };
} 