export type SemesterCourseTableProps = {
  courses: Array<{
    courseName: string;
    courseNumber: string;
    description: string;
    credits: number;
    selected: boolean;
  }>;
  loading: boolean;
  error?: string | null;
  handleSelectToggle: (courseNumber: string) => void;
  handleRegister: () => void;
}; 