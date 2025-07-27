// src/pages/AssignmentSubmission/api/assignmentApi.ts
import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';
import type { 
  Assignment, 
  AssignmentSubmission, 
  Subject, 
  Rubric, 
  AssignmentFormData,
  AssignmentFile
} from '../types';

/**
 * Fetch all assignments with fallback to local JSON
 */
export async function fetchAssignments(): Promise<Assignment[]> {
  try {
    console.log('Attempting to fetch assignments from API...');
    return await apiRequest<Assignment[]>(API_ENDPOINTS.assignments.list);
  } catch (err) {
    console.warn('API failed, loading assignments from local data...', err);
    try {
      const response = await fetch('/src/pages/AssignmentSubmission/data/assignments.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch fallback data: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully loaded assignments from fallback data');
      return data;
    } catch (fallbackErr) {
      console.error('Failed to fetch assignments from API and fallback:', fallbackErr);
      throw new Error('Unable to load assignments data from both API and local files');
    }
  }
}

/**
 * Fetch single assignment by ID with fallback
 */
export async function fetchAssignmentById(id: string): Promise<Assignment> {
  try {
    console.log(`Attempting to fetch assignment ${id} from API...`);
    return await apiRequest<Assignment>(API_ENDPOINTS.assignments.getById(id));
  } catch (err) {
    console.warn(`API failed, searching assignment ${id} in local data...`, err);
    try {
      const assignments = await fetchAssignments();
      const assignment = assignments.find(a => a.id === id);
      if (!assignment) {
        throw new Error(`Assignment with ID ${id} not found`);
      }
      console.log(`Successfully found assignment ${id} in fallback data`);
      return assignment;
    } catch (fallbackErr) {
      console.error(`Failed to find assignment ${id}:`, fallbackErr);
      throw new Error(`Assignment with ID ${id} not found`);
    }
  }
}

/**
 * Fetch all subjects/courses with fallback to local JSON
 */
export async function fetchSubjects(): Promise<Subject[]> {
  try {
    console.log('Attempting to fetch subjects from API...');
    return await apiRequest<Subject[]>(API_ENDPOINTS.assignments.subjects);
  } catch (err) {
    console.warn('API failed, loading subjects from local data...', err);
    try {
      const response = await fetch('/src/pages/AssignmentSubmission/data/subjects.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch fallback subjects: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully loaded subjects from fallback data');
      return data;
    } catch (fallbackErr) {
      console.error('Failed to fetch subjects from API and fallback:', fallbackErr);
      // Return empty array instead of throwing for subjects
      console.warn('Returning empty subjects array');
      return [];
    }
  }
}

/**
 * Fetch application constants (status options, file types, etc.) with fallback
 */
export async function fetchConstants(): Promise<any> {
  try {
    console.log('Attempting to fetch constants from API...');
    return await apiRequest<any>(API_ENDPOINTS.assignments.constants);
  } catch (err) {
    console.warn('API failed, loading constants from local data...', err);
    try {
      const response = await fetch('/src/pages/AssignmentSubmission/data/constants.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch fallback constants: ${response.status}`);
      }
      const data = await response.json();
      console.log('Successfully loaded constants from fallback data');
      return data;
    } catch (fallbackErr) {
      console.error('Failed to fetch constants from API and fallback:', fallbackErr);
      // Return default constants if both fail
      console.warn('Returning default constants');
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
  }
}

/**
 * Fetch rubrics (grading criteria) with optional assignment filter
 */
export async function fetchRubrics(assignmentId?: string): Promise<Rubric[]> {
  try {
    console.log(`Attempting to fetch rubrics from API${assignmentId ? ` for assignment ${assignmentId}` : ''}...`);
    const endpoint = assignmentId 
      ? API_ENDPOINTS.assignments.rubricByAssignment(assignmentId)
      : API_ENDPOINTS.assignments.rubrics;
    return await apiRequest<Rubric[]>(endpoint);
  } catch (err) {
    console.warn('API failed, loading rubrics from local data...', err);
    try {
      const response = await fetch('/src/pages/AssignmentSubmission/data/rubrics.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch fallback rubrics: ${response.status}`);
      }
      const allRubrics = await response.json();
      
      // Filter by assignmentId if provided
      if (assignmentId) {
        const filtered = allRubrics.filter((rubric: Rubric) => rubric.assignmentId === assignmentId);
        console.log(`Successfully loaded ${filtered.length} rubrics for assignment ${assignmentId} from fallback data`);
        return filtered;
      }
      
      console.log(`Successfully loaded ${allRubrics.length} rubrics from fallback data`);
      return allRubrics;
    } catch (fallbackErr) {
      console.error('Failed to fetch rubrics from API and fallback:', fallbackErr);
      return [];
    }
  }
}

/**
 * Fetch sample submissions with optional assignment filter
 */
export async function fetchSampleSubmissions(assignmentId?: string): Promise<AssignmentSubmission[]> {
  try {
    console.log(`Attempting to fetch submissions from API${assignmentId ? ` for assignment ${assignmentId}` : ''}...`);
    const endpoint = assignmentId 
      ? API_ENDPOINTS.assignments.submissionsByAssignment(assignmentId)
      : API_ENDPOINTS.assignments.submissions;
    return await apiRequest<AssignmentSubmission[]>(endpoint);
  } catch (err) {
    console.warn('API failed, loading sample submissions from local data...', err);
    try {
      const response = await fetch('/src/pages/AssignmentSubmission/data/sampleSubmissions.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch fallback submissions: ${response.status}`);
      }
      const allSubmissions = await response.json();
      
      // Filter by assignmentId if provided
      if (assignmentId) {
        const filtered = allSubmissions.filter((submission: AssignmentSubmission) => submission.assignmentId === assignmentId);
        console.log(`Successfully loaded ${filtered.length} submissions for assignment ${assignmentId} from fallback data`);
        return filtered;
      }
      
      console.log(`Successfully loaded ${allSubmissions.length} submissions from fallback data`);
      return allSubmissions;
    } catch (fallbackErr) {
      console.error('Failed to fetch sample submissions from API and fallback:', fallbackErr);
      return [];
    }
  }
}

/**
 * Submit assignment - NO FALLBACK (this is a real action)
 */
export async function submitAssignment(
  assignmentId: string, 
  files: File[],
  metadata?: { comments?: string; attemptNumber?: number }
): Promise<SubmissionResponse> {
  try {
    console.log(`Submitting assignment ${assignmentId} with ${files.length} files...`);
    
    const formData = new FormData();
    formData.append('assignmentId', assignmentId);
    
    // Add metadata if provided
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }
    
    // Add files with proper naming
    files.forEach((file, index) => {
      formData.append(`files`, file);
      formData.append(`fileNames[${index}]`, file.name);
    });

    const response = await apiRequest<SubmissionResponse>(API_ENDPOINTS.assignments.submit, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header, let browser set it for FormData
    });

    console.log('Assignment submitted successfully:', response);
    return response;
  } catch (err) {
    console.error('Failed to submit assignment:', err);
    // For submission, we don't have a fallback - it's a real action that requires server
    throw new Error('Failed to submit assignment. Please check your connection and try again.');
  }
}

/**
 * Update assignment submission (resubmit)
 */
export async function updateSubmission(
  submissionId: string,
  files: File[],
  metadata?: { comments?: string }
): Promise<SubmissionResponse> {
  try {
    console.log(`Updating submission ${submissionId} with ${files.length} files...`);
    
    const formData = new FormData();
    formData.append('submissionId', submissionId);
    
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }
    
    files.forEach((file, index) => {
      formData.append(`files`, file);
      formData.append(`fileNames[${index}]`, file.name);
    });

    return await apiRequest<SubmissionResponse>(API_ENDPOINTS.assignments.updateSubmission, {
      method: 'PUT',
      body: formData,
    });
  } catch (err) {
    console.error('Failed to update submission:', err);
    throw new Error('Failed to update submission. Please check your connection and try again.');
  }
}

/**
 * Delete assignment submission
 */
export async function deleteSubmission(submissionId: string): Promise<{ success: boolean; message: string }> {
  try {
    console.log(`Deleting submission ${submissionId}...`);
    return await apiRequest<{ success: boolean; message: string }>(
      API_ENDPOINTS.assignments.deleteSubmission(submissionId), 
      {
        method: 'DELETE',
      }
    );
  } catch (err) {
    console.error('Failed to delete submission:', err);
    throw new Error('Failed to delete submission. Please check your connection and try again.');
  }
}

/**
 * Download assignment file
 */
export async function downloadAssignmentFile(assignmentId: string, fileName: string): Promise<Blob> {
  try {
    console.log(`Downloading file ${fileName} for assignment ${assignmentId}...`);
    const response = await fetch(API_ENDPOINTS.assignments.downloadFile(assignmentId, fileName));
    
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
    }
    
    return await response.blob();
  } catch (err) {
    console.error('Failed to download assignment file:', err);
    throw new Error('Failed to download file. Please try again.');
  }
}

/**
 * Download submission file
 */
export async function downloadSubmissionFile(submissionId: string, fileName: string): Promise<Blob> {
  try {
    console.log(`Downloading submission file ${fileName} for submission ${submissionId}...`);
    const response = await fetch(API_ENDPOINTS.assignments.downloadSubmissionFile(submissionId, fileName));
    
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status} ${response.statusText}`);
    }
    
    return await response.blob();
  } catch (err) {
    console.error('Failed to download submission file:', err);
    throw new Error('Failed to download file. Please try again.');
  }
}

/**
 * Get user's submissions for a specific assignment
 */
export async function getUserSubmissions(assignmentId: string): Promise<AssignmentSubmission[]> {
  try {
    console.log(`Fetching user submissions for assignment ${assignmentId}...`);
    return await apiRequest<AssignmentSubmission[]>(API_ENDPOINTS.assignments.userSubmissions(assignmentId));
  } catch (err) {
    console.warn('API failed, checking local submissions...', err);
    try {
      // Try to get from sample submissions and filter for current user
      const sampleSubmissions = await fetchSampleSubmissions(assignmentId);
      // In a real app, you'd filter by current user ID
      // For now, return all sample submissions for this assignment
      return sampleSubmissions;
    } catch (fallbackErr) {
      console.error('Failed to fetch user submissions:', fallbackErr);
      return [];
    }
  }
}

/**
 * Check if assignment allows submissions (deadline, status checks)
 */
export async function checkSubmissionEligibility(assignmentId: string): Promise<{
  canSubmit: boolean;
  reason?: string;
  isLate: boolean;
  timeRemaining?: string;
}> {
  try {
    console.log(`Checking submission eligibility for assignment ${assignmentId}...`);
    return await apiRequest<{
      canSubmit: boolean;
      reason?: string;
      isLate: boolean;
      timeRemaining?: string;
    }>(API_ENDPOINTS.assignments.checkEligibility(assignmentId));
  } catch (err) {
    console.warn('API failed, checking eligibility locally...', err);
    try {
      const assignment = await fetchAssignmentById(assignmentId);
      const now = new Date();
      const dueDate = new Date(assignment.dueDate);
      const isLate = now > dueDate;
      
      // Basic local check
      const canSubmit = assignment.status === 'pending' || 
                       assignment.status === 'draft' || 
                       (isLate && assignment.allowLateSubmission);
      
      let reason: string | undefined;
      if (!canSubmit) {
        if (isLate && !assignment.allowLateSubmission) {
          reason = 'Assignment deadline has passed and late submissions are not allowed';
        } else if (assignment.status === 'submitted') {
          reason = 'Assignment already submitted';
        } else if (assignment.status === 'graded') {
          reason = 'Assignment has been graded';
        }
      }
      
      return {
        canSubmit,
        reason,
        isLate,
        timeRemaining: isLate ? undefined : `${Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} days`
      };
    } catch (fallbackErr) {
      console.error('Failed to check submission eligibility:', fallbackErr);
      // Default to allowing submission if we can't check
      return {
        canSubmit: true,
        isLate: false,
        reason: 'Unable to verify submission status'
      };
    }
  }
}

/**
 * Validate file before upload
 */
export function validateFile(file: File, constants?: any): { valid: boolean; error?: string } {
  const maxSize = constants?.maxFileSize || 10485760; // 10MB default
  const allowedTypes = constants?.allowedFileTypes || [
    '.pdf', '.doc', '.docx', '.txt', '.zip', '.rar',
    '.jpg', '.jpeg', '.png', '.gif',
    '.py', '.js', '.ts', '.java', '.cpp', '.c'
  ];
  
  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File "${file.name}" is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.`
    };
  }
  
  // Check file type
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    return {
      valid: false,
      error: `File type "${fileExtension}" is not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }
  
  return { valid: true };
}

/**
 * Bulk file validation
 */
export function validateFiles(files: File[], constants?: any): { 
  valid: boolean; 
  errors: string[]; 
  validFiles: File[];
  invalidFiles: File[];
} {
  const errors: string[] = [];
  const validFiles: File[] = [];
  const invalidFiles: File[] = [];
  
  const maxFiles = constants?.maxFilesPerSubmission || 10;
  
  if (files.length > maxFiles) {
    errors.push(`Too many files selected. Maximum allowed: ${maxFiles}`);
  }
  
  files.forEach(file => {
    const validation = validateFile(file, constants);
    if (validation.valid) {
      validFiles.push(file);
    } else {
      invalidFiles.push(file);
      if (validation.error) {
        errors.push(validation.error);
      }
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    validFiles,
    invalidFiles
  };
}

/**
 * Create new assignment (for teachers/admins)
 */
export async function createAssignment(assignmentData: AssignmentFormData): Promise<Assignment> {
  try {
    console.log('Creating new assignment...', assignmentData);
    return await apiRequest<Assignment>(API_ENDPOINTS.assignments.create, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignmentData),
    });
  } catch (err) {
    console.error('Failed to create assignment:', err);
    throw new Error('Failed to create assignment. Please check your data and try again.');
  }
}

/**
 * Update existing assignment (for teachers/admins)
 */
export async function updateAssignment(assignmentId: string, assignmentData: Partial<AssignmentFormData>): Promise<Assignment> {
  try {
    console.log(`Updating assignment ${assignmentId}...`, assignmentData);
    return await apiRequest<Assignment>(API_ENDPOINTS.assignments.update(assignmentId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignmentData),
    });
  } catch (err) {
    console.error('Failed to update assignment:', err);
    throw new Error('Failed to update assignment. Please check your data and try again.');
  }
}

/**
 * Delete assignment (for teachers/admins)
 */
export async function deleteAssignment(assignmentId: string): Promise<{ success: boolean; message: string }> {
  try {
    console.log(`Deleting assignment ${assignmentId}...`);
    return await apiRequest<{ success: boolean; message: string }>(
      API_ENDPOINTS.assignments.delete(assignmentId), 
      {
        method: 'DELETE',
      }
    );
  } catch (err) {
    console.error('Failed to delete assignment:', err);
    throw new Error('Failed to delete assignment. Please try again.');
  }
}