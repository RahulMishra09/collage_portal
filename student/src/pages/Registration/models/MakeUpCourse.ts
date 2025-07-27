export type MakeUpCourse = {
  courseName: string;
  courseNumber: string;
  description: string;
  credits: number;
  selected: boolean;
}; 
export interface EnrolledCourse {
  description: string;
  courseName: string;
  courseNumber: string;
  selected: boolean;
  credits: number;
}
