import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { API_ENDPOINTS } from '../../api/endpoints';
import { apiRequest } from '../../api/client';
import { User, Globe } from 'lucide-react';
import logo from '@/assets/dark/img/manipal_logo.png';
import CollegeExamSVG from '@/assets/dark/svg/college_exam.svg?react';
import CollegeClassCuateSVG from '@/assets/dark/svg/college class-cuate.svg?react';

// --- UTILS ---
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- HOOKS ---
function useLoginForm(onLogin: (token: string, userData: any) => void, navigate: (path: string) => void) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!isValidEmail(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      setIsLoading(false);
      return;
    }

    try {
      const data: any = await apiRequest(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const userData = {
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        role: data.role,
        enrollmentNumber: data.enrollment_number,
        userId: data.user_id,
        phoneNumber: data.phone_number,
        createdAt: data.created_at,
      };
      onLogin(data.token || 'default-token', userData);
      setMessage({ type: 'success', text: 'Login successful!' });
      navigate('/');
    } catch (err) {
      setMessage({ type: 'error', text: 'Invalid email or password.' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    message,
    handleSubmit,
  };
}

// --- LeftSideIllustration Component ---
function LeftSideIllustration() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-100/10 overflow-hidden">
      {/* Logo at the top left */}
      <div className="absolute top-8 left-8 w-40 max-w-xs z-10">
        <img src={logo} alt="Manipal Logo" className="w-full h-auto" />
      </div>

      {/* Hero Illustration (centered) */}
      <div className="flex flex-col items-center justify-center w-full mt-24 mb-4">
        <CollegeClassCuateSVG className="w-full max-w-2xl h-[28vh] md:h-[36vh] lg:h-[48vh]" />
        {/* Brand message and illustration side by side */}
        <div className="flex items-center mt-16">
          <div className="w-32 md:w-40 flex-shrink-0">
            <CollegeExamSVG className="w-full h-auto" />
          </div>
          <div className="ml-6 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 tracking-tight">Prajñānam Brahma</h2>
            <p className="text-lg md:text-xl text-zinc-600 mt-2">Where Knowledge is Supreme</p>
          </div>
        </div>
      </div>

      {/* Small Illustration at bottom left */}
      
    </div>
  );
}

// --- LoginForm Component ---
function LoginForm({ onLogin, skipLogin, navigate }: { onLogin: (token: string, userData: any) => void; skipLogin: () => void; navigate: (path: string) => void; }) {
  const { email, setEmail, password, setPassword, isLoading, message, handleSubmit } = useLoginForm(onLogin, navigate);

  return (
    <div className="flex items-center justify-center h-full min-h-screen text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-left">
          <h1 className="text-4xl font-semibold">Log In</h1>
          <p className="text-gray-400">Log in to access your student portal</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Floating Label Input: Email */}
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full bg-neutral-900 border-neutral-800 text-white rounded-lg pt-6 pb-2 h-auto"
              required
            />
            <Label
              htmlFor="email"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-all duration-200 ease-in-out
                         peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0
                         peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-0"
            >
              Email
            </Label>
          </div>

          {/* Floating Label Input: Password */}
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full bg-neutral-900 border-neutral-800 text-white rounded-lg pt-6 pb-2 h-auto"
              required
            />
            <Label
              htmlFor="password"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-all duration-200 ease-in-out
                         peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0
                         peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-0"
            >
              Password
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200 rounded-full py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800 rounded-full py-3"
            onClick={skipLogin}
          >
            Skip Login
          </Button>
          {message && (
            <p className={`text-center text-sm ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {message.text}
            </p>
          )}
        </form>
        <div className="relative flex items-center justify-center text-gray-500">
          <div className="absolute inset-x-0 h-px bg-neutral-800" />
          <span className="relative z-10 bg-black px-3 text-sm text-neutral-500">Or</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800 rounded-full py-3"
          >
            <Globe className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800 rounded-full py-3"
          >
            <User className="mr-2 h-4 w-4" />
            Facebook
          </Button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-yellow-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (token: string, userData: any) => {
    login(token, userData);
  };

  const skipLogin = () => {
    login('test-token', {
      name: 'Test User',
      email: 'test@example.com',
      role: 'student',
      enrollmentNumber: '123456',
      userId: 'test-id',
      createdAt: new Date().toISOString(),
    });
    navigate('/');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen font-sans bg-black">
      <div className="lg:col-span-3 bg-white rounded-xl lg:m-4">
        <LeftSideIllustration />
      </div>
      <div className="lg:col-span-2 bg-black">
        <LoginForm onLogin={handleLogin} skipLogin={skipLogin} navigate={navigate} />
      </div>
    </div>
  );
}