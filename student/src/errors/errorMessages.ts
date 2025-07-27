// Centralized error messages for the project

export const ERROR_MESSAGES = {
  network: 'Network error. Please check your connection.',
  unknown: 'An unknown error occurred. Please try again.',
  attendance: {
    fetch: 'Failed to fetch attendance data.',
    submit: 'Failed to submit attendance data.',
  },
  dashboard: {
    fetchTimetable: 'Failed to fetch timetable data.',
    fetchStudentDetail: 'Failed to fetch student details.',
    fetchEvents: 'Failed to fetch upcoming events.',
  },
  examination: {
    fetch: 'Failed to fetch exam schedules.',
  },
  finance: {
    fetchFees: 'Failed to fetch fee details.',
    fetchPaymentOptions: 'Failed to fetch payment options.',
  },
  grade: {
    fetch: 'Failed to fetch grades.',
  },
  profile: {
    fetch: 'Failed to fetch profile data.',
  },
  studentFeedback: {
    submit: 'Failed to submit feedback.',
  },
  registration: {
    fetch: 'Failed to fetch registration data.',
    submit: 'Failed to submit registration data.',
  },
  mentorMentee: {
    submit: 'Failed to submit mentor-mentee form.',
  },
  auth: {
    login: 'Failed to login. Please check your credentials.',
  },
};
