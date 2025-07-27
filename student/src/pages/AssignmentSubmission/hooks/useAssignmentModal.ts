// src/pages/Assignment/hooks/useAssignmentModal.ts
import { useState, useCallback, useEffect } from 'react';
import type { Assignment } from '../types';
import type { UseAssignmentModalReturn } from './types';

export function useAssignmentModal(): UseAssignmentModalReturn {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [previousAssignment, setPreviousAssignment] = useState<Assignment | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close modals on Escape key
      if (event.key === 'Escape') {
        closeModals();
      }
      
      // Prevent background scrolling when modal is open
      if (showSubmissionModal || showDetailsModal) {
        if (event.key === 'Tab') {
          // Allow tab navigation within modal
          return;
        }
      }
    };

    if (showSubmissionModal || showDetailsModal) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showSubmissionModal, showDetailsModal]);

  const openSubmissionModal = useCallback((assignment: Assignment) => {
    // Check if assignment can be submitted
    if (assignment.status !== 'pending') {
      console.warn('Cannot submit assignment that is not pending');
      return;
    }

    // Check if assignment is not overdue
    const dueDate = new Date(`${assignment.dueDate}T${assignment.dueTime}`);
    const now = new Date();
    
    if (now > dueDate) {
      console.warn('Cannot submit overdue assignment');
      return;
    }

    setPreviousAssignment(selectedAssignment);
    setSelectedAssignment(assignment);
    setShowSubmissionModal(true);
    setShowDetailsModal(false);
  }, [selectedAssignment]);

  const openDetailsModal = useCallback((assignment: Assignment) => {
    setPreviousAssignment(selectedAssignment);
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
    setShowSubmissionModal(false);
  }, [selectedAssignment]);

  const closeModals = useCallback(() => {
    setSelectedAssignment(null);
    setShowSubmissionModal(false);
    setShowDetailsModal(false);
    setPreviousAssignment(null);
  }, []);

  const switchToSubmissionModal = useCallback(() => {
    if (selectedAssignment && selectedAssignment.status === 'pending') {
      setShowDetailsModal(false);
      setShowSubmissionModal(true);
    }
  }, [selectedAssignment]);

  const switchToDetailsModal = useCallback(() => {
    if (selectedAssignment) {
      setShowSubmissionModal(false);
      setShowDetailsModal(true);
    }
  }, [selectedAssignment]);

  const goBack = useCallback(() => {
    if (previousAssignment) {
      setSelectedAssignment(previousAssignment);
      setPreviousAssignment(null);
    } else {
      closeModals();
    }
  }, [previousAssignment, closeModals]);

  // Modal navigation helpers
  const isModalOpen = showSubmissionModal || showDetailsModal;
  
  const canSubmit = selectedAssignment ? 
    selectedAssignment.status === 'pending' && 
    new Date() <= new Date(`${selectedAssignment.dueDate}T${selectedAssignment.dueTime}`) 
    : false;

  const modalType = showSubmissionModal ? 'submission' : 
                   showDetailsModal ? 'details' : null;

  // Handle assignment updates while modal is open
  const updateSelectedAssignment = useCallback((updatedAssignment: Assignment) => {
    if (selectedAssignment && selectedAssignment.id === updatedAssignment.id) {
      setSelectedAssignment(updatedAssignment);
    }
  }, [selectedAssignment]);

  return {
    selectedAssignment,
    showSubmissionModal,
    showDetailsModal,
    openSubmissionModal,
    openDetailsModal,
    closeModals,
    switchToSubmissionModal,
    switchToDetailsModal,
    goBack,
    isModalOpen,
    canSubmit,
    modalType,
    updateSelectedAssignment
  } as UseAssignmentModalReturn & {
    switchToSubmissionModal: () => void;
    switchToDetailsModal: () => void;
    goBack: () => void;
    isModalOpen: boolean;
    canSubmit: boolean;
    modalType: string | null;
    updateSelectedAssignment: (assignment: Assignment) => void;
  };
}