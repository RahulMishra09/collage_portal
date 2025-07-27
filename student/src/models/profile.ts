import type { ReactNode } from 'react';

export interface ProfileDataType {
    name: string;
    registrationNumber: string;
    semester: string;
    branch: string;
    program: string;
    year: string;
    gender: string;
    phone: string;
    email: string;
    classCoordinator: string;
    cgpa: string;
    attendance: string;
    campus: string;
}

export interface ProfileFieldProps {
    icon: ReactNode;
    label: string;
    value: string;
}

export interface InfoCardProps {
    label: string;
    value: string;
    icon: ReactNode;
} 