import { useState, useEffect } from 'react';
import { DEFAULT_MENTOR_MENTEE_FORM } from '../constants/mentorMenteeData';
import type { MentorMenteeForm } from '../models';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '../../../api/endpoints';
import { ERROR_MESSAGES } from '../../../errors/errorMessages';

export function useMentorMenteeForm() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<MentorMenteeForm>({
    ...DEFAULT_MENTOR_MENTEE_FORM,
    name: user?.name || '',
    email: user?.email || '',
    enrollmentNumber: user?.enrollmentNumber || '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        enrollmentNumber: user.enrollmentNumber || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: name.includes('Rating') ? Number(value) : value }));
  };

  const handleCheckboxChange = (checked: boolean, name: string) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(API_ENDPOINTS.mentorMentee.mentorMentee, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(ERROR_MESSAGES.mentorMentee.submit);
      toast.success('Form Submitted Successfully', {
        description: 'Your mentor-mentee form has been submitted.',
      });
      resetForm();
    } catch (error) {
      toast.error('Submission Failed', {
        description: 'There was an error submitting your form. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      ...DEFAULT_MENTOR_MENTEE_FORM,
      name: user?.name || '',
      email: user?.email || '',
      enrollmentNumber: user?.enrollmentNumber || '',
    });
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    handleInputChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSubmit,
    resetForm,
  };
} 