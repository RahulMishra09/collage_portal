// Event models
export interface ApiEvent {
    id: number;
    title: string;
    date?: string;
    time?: string;
    location: string;
    host_type?: string;
    event_id?: number;
    description?: string;
    event_type?: string;
    start_time?: string | null;
    end_time?: string | null;
    is_all_day?: boolean;
    organizer_id?: string;
    course_id?: number | null;
}

export interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
}

export interface UpcomingEventsProps {
    events?: Event[];
}

// Class models
export interface Class {
    name: string;
    time: string;
    color: string;
}

export interface TimetableEntry {
    id?: number;
    enrollment_number?: string;
    timetable?: {
        mode: string;
        end_time: string;
        location: string;
        course_id: number;
        course_name?: string;
        start_time: string;
        day_of_week: string;
        professor_id: number;
        timetable_id: number;
    };
    // For other usages
    course_name?: string;
    start_time?: string;
    end_time?: string;
    location?: string;
    mode?: string;
}

// User models
export interface User {
    name: string;
    email: string;
    role: string;
    enrollmentNumber: string;
    userId?: string;
    phoneNumber?: number;
    createdAt?: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
}

export interface ApiStudentResponse {
    batch?: string;
    cgpa?: number;
    academic_standing?: string;
    credits_earned?: string;
    department?: string;
    year_of_study?: string;
}

export interface StudentData {
    name: string;
    major: string;
    gpa: number;
    academicStanding: string;
    credits: string;
    majorCode: string;
    year: string;
} 