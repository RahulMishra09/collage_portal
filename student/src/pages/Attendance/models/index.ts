export interface Subject {
    name: string;
    attendance: number;
    courseId: number;
}

export interface AttendanceRecord {
    date: string;
    status: string;
    course_id: number;
    course_name: string;
}

export interface DetailedSubject {
    serialNo: number;
    name: string;
    code: string;
    section: string;
    batch: string;
    presentNo: number;
    absentNo: number;
    totalClasses: number;
    percentage: number;
} 