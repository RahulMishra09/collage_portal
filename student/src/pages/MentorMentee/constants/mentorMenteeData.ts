import type { MentorMenteeForm } from '../models';

export const DEFAULT_MENTOR_MENTEE_FORM: MentorMenteeForm = {
  name: '',
  email: '',
  enrollmentNumber: '',
  mentorName: '',
  currentCGPA: '',
  attendancePercentage: '',
  academicDifficulties: '',
  academicStrengths: '',
  mentorshipRating: 3,
  meetingFrequency: 'Monthly',
  meetingHelpful: false,
  mentorAccessible: false,
  careerGuidance: false,
  personalChallenges: '',
  stressLevel: 3,
  workLifeBalance: 3,
  extracurricularParticipation: false,
  shortTermGoals: '',
  longTermGoals: '',
  skillsToImprove: '',
  mentorSupport: false,
  peerSupport: false,
  familySupport: false,
  additionalSupportNeeded: '',
  additionalComments: ''
}; 