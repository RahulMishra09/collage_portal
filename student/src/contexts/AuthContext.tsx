// src/contexts/AuthContext.tsx
import {createContext, useContext, useState} from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../pages/Dashboard/models';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    // Initialize state from localStorage (important to do this synchronously during component creation)
    const getInitialAuthState = () => {
        try {
            const token = localStorage.getItem('authToken');
            const userJSON = localStorage.getItem('user');

            if (token && userJSON) {
                return {
                    user: JSON.parse(userJSON),
                    isAuthenticated: true
                };
            }
        } catch (error) {
            console.error('Failed to parse user data:', error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }

        return {
            user: null,
            isAuthenticated: false
        };
    };

    const initialState = getInitialAuthState();
    const [user, setUser] = useState<User | null>(initialState.user);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState.isAuthenticated);

    const login = (token: string, userData: User) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}