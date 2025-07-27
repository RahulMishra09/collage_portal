export interface MentorMenteeForm {
    // Add all fields 
    name: string;
    email: string;
    enrollmentNumber: string;
    mentorName: string;
    currentCGPA: string;
    attendancePercentage: string;
    academicDifficulties: string;
    academicStrengths: string;
    mentorshipRating: Rating;
    meetingFrequency: string;
    meetingHelpful: boolean;
    mentorAccessible: boolean;
    careerGuidance: boolean;
    personalChallenges: string;
    stressLevel: Rating;
    workLifeBalance: Rating;
    extracurricularParticipation: boolean;
    shortTermGoals: string;
    longTermGoals: string;
    skillsToImprove: string;
    mentorSupport: boolean;
    peerSupport: boolean;
    familySupport: boolean;
    additionalSupportNeeded: string;
    additionalComments: string;
  
}

export type Rating = 1 | 2 | 3 | 4 | 5; 