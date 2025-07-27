import { useEffect, useState } from 'react';
import { useExaminationData } from './useExaminationData';
import { useExamSchedules } from './useExamSchedules';
// import type { ExamSchedule } from '../models';

export function useExamination() {
  const { fallbackExams } = useExaminationData();
  const {
    exams,
    isLoading,
    error,
    loadExamSchedules,
    
  } = useExamSchedules(fallbackExams);

  // Search/filter/sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Derived filtered/sorted exams
  const filteredExams = exams
    .filter(exam =>
      (selectedType === 'All' || exam.exam_type === selectedType) &&
      (exam.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (exam.course_id + '').toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.exam_date).getTime();
      const dateB = new Date(b.exam_date).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Unique exam types for filter dropdown
  const examTypes = Array.from(new Set(exams.map(e => e.exam_type)));

  // Handlers
  const handleSearch = (term: string) => setSearchTerm(term);
  const handleTypeChange = (type: string) => setSelectedType(type);
  const handleSortDirectionChange = () => setSortDirection(dir => (dir === 'asc' ? 'desc' : 'asc'));
  const handleRefresh = () => loadExamSchedules();

  // Initial load
  useEffect(() => {
    loadExamSchedules();
  }, [loadExamSchedules]);

  return {
    exams: filteredExams,
    isLoading,
    error,
    searchTerm,
    selectedType,
    sortDirection,
    examTypes,
    handleSearch,
    handleTypeChange,
    handleSortDirectionChange,
    handleRefresh,
  };
} 