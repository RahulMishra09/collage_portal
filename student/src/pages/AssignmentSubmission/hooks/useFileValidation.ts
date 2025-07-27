// src/pages/Assignment/hooks/useFileValidation.ts
import { useState, useCallback, useEffect } from 'react';
import { formatFileSize } from '../utils';
import type { Assignment } from '../types';
import type { UseFileValidationReturn } from './types';

interface ValidationError {
  fileName: string;
  error: string;
}

export function useFileValidation(assignment: Assignment | null): UseFileValidationReturn {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // Clear files when assignment changes
  useEffect(() => {
    if (assignment) {
      setSelectedFiles([]);
      setFileErrors([]);
      setValidationErrors([]);
    }
  }, [assignment?.id]);

  const validateFile = useCallback((file: File, assignment: Assignment): ValidationError | null => {
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!assignment.fileTypes.includes(fileExtension)) {
      return {
        fileName: file.name,
        error: `Invalid file type. Allowed: ${assignment.fileTypes.join(', ')}`
      };
    }

    // Check file size
    const maxSizeMB = parseInt(assignment.maxFileSize.replace('MB', ''));
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      return {
        fileName: file.name,
        error: `File size (${fileSizeMB.toFixed(1)}MB) exceeds ${maxSizeMB}MB limit`
      };
    }

    // Check file name length
    if (file.name.length > 255) {
      return {
        fileName: file.name,
        error: 'File name is too long (max 255 characters)'
      };
    }

    // Check for invalid characters in file name
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(file.name)) {
      return {
        fileName: file.name,
        error: 'File name contains invalid characters'
      };
    }

    return null;
  }, []);

  const validateAndAddFiles = useCallback((newFiles: File[]) => {
    if (!assignment) {
      setFileErrors(['No assignment selected']);
      return;
    }

    const errors: string[] = [];
    const validFiles: File[] = [];
    const newValidationErrors: ValidationError[] = [];

    newFiles.forEach(file => {
      // Validate individual file
      const validationError = validateFile(file, assignment);
      if (validationError) {
        newValidationErrors.push(validationError);
        errors.push(`${validationError.fileName}: ${validationError.error}`);
        return;
      }

      // Check for duplicates
      const isDuplicate = selectedFiles.some(existingFile => 
        existingFile.name === file.name && 
        existingFile.size === file.size &&
        existingFile.lastModified === file.lastModified
      );
      
      if (isDuplicate) {
        errors.push(`${file.name}: File already selected`);
        return;
      }

      // Check total file count limit (e.g., max 10 files)
      const maxFiles = 10;
      if (selectedFiles.length + validFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      validFiles.push(file);
    });

    // Update state
    setValidationErrors(prev => [...prev, ...newValidationErrors]);
    setFileErrors(errors);
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
    }
  }, [assignment, selectedFiles, validateFile]);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    
    // Clear errors when files are removed
    if (selectedFiles.length === 1) {
      setFileErrors([]);
      setValidationErrors([]);
    }
  }, [selectedFiles.length]);

  const clearFiles = useCallback(() => {
    setSelectedFiles([]);
    setFileErrors([]);
    setValidationErrors([]);
  }, []);

  const getTotalSize = useCallback(() => {
    const totalBytes = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    return formatFileSize(totalBytes);
  }, [selectedFiles]);

  const validateAllFiles = useCallback(() => {
    if (!assignment) return false;

    const errors: string[] = [];
    
    // Check if any files selected
    if (selectedFiles.length === 0) {
      errors.push('Please select at least one file');
      setFileErrors(errors);
      return false;
    }

    // Re-validate all selected files
    selectedFiles.forEach(file => {
      const validationError = validateFile(file, assignment);
      if (validationError) {
        errors.push(`${validationError.fileName}: ${validationError.error}`);
      }
    });

    // Check total size limit if specified
    const totalSizeMB = selectedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);
    const maxTotalSizeMB = 100; // Example limit
    if (totalSizeMB > maxTotalSizeMB) {
      errors.push(`Total file size (${totalSizeMB.toFixed(1)}MB) exceeds ${maxTotalSizeMB}MB limit`);
    }

    setFileErrors(errors);
    return errors.length === 0;
  }, [assignment, selectedFiles, validateFile]);

  const getFilePreview = useCallback((file: File): string | null => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  }, []);

  const sortFilesByName = useCallback(() => {
    setSelectedFiles(prev => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const sortFilesBySize = useCallback(() => {
    setSelectedFiles(prev => [...prev].sort((a, b) => b.size - a.size));
  }, []);

  return {
    selectedFiles,
    fileErrors,
    validateAndAddFiles,
    removeFile,
    clearFiles,
    getTotalSize,
    hasFiles: selectedFiles.length > 0,
    fileCount: selectedFiles.length,
    validateAllFiles,
    validationErrors,
    getFilePreview,
    sortFilesByName,
    sortFilesBySize
  } as UseFileValidationReturn & {
    validateAllFiles: () => boolean;
    validationErrors: ValidationError[];
    getFilePreview: (file: File) => string | null;
    sortFilesByName: () => void;
    sortFilesBySize: () => void;
  };
}