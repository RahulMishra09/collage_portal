// Centralized API endpoints for the project
export const API_ENDPOINTS = {
  attendance: {
    summary: '/src/pages/Attendance/data/summary.json',
    subjects: '/src/pages/Attendance/data/subjects.json',
    summarySubjects: '/src/pages/Attendance/data/summarySubjects.json',
    // Add real API endpoints here if needed
  },
  dashboard: {
    timetable: 'http://localhost:3000/api/students/timetable',
    studentDetail: (enrollmentNumber: string) => `http://localhost:3000/api/students/profile?regNo=${enrollmentNumber}`,
    upcomingEvents: 'http://localhost:3000/api/events/upcoming',
  },
  examination: {
    schedules: 'http://localhost:3000/api/students/examinations',
  },
  finance: {
    fees: '/src/pages/Finance/data/fees.json',
    paymentOptions: '/src/pages/Finance/data/paymentOptions.json',
  },
  grade: {
    grades: (semester: string) => `/api/grades?semester=${semester}`,
  },
  profile: {
    profile: (enrollmentNumber: string) => `http://localhost:3000/api/students/profile?regNo=${enrollmentNumber}`,
  },
  studentFeedback: {
    submit: 'http://localhost:3000/api/students/feedback',
  },
  registration: {
    fetchBridgeCourses: 'http://localhost:3000/api/students/bridge-courses',
    submitBridgeCourses: 'http://localhost:3000/api/students/submit-bridge-courses',
    fetchMakeUpCourses: 'https://api.example.com/Enrolledcourses',
    submitMakeUpCourses: 'https://api.example.com/submit-courses',
    fetchOpenElectiveCourses: 'http://localhost:3000/api/students/open-elective-courses',
    submitOpenElectiveCourses: 'https://api.example.com/submit-courses',
    fetchReRegistrationCourses: 'https://api.example.com/Enrolledcourses',
    submitReRegistrationCourses: 'https://api.example.com/submit-courses',
    fetchSemesterCourses: 'http://localhost:3000/api/students/ENR1/courses',
    registerSemesterCourses: 'http://localhost:3000/api/students/course/register',
  },
  mentorMentee: {
    mentorMentee: 'http://localhost:3000/api/students/mentor-mentee',
  },
  auth: {
    login: 'http://localhost:3000/api/students/signin',
  },
  noc: {
    submit: 'http://localhost:3000/api/students/noc/submit', // Placeholder
    requests: 'http://localhost:3000/api/students/noc/requests', // Placeholder
    types: 'http://localhost:3000/api/students/noc/types', // Placeholder
    download: (requestId: string) => `http://localhost:3000/api/students/noc/download/${requestId}` // Placeholder
  },
  assignments: {
    // Core assignment operations
    list: '/api/assignments',
    getById: (id: string) => `/api/assignments/${id}`,
    create: '/api/assignments',
    update: (id: string) => `/api/assignments/${id}`,
    delete: (id: string) => `/api/assignments/${id}`,
    
    // Submission operations
    submit: '/api/assignments/submit',
    updateSubmission: '/api/assignments/submissions/update',
    deleteSubmission: (submissionId: string) => `/api/assignments/submissions/${submissionId}`,
    userSubmissions: (assignmentId: string) => `/api/assignments/${assignmentId}/my-submissions`,
    submissions: '/api/assignments/submissions',
    submissionsByAssignment: (assignmentId: string) => `/api/assignments/${assignmentId}/submissions`,
    
    // File operations
    downloadFile: (assignmentId: string, fileName: string) => `/api/assignments/${assignmentId}/files/${fileName}`,
    downloadSubmissionFile: (submissionId: string, fileName: string) => `/api/assignments/submissions/${submissionId}/files/${fileName}`,
    
    // Supporting data
    subjects: '/api/assignments/subjects',
    constants: '/api/assignments/constants',
    
    // Rubrics and grading
    rubrics: '/api/assignments/rubrics',
    rubricByAssignment: (assignmentId: string) => `/api/assignments/${assignmentId}/rubrics`,
    
    // Eligibility and validation
    checkEligibility: (assignmentId: string) => `/api/assignments/${assignmentId}/eligibility`,
    
  },
  // Add more modules as needed
}; 