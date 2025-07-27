// src/pages/Assignment/hooks/useAssignmentSubmission.ts
import { useState, useCallback } from 'react';
import { submitAssignment } from '../api';
import type { Assignment, AssignmentSubmission } from '../types';
import type { UseAssignmentSubmissionReturn } from './types';

export function useAssignmentSubmission(): UseAssignmentSubmissionReturn {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (
    assignment: Assignment, 
    files: File[], 
    comments?: string
  ): Promise<boolean> => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);

      // Validate files before submission
      if (files.length === 0) {
        throw new Error('Please select at least one file to submit');
      }

      // Check file types
      const invalidFiles = files.filter(file => {
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        return !assignment.fileTypes.includes(fileExtension);
      });

      if (invalidFiles.length > 0) {
        throw new Error(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}`);
      }

      // Check file sizes
      const maxSizeMB = parseInt(assignment.maxFileSize.replace('MB', ''));
      const oversizedFiles = files.filter(file => {
        const fileSizeMB = file.size / (1024 * 1024);
        return fileSizeMB > maxSizeMB;
      });

      if (oversizedFiles.length > 0) {
        throw new Error(`Files exceed size limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
      }

      // Check if assignment is still open for submission
      const dueDate = new Date(`${assignment.dueDate}T${assignment.dueTime}`);
      const now = new Date();
      
      if (now > dueDate && assignment.status === 'pending') {
        throw new Error('Assignment deadline has passed');
      }

      if (assignment.status !== 'pending') {
        throw new Error('Assignment has already been submitted');
      }

      const submission: AssignmentSubmission = {
        assignmentId: assignment.id,
        files,
        comments,
        submittedAt: new Date().toISOString()
      };

      const response = await submitAssignment(submission);
      
      if (response.success) {
        setSuccess(true);
        return true;
      } else {
        setError(response.message || 'Submission failed');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit assignment';
      setError(errorMessage);
      console.error('Submission error:', err);
      return false;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  const retrySubmission = useCallback(async (
    assignment: Assignment, 
    files: File[], 
    comments?: string
  ): Promise<boolean> => {
    clearMessages();
    return submit(assignment, files, comments);
  }, [submit, clearMessages]);

  return {
    submit,
    submitting,
    error,
    success,
    clearMessages,
    retrySubmission
  } as UseAssignmentSubmissionReturn & { retrySubmission: typeof retrySubmission };
}