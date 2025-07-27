import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { FeedbackForm } from '../models';
import { defaultFeedbackForm } from '../data/defaultForm';
import { submitFeedback } from '../api/submitFeedback';

export function useStudentFeedback(user: { name?: string; email?: string } | null) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackForm | null>(null);

  // Load default feedback form
  useEffect(() => {
    setFeedback(defaultFeedbackForm);
  }, []);

  // Update name/email from user
  useEffect(() => {
    if (user && feedback) {
      setFeedback(prev =>
        prev ? { ...prev, name: user.name || '', email: user.email || '' } : prev
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback(prev =>
      prev ? { ...prev, [name]: value } : prev
    );
  };

  const handleSelectChange = (value: string, name: string) => {
    setFeedback(prev =>
      prev ? { ...prev, [name]: Number(value) } : prev
    );
  };

  const handleCheckboxChange = (checked: boolean, name: string) => {
    setFeedback(prev =>
      prev ? { ...prev, [name]: checked } : prev
    );
  };

  const resetForm = () => {
    setFeedback(defaultFeedbackForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitFeedback(feedback!);
      toast.success('Feedback Submitted', {
        description: 'Thank you for your valuable feedback!',
      });
      resetForm();
    } catch (error) {
      toast.error('Submission Failed', {
        description: 'There was an error submitting your feedback. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    feedback,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
    resetForm,
  };
} 