import { useEffect, useState } from 'react';
import type { TimetableEntry } from '../models';
import { fetchTodaysLecture } from '../api/fetchTodaysLecture';

export function useTodaysLecture() {
  const [currentLecture, setCurrentLecture] = useState<TimetableEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLecture() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const data = await fetchTodaysLecture(user.enrollmentNumber);
        if (data && data.length > 0) {
          setCurrentLecture(data[0]);
        } else {
          setCurrentLecture(null);
        }
      } catch (error) {
        setCurrentLecture(null);
      } finally {
        setLoading(false);
      }
    }
    loadLecture();
  }, []);

  return { currentLecture, loading };
} 