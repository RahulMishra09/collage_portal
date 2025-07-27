// src/pages/Assignment/hooks/useAssignments.ts
import { useState, useEffect, useCallback } from 'react';
import { 
  fetchAssignments, 
  fetchSubjects, 
  fetchAssignmentStats 
} from '../api';
import type { 
  Assignment, 
  Subject, 
  AssignmentFilter, 
  AssignmentStats 
} from '../types';
import type { UseAssignmentsReturn } from './types';

export function useAssignments(): UseAssignmentsReturn {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [stats, setStats] = useState<AssignmentStats>({
    total: 0,
    pending: 0,
    submitted: 0,
    graded: 0,
    overdue: 0,
    averageGrade: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AssignmentFilter>({
    subject: 'all',
    status: 'all',
    semester: 'all'
  });

  const loadAssignments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const enrollmentNumber = user.enrollmentNumber || 'ENR001';
      
      const [assignmentsData, subjectsData, statsData] = await Promise.all([
        fetchAssignments(enrollmentNumber),
        fetchSubjects(enrollmentNumber),
        fetchAssignmentStats(enrollmentNumber)
      ]);
      
      setAssignments(assignmentsData);
      setSubjects(subjectsData);
      setStats(statsData);
    } catch (err) {
      setError('Failed to load assignments');
      console.error('Error loading assignments:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  // Filter assignments based on current filters
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSubject = filters.subject === 'all' || assignment.subject === filters.subject;
    const matchesStatus = filters.status === 'all' || assignment.status === filters.status;
    
    return matchesSubject && matchesStatus;
  });

  const updateAssignment = useCallback((updatedAssignment: Assignment) => {
    setAssignments(prev => 
      prev.map(assignment => 
        assignment.id === updatedAssignment.id ? updatedAssignment : assignment
      )
    );
    
    // Update stats after assignment update
    const newStats = calculateStats([...assignments.map(a => 
      a.id === updatedAssignment.id ? updatedAssignment : a
    )]);
    setStats(newStats);
  }, [assignments]);

  // Calculate statistics from assignments
  const calculateStats = (assignmentList: Assignment[]): AssignmentStats => {
    const stats: AssignmentStats = {
      total: assignmentList.length,
      pending: 0,
      submitted: 0,
      graded: 0,
      overdue: 0,
      averageGrade: 0
    };

    const gradedAssignments: Assignment[] = [];
    const now = new Date();

    assignmentList.forEach(assignment => {
      // Count by status
      if (assignment.status === 'pending') {
        // Check if overdue
        const dueDate = new Date(`${assignment.dueDate}T${assignment.dueTime}`);
        if (dueDate < now) {
          stats.overdue++;
        } else {
          stats.pending++;
        }
      } else {
        stats[assignment.status]++;
      }

      // Track graded assignments for average calculation
      if (assignment.status === 'graded' && assignment.grade !== undefined) {
        gradedAssignments.push(assignment);
      }
    });

    // Calculate average grade
    if (gradedAssignments.length > 0) {
      const totalPoints = gradedAssignments.reduce((sum, a) => sum + (a.grade || 0), 0);
      const totalMaxPoints = gradedAssignments.reduce((sum, a) => sum + a.maxMarks, 0);
      stats.averageGrade = Math.round((totalPoints / totalMaxPoints) * 100);
    }

    return stats;
  };

  return {
    assignments: filteredAssignments,
    allAssignments: assignments,
    subjects,
    stats,
    loading,
    error,
    filters,
    setFilters,
    refreshAssignments: loadAssignments,
    updateAssignment
  };
}