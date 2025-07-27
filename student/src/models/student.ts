export interface ApiStudentResponse {
    first_name: string;
    last_name: string;
    role: string;
    created_at: string;
    user_id: string;
    phone_number: number;
    email: string;
    department?: string;
    cgpa?: number;
    academic_standing?: string;
    credits_earned?: string;
    majorCode?: string;
    year_of_study?: string;
    batch?: string;
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