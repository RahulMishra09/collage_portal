import { useState, useMemo } from 'react';
import type { Assignment } from '../types';

export function useAssignmentFilters(assignments: Assignment[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'status' | 'title'>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedAssignments = useMemo(() => {
    let filtered = assignments.filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
      const matchesSubject = subjectFilter === 'all' || assignment.courseId === subjectFilter;
      
      return matchesSearch && matchesStatus && matchesSubject;
    });

    // Sort assignments
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [assignments, searchTerm, statusFilter, subjectFilter, sortBy, sortDirection]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSubjectFilter('all');
    setSortBy('dueDate');
    setSortDirection('asc');
  };

  return {
    searchTerm,
    statusFilter,
    subjectFilter,
    sortBy,
    sortDirection,
    setSearchTerm,
    setStatusFilter,
    setSubjectFilter,
    setSortBy,
    setSortDirection,
    filteredAndSortedAssignments,
    resetFilters,
  };
}