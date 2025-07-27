// src/App.tsx
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import {AuthProvider} from './contexts/AuthContext';
// import {ToastProvider} from './components/ui/toast.tsx';
import AppRoutes from './routes';
import { ErrorBoundary } from './errors/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                {/* // <ToastProvider> */}
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
                {/* // </ToastProvider> */}
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;