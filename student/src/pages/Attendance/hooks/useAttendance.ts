import { useState, useEffect } from 'react';
import type { DetailedSubject } from '../models';

// Example hook for Attendance page
export function useAttendance() {
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<DetailedSubject[]>([]);

  useEffect(() => {
    fetch('/src/pages/Attendance/data/subjects.json')
      .then(res => res.json())
      .then(data => setSubjects(data));
  }, []);

  const toggleExpand = (serialNo: number) => {
    setExpandedSubject(prev => (prev === serialNo ? null : serialNo));
  };

  const calculateOverallStats = () => {
    const totalPresent = subjects.reduce((acc, curr) => acc + curr.presentNo, 0);
    const totalAbsent = subjects.reduce((acc, curr) => acc + curr.absentNo, 0);
    const totalClasses = subjects.reduce((acc, curr) => acc + curr.totalClasses, 0);
    const overallPercentage = ((totalPresent / totalClasses) * 100).toFixed(1);
    return {
      totalPresent,
      totalAbsent,
      totalClasses,
      overallPercentage,
    };
  };

  return {
    expandedSubject,
    subjects,
    toggleExpand,
    calculateOverallStats,
  };
} 