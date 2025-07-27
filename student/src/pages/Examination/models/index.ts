export interface ExamSchedule {
    exam_id: number;
    course_id: number;
    course_name: string;
    exam_type: string;
    exam_date: string;
    total_marks: number;
    location: string;
}

export interface SearchBarProps {
    onSearch: (term: string) => void;
}

export interface FilterControlsProps {
    onTypeChange: (type: string) => void;
    onSortDirectionChange: () => void;
    onRefresh: () => void;
    sortDirection: 'asc' | 'desc';
    isLoading: boolean;
    examTypes: string[];
}

export interface ErrorMessageProps {
    message: string | null;
}

export interface LoadingSpinnerProps {
    isLoading: boolean;
}

export interface ExamCardProps {
    exam: ExamSchedule;
    index: number;
}

export interface EmptyStateProps {
    isVisible: boolean;
}

export interface ExamListProps {
    exams: ExamSchedule[];
    isLoading: boolean;
} 