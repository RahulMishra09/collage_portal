// src/pages/Assignment/components/AssignmentPage.tsx
import React, { useState } from 'react';
import { AlertCircle, FileText } from 'lucide-react';
import { useAssignments, useAssignmentSubmission, useFileValidation, useAssignmentModal } from '../hooks';
import { downloadFile } from '../api';
import { filterAssignments, sortAssignmentsByDueDate } from '../utils';
import AssignmentCard from './AssignmentCard';
import AssignmentStats from './AssignmentStats';
import FilterBar from './FilterBar';
import AssignmentDetailsModal from './AssignmentDetailsModal';
import SubmissionModal from './SubmissionModal';

const AssignmentPage: React.FC = () => {
  const { 
    assignments, 
    subjects, 
    stats, 
    loading, 
    error, 
    filters, 
    setFilters, 
    refreshAssignments,
    updateAssignment 
  } = useAssignments();
  
  const { submit, submitting, error: submissionError, success, clearMessages } = useAssignmentSubmission();
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const {
    selectedAssignment,
    showSubmissionModal,
    showDetailsModal,
    openSubmissionModal,
    openDetailsModal,
    closeModals
  } = useAssignmentModal();

  const {
    selectedFiles,
    fileErrors,
    validateAndAddFiles,
    removeFile,
    clearFiles
  } = useFileValidation(selectedAssignment);

  // Filter and sort assignments
  const filteredAssignments = filterAssignments(assignments, filters, searchTerm);
  const sortedAssignments = sortAssignmentsByDueDate(filteredAssignments);

  // Handle file selection
  const handleFileSelect = (files: File[]) => {
    validateAndAddFiles(files);
  };

  // Handle submission
  const handleSubmit = async (files: File[], comments?: string): Promise<boolean> => {
    if (!selectedAssignment) return false;

    const success = await submit(selectedAssignment, files, comments);
    
    if (success) {
      // Update the assignment status locally
      const updatedAssignment = {
        ...selectedAssignment,
        status: 'submitted' as const,
        submittedAt: new Date().toISOString(),
        submittedFiles: files.map(file => ({
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
          type: file.type,
          uploadedAt: new Date().toISOString()
        }))
      };
      
      updateAssignment(updatedAssignment);
      clearFiles();
      clearMessages();
    }
    
    return success;
  };

  // Handle file download
  const handleFileDownload = async (fileId: string, fileName: string) => {
    try {
      await downloadFile(fileId, fileName);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // Handle modal close
  const handleCloseModals = () => {
    closeModals();
    clearFiles();
    clearMessages();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading assignments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Assignment Submissions</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and submit your course assignments</p>
      </div>

      {/* Statistics */}
      <AssignmentStats stats={stats} />

      {/* Filters and Search */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFiltersChange={setFilters}
        subjects={subjects}
        onRefresh={refreshAssignments}
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-green-700 dark:text-green-400">Assignment submitted successfully!</p>
          </div>
        </div>
      )}

      {/* Submission Error */}
      {submissionError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <p className="text-red-700 dark:text-red-400">{submissionError}</p>
          </div>
        </div>
      )}

      {/* Assignments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedAssignments.map(assignment => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onViewDetails={() => openDetailsModal(assignment)}
            onSubmit={() => openSubmissionModal(assignment)}
            onDownloadFile={handleFileDownload}
          />
        ))}
      </div>

      {/* Empty State */}
      {sortedAssignments.length === 0 && !loading && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No assignments found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || filters.subject !== 'all' || filters.status !== 'all'
              ? 'Try adjusting your filters'
              : 'No assignments have been posted yet'}
          </p>
        </div>
      )}

      {/* Assignment Details Modal */}
      {showDetailsModal && selectedAssignment && (
        <AssignmentDetailsModal
          assignment={selectedAssignment}
          subjects={subjects}
          onClose={handleCloseModals}
        />
      )}

      {/* Submission Modal */}
      {showSubmissionModal && selectedAssignment && (
        <SubmissionModal
          assignment={selectedAssignment}
          onClose={handleCloseModals}
          onSubmit={handleSubmit}
          selectedFiles={selectedFiles}
          onFileSelect={handleFileSelect}
          onFileRemove={removeFile}
          fileErrors={fileErrors}
          isSubmitting={submitting}
        />
      )}
    </div>
  );
};

export default AssignmentPage;

// If you want to export AssignmentWrapper, do it as a named export:
export function AssignmentWrapper() {
  return <AssignmentPage />;
}

