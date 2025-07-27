export interface Course {
    description: string;
    courseName: string;
    courseNumber: string;
    filled?: number;
    selected: boolean;
    credits?: number;
}