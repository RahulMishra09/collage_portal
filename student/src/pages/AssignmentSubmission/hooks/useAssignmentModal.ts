import { useState, useEffect, useCallback } from 'react';
import { fetchAssignments, fetchSubjects, fetchConstants } from '../api/assignmentApi';
import type { Assignment, Subject } from '../types/index';
import { toast } from 'sonner';

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [constants, setConstants] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);
    
    try {
      // Try to load all data from API
      const [assignmentsData, subjectsData, constantsData] = await Promise.allSettled([
        fetchAssignments(),
        fetchSubjects(),
        fetchConstants(),
      ]);

      let hasApiFailure = false;

      // Handle assignments
      if (assignmentsData.status === 'fulfilled') {
        setAssignments(assignmentsData.value);
      } else {
        hasApiFailure = true;
        console.error('Failed to load assignments:', assignmentsData.reason);
      }

      // Handle subjects
      if (subjectsData.status === 'fulfilled') {
        setSubjects(subjectsData.value);
      } else {
        hasApiFailure = true;
        console.error('Failed to load subjects:', subjectsData.reason);
      }

      // Handle constants
      if (constantsData.status === 'fulfilled') {
        setConstants(constantsData.value);
      } else {
        hasApiFailure = true;
        console.error('Failed to load constants:', constantsData.reason);
      }

      if (hasApiFailure) {
        setUsingFallback(true);
        setError('Some data loaded from local files due to API issues.');
        toast.warning('API Connection Issue', {
          description: 'Using offline data. Some features may be limited.',
        });
      }

    } catch (err: any) {
      setError('Failed to load assignment data.');
      setUsingFallback(true);
      toast.error('Data Loading Error', {
        description: 'Unable to load assignment data. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    assignments,
    subjects,
    constants,
    loading,
    error,
    usingFallback,
    loadAllData,
    setAssignments,
  };
}