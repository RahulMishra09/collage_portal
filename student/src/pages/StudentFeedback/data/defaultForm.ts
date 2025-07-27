import type { FeedbackForm } from '../models';

export const defaultFeedbackForm: FeedbackForm = {
  name: 'John Doe',
  email: 'user3@example.com',
  courseName: 'Data Structures and Algorithms',
  instructorName: 'Mr. Smith',
  overallExperience: 4,
  courseEngagement: 4,
  objectivesClear: true,
  classParticipation: true,
  instructorRating: 5,
  instructorFeedback: true,
  instructorApproachable: true,
  materialsHelpful: true,
  assignmentsUseful: true,
  resourcesRating: 4,
  comfortableAtmosphere: true,
  groupActivities: true,
  bestAspect: 'The practical approach to teaching complex algorithms with real-world examples made difficult concepts easier to understand. The interactive coding sessions were particularly helpful.',
  improvements: 'More hands-on coding exercises would be beneficial. Perhaps including a small project that requires implementation of multiple data structures would help solidify concepts.',
  additionalComments: 'The course was well-structured and the pace was appropriate. I appreciate the additional resources provided for further learning.'
}; 