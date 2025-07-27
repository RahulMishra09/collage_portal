import { useState, useEffect } from 'react';
import { fetchMakeUpCourses } from '../api/fetchMakeUpCourses';
import { submitMakeUpCourses } from '../api/submitMakeUpCourses';
import type { MakeUpCourse } from '../models/MakeUpCourse';

export function useMakeUpCourses() {
  const [courses, setCourses] = useState<MakeUpCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      setError(null);
      try {
        const apiData = await fetchMakeUpCourses();
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
    return submitMakeUpCourses(selectedCourses);
  };

  return { courses, loading, error, handleSelectToggle, handleSubmit };
} 