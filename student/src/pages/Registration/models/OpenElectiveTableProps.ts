export type OpenElectiveTableProps = {
  courses: Array<{
    courseName: string;
    courseNumber: string;
    description: string;
    filled: number;
    selected: boolean;
  }>;
  loading: boolean;
  error?: string | null;
  handleSelectToggle: (courseNumber: string) => void;
  handleSubmit: () => void;
}; 