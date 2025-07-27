import type { SemesterCourses } from '@/pages/Registration/models/SemesterCourse';
import type { ApiCourse } from '../models/ApiCourse';

export function mapApiToSemesterCourses(apiData: ApiCourse[]): SemesterCourses[] {
  return apiData.map((apiCourse: ApiCourse) => ({
    courseName: apiCourse.course_name,
    courseNumber: apiCourse.course_code,
    description: `Course ID: ${apiCourse.course_id}, Semester: ${apiCourse.semester}`,
    credits: 3,
    selected: false,
  }));
}

export function parseCourseId(description: string): number {
  const match = description.match(/Course ID: (\d+)/);
  return match ? parseInt(match[1]) : 0;
} 