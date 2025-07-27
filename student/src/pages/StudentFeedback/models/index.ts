export type Rating = 1 | 2 | 3 | 4 | 5;

export interface FeedbackForm {
  name: string;
  email: string;
  courseName: string;
  instructorName: string;
  overallExperience: Rating;
  courseEngagement: Rating;
  objectivesClear: boolean;
  classParticipation: boolean;
  instructorRating: Rating;
  instructorFeedback: boolean;
  instructorApproachable: boolean;
  materialsHelpful: boolean;
  assignmentsUseful: boolean;
  resourcesRating: Rating;
  comfortableAtmosphere: boolean;
  groupActivities: boolean;
  bestAspect: string;
  improvements: string;
  additionalComments: string;
} 