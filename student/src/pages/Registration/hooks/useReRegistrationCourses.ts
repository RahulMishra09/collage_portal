import { useState, useEffect } from 'react';
import { fetchReRegistrationCourses } from '../api/fetchReRegistrationCourses';
import { submitReRegistrationCourses } from '../api/submitReRegistrationCourses';
import type { ReRegistrationCourse } from '../models/ReRegistrationCourse';

export function useReRegistrationCourses() {
  const [courses, setCourses] = useState<ReRegistrationCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      setError(null);
      try {
        const apiData = await fetchReRegistrationCourses();
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
    return submitReRegistrationCourses(selectedCourses);
  };

  return { courses, loading, error, handleSelectToggle, handleSubmit };
} 