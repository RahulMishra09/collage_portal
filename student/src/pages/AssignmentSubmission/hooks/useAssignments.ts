// src/pages/AssignmentSubmission/hooks/useAssignments.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchAssignments, fetchSubjects, fetchConstants } from '../api/assignmentApi';
import type { Assignment, Subject } from '../types';
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
      // Try to load assignments first with fallback
      try {
        const assignmentsData = await fetchAssignments();
        setAssignments(Array.isArray(assignmentsData) ? assignmentsData : []);
      } catch (assignmentError) {
        console.error('Failed to load assignments:', assignmentError);
        setAssignments([]); // Set empty array as fallback
        setUsingFallback(true);
        setError('Failed to load assignments. Please check your connection.');
      }

      // Try to load subjects with fallback
      try {
        const subjectsData = await fetchSubjects();
        setSubjects(Array.isArray(subjectsData) ? subjectsData : []);
      } catch (subjectError) {
        console.error('Failed to load subjects:', subjectError);
        setSubjects([]); // Set empty array as fallback
      }

      // Try to load constants with fallback
      try {
        const constantsData = await fetchConstants();
        setConstants(constantsData || getDefaultConstants());
      } catch (constantsError) {
        console.error('Failed to load constants:', constantsError);
        setConstants(getDefaultConstants());
      }

    } catch (err: any) {
      console.error('Critical error loading data:', err);
      setError('Failed to load assignment data.');
      setUsingFallback(true);
      // Ensure we always have arrays/objects even on complete failure
      setAssignments([]);
      setSubjects([]);
      setConstants(getDefaultConstants());
      
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
    assignments: assignments || [], // Ensure it's always an array
    subjects: subjects || [], // Ensure it's always an array
    constants: constants || getDefaultConstants(),
    loading,
    error,
    usingFallback,
    loadAllData,
    setAssignments,
  };
}

// Default constants fallback
function getDefaultConstants() {
  return {
    statusOptions: [
      { value: "all", label: "All Assignments" },
      { value: "pending", label: "Pending" },
      { value: "submitted", label: "Submitted" },
      { value: "graded", label: "Graded" },
      { value: "overdue", label: "Overdue" },
      { value: "draft", label: "Draft" }
    ],
    urgencyColors: {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      overdue: "bg-red-100 text-red-800"
    },
    allowedFileTypes: [
      ".pdf", ".doc", ".docx", ".txt", ".zip", ".rar",
      ".jpg", ".jpeg", ".png", ".gif",
      ".py", ".js", ".ts", ".java", ".cpp", ".c"
    ],
    maxFileSize: 10485760, // 10MB
    maxFilesPerSubmission: 10
  };
}

// src/pages/AssignmentSubmission/hooks/useAssignmentFilters.ts
import { useState, useMemo } from 'react';
import type { Assignment } from '../types';

export function useAssignmentFilters(assignments: Assignment[] = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'status' | 'title'>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedAssignments = useMemo(() => {
    // Safety check: ensure assignments is an array
    const safeAssignments = Array.isArray(assignments) ? assignments : [];
    
    if (safeAssignments.length === 0) {
      return [];
    }

    let filtered = safeAssignments.filter(assignment => {
      // Safety checks for assignment properties
      const title = assignment?.title || '';
      const courseName = assignment?.courseName || '';
      const description = assignment?.description || '';
      const status = assignment?.status || '';
      const courseId = assignment?.courseId || '';
      
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || status === statusFilter;
      const matchesSubject = subjectFilter === 'all' || courseId === subjectFilter;
      
      return matchesSearch && matchesStatus && matchesSubject;
    });

    // Sort assignments with safety checks
    filtered.sort((a, b) => {
      let comparison = 0;
      
      try {
        switch (sortBy) {
          case 'dueDate':
            const dateA = a?.dueDate ? new Date(a.dueDate).getTime() : 0;
            const dateB = b?.dueDate ? new Date(b.dueDate).getTime() : 0;
            comparison = dateA - dateB;
            break;
          case 'status':
            const statusA = a?.status || '';
            const statusB = b?.status || '';
            comparison = statusA.localeCompare(statusB);
            break;
          case 'title':
            const titleA = a?.title || '';
            const titleB = b?.title || '';
            comparison = titleA.localeCompare(titleB);
            break;
        }
      } catch (error) {
        console.error('Error sorting assignments:', error);
        comparison = 0;
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

// src/pages/AssignmentSubmission/hooks/useAssignmentSubmission.ts
import { useState } from 'react';
import { submitAssignment } from '../api/assignmentApi';
import { toast } from 'sonner';

export function useAssignmentSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prev => [...prev, ...fileArray]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const submitAssignmentFiles = async (assignmentId: string) => {
    if (uploadedFiles.length === 0) {
      toast.error('No files selected', {
        description: 'Please select at least one file to submit.',
      });
      return false;
    }

    setIsSubmitting(true);
    try {
      await submitAssignment(assignmentId, uploadedFiles);
      toast.success('Assignment Submitted Successfully', {
        description: 'Your assignment has been submitted for review.',
      });
      setUploadedFiles([]);
      return true;
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Submission Failed', {
        description: 'There was an error submitting your assignment. Please try again.',
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    uploadedFiles,
    handleFileUpload,
    removeFile,
    submitAssignmentFiles,
  };
}