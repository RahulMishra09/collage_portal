import type { JSX } from 'react';
export type FeeItem = {
    item: 'Semester Fee' | 'Registration Fee' | 'Library Fee' | 'Lab Fee' | 'Student Activity Fee' | 'Health Services' | 'Technology Fee';
    amount: string;
};

export type PaymentOptionType = {
    title: string;
    icon: JSX.Element;
    buttonColor: string;
}; 