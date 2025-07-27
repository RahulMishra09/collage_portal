import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { ProfileDataType } from '../models';
import { fallbackProfileData } from '../data/profileData';
import { fetchProfileData as fetchProfileDataApi } from '../api/fetchProfileData';

function sanitizeProfileData(data: any): ProfileDataType {
  return {
    name: String(data.name ?? ''),
    registrationNumber: String(data.registrationNumber ?? ''),
    semester: String(data.semester ?? ''),
    branch: String(data.branch ?? ''),
    program: String(data.program ?? ''),
    year: String(data.year ?? ''),
    gender: String(data.gender ?? ''),
    phone: String(data.phone ?? ''),
    email: String(data.email ?? ''),
    classCoordinator: String(data.classCoordinator ?? ''),
    cgpa: String(data.cgpa ?? ''),
    attendance: String(data.attendance ?? ''),
    campus: String(data.campus ?? ''),
  };
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  // Fetch profile data from API or fallback
  useEffect(() => {
    async function getProfile() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const data = await fetchProfileDataApi(user.enrollmentNumber);
        const userDataFromStorage = JSON.parse(localStorage.getItem('user') || '{}');
        if (data) {
          const mappedData: ProfileDataType = sanitizeProfileData({
            name: (data.first_name + ' ' + data.last_name),
            registrationNumber: data.enrollment_number,
            semester: data.semester,
            branch: data.department,
            program: data.program,
            year: data.year_of_study,
            gender: data.gender,
            phone: data.phone?.toString(),
            email: userDataFromStorage.email || data.email,
            classCoordinator: data.class_coordinator,
            cgpa: data.cgpa?.toString(),
            attendance: data.attendance,
            campus: data.campus
          });
          setProfile(mappedData);
          setPhoneValue(mappedData.phone);
          setEmailValue(mappedData.email);
        }
      } catch (error) {
        setProfile(fallbackProfileData);
        setPhoneValue(fallbackProfileData.phone);
        setEmailValue(fallbackProfileData.email);
        toast.error('Failed to load profile data', {
          description: 'Using default profile information instead.',
        });
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  // Handlers
  const handleSavePhone = useCallback(async () => {
    if (!profile) return;
    try {
      setProfile({ ...profile, phone: phoneValue });
      setEditingPhone(false);
      toast.success('Phone number updated', {
        description: 'Your phone number has been successfully updated.',
      });
    } catch {
      toast.error('Failed to update phone', {
        description: 'Please try again later.',
      });
    }
  }, [profile, phoneValue]);

  const handleSaveEmail = useCallback(async () => {
    if (!profile) return;
    if (!emailValue.includes('@')) {
      toast.error('Invalid email', {
        description: 'Please enter a valid email address.',
      });
      return;
    }
    try {
      setProfile({ ...profile, email: emailValue });
      setEditingEmail(false);
      toast.success('Email updated', {
        description: 'Your email has been successfully updated.',
      });
    } catch {
      toast.error('Failed to update email', {
        description: 'Please try again later.',
      });
    }
  }, [profile, emailValue]);

  const handleCancelPhone = useCallback(() => {
    if (!profile) return;
    setPhoneValue(profile.phone);
    setEditingPhone(false);
  }, [profile]);

  const handleCancelEmail = useCallback(() => {
    if (!profile) return;
    setEmailValue(profile.email);
    setEditingEmail(false);
  }, [profile]);

  return {
    profile,
    loading,
    editingPhone,
    editingEmail,
    phoneValue,
    emailValue,
    setEditingPhone,
    setEditingEmail,
    setPhoneValue,
    setEmailValue,
    handleSavePhone,
    handleSaveEmail,
    handleCancelPhone,
    handleCancelEmail,
  };
} 