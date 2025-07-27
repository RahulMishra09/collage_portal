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
