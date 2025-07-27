import React, { useState } from 'react';
import { X, Upload, Trash2, Send, AlertCircle, FileText, Calendar, Clock } from 'lucide-react';
import type { Assignment, AssignmentFile } from '../types';

interface AssignmentSubmissionModalProps {
  assignment: Assignment;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (files: File[], comments?: string) => Promise<boolean>;
  isSubmitting?: boolean;
}

const AssignmentSubmissionModal: React.FC<AssignmentSubmissionModalProps> = ({
  assignment,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [comments, setComments] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  if (!isOpen) return null;

  // Define allowed file types and max size (you can make these configurable)
  const allowedFileTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.png', '.zip'];
  const maxFileSize = 10; // MB

  // Validate file
  const validateFile = (file: File): string | null => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    // Check file type
    if (!allowedFileTypes.includes(fileExtension)) {
      return `Invalid file type. Allowed: ${allowedFileTypes.join(', ')}`;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return `File size (${fileSizeMB.toFixed(1)}MB) exceeds ${maxFileSize}MB limit`;
    }

    // Check for duplicates
    const isDuplicate = selectedFiles.some(existingFile => 
      existingFile.name === file.name && existingFile.size === file.size
    );
    if (isDuplicate) {
      return 'File already selected';
    }

    return null;
  };

  const handleFileSelect = (files: File[]) => {
    const errors: string[] = [];
    const validFiles: File[] = [];

    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    setFileErrors(errors);
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFileSelect(files);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    handleFileSelect(files);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setFileErrors([]);
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) return;
    
    const success = await onSubmit(selectedFiles, comments);
    if (success) {
      // Reset form
      setSelectedFiles([]);
      setComments('');
      setFileErrors([]);
      onClose();
    }
  };

  const getTotalSize = () => {
    const totalBytes = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    return (totalBytes / (1024 * 1024)).toFixed(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = () => {
    return new Date() > new Date(assignment.dueDate);
  };

  const canSubmit = () => {
    return assignment.status === 'pending' || assignment.status === 'draft' || 
           (assignment.allowLateSubmission && assignment.status === 'overdue');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Submit Assignment
              </h2>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {assignment.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {assignment.courseName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Assignment Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Due:</span>
                <span className={`ml-2 font-medium ${isOverdue() ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                  {formatDate(assignment.dueDate)}
                </span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Max Score:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {assignment.maxScore} points
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className={`ml-2 font-medium capitalize ${
                  assignment.status === 'overdue' ? 'text-red-600 dark:text-red-400' :
                  assignment.status === 'submitted' ? 'text-blue-600 dark:text-blue-400' :
                  assignment.status === 'graded' ? 'text-green-600 dark:text-green-400' :
                  'text-gray-900 dark:text-white'
                }`}>
                  {assignment.status}
                </span>
              </div>
              {assignment.allowLateSubmission && (
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">Late submission allowed</span>
                </div>
              )}
            </div>
          </div>

          {/* Warning for overdue */}
          {isOverdue() && !assignment.allowLateSubmission && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <p className="text-red-700 dark:text-red-400 font-medium">
                  This assignment is overdue and late submissions are not allowed.
                </p>
              </div>
            </div>
          )}

          {/* File Upload Area */}
          {canSubmit() && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Files
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragOver
                    ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <label className="cursor-pointer text-orange-600 hover:text-orange-500 font-medium">
                      Click to upload
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInputChange}
                        accept={allowedFileTypes.join(',')}
                        disabled={isSubmitting}
                      />
                    </label> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {allowedFileTypes.join(', ')} up to {maxFileSize}MB each
                  </p>
                </div>
              </div>

              {/* File Errors */}
              {fileErrors.length > 0 && (
                <div className="mt-3 space-y-1">
                  {fileErrors.map((error, index) => (
                    <div key={index} className="flex items-center text-sm text-red-600 dark:text-red-400">
                      <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      {error}
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Selected Files ({selectedFiles.length})
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Total: {getTotalSize()}MB
                    </span>
                  </div>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(file.size / (1024 * 1024)).toFixed(1)}MB
                          </p>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="ml-3 text-red-500 hover:text-red-700 disabled:opacity-50"
                          disabled={isSubmitting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Comments */}
          {canSubmit() && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comments (Optional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add any comments or notes for your submission..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                rows={3}
                disabled={isSubmitting}
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {comments.length}/1000 characters
              </p>
            </div>
          )}

          {/* Existing Submission Info */}
          {assignment.submittedDate && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Previous Submission</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Submitted on {formatDate(assignment.submittedDate)}
              </p>
              {assignment.attachments && assignment.attachments.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Files: {assignment.attachments.map(file => file.name).join(', ')}
                  </p>
                </div>
              )}
              {assignment.score !== undefined && (
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Score: {assignment.score}/{assignment.maxScore}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {canSubmit() ? 'Cancel' : 'Close'}
            </button>
            {canSubmit() && (
              <button
                onClick={handleSubmit}
                disabled={selectedFiles.length === 0 || isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {assignment.submittedDate ? 'Resubmit' : 'Submit'} Assignment ({selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''})
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmissionModal;