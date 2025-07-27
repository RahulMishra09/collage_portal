import { useState, useEffect } from 'react';
import { fetchSemesterCourses } from '../api/fetchSemesterCourses';
import { registerSemesterCourses } from '../api/registerSemesterCourses';
import { mapApiToSemesterCourses, parseCourseId } from '../utils/semesterCourseUtils';
import type { SemesterCourses } from '../models/SemesterCourse';
import type { ApiCourse } from '../models/ApiCourse';

export function useSemesterCourses() {
  const [courses, setCourses] = useState<SemesterCourses[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      setError(null);
      try {
        const apiData = await fetchSemesterCourses();
        setCourses(mapApiToSemesterCourses(apiData as ApiCourse[]));
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

  const handleRegister = async () => {
    const selectedCourses = courses.filter(c => c.selected);
    const registrationRequests = selectedCourses.map(course => ({
      enrollment_number: JSON.parse(localStorage.getItem('user') || '{}').enrollmentNumber,
      course_id: parseCourseId(course.description),
      status: 'registered',
    }));
    return registerSemesterCourses(registrationRequests);
  };

  return { courses, loading, error, handleSelectToggle, handleRegister };
} 