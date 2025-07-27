import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import logo from '@/assets/dark/img/manipal_logo.png';
import CollegeExamSVG from '@/assets/dark/svg/college_exam.svg?react';
import CollegeClassCuateSVG from '@/assets/dark/svg/college class-cuate.svg?react';
import { User, Globe } from 'lucide-react';

// --- LeftSideIllustration Component (copied from Login) ---
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
    </div>
  );
}

// --- SignupForm Component ---
function SignupForm({ onSignup, loading, error }: { onSignup: (userData: any) => void; loading: boolean; error: string; }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    enrollmentNumber: '',
  });
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (userData.password !== userData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    onSignup(userData);
  };

  return (
    <div className="flex items-center justify-center h-full min-h-screen text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-left">
          <h1 className="text-4xl font-semibold">Sign Up</h1>
          <p className="text-gray-400">Create your student portal account</p>
        </div>
        {(error || localError) && (
          <p className="text-center text-sm text-red-500">{error || localError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Floating Label Input: Name */}
          <div className="relative">
            <Input
              id="name"
              name="name"
              type="text"
              placeholder=" "
              value={userData.name}
              onChange={handleChange}
              className="peer w-full bg-neutral-900 border-neutral-800 text-white rounded-lg pt-6 pb-2 h-auto"
              required
            />
            <Label
              htmlFor="name"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-all duration-200 ease-in-out
                         peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0
                         peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-0"
            >
              Full Name
            </Label>
          </div>
          {/* Floating Label Input: Enrollment Number */}
          <div className="relative">
            <Input
              id="enrollmentNumber"
              name="enrollmentNumber"
              type="text"
              placeholder=" "
              value={userData.enrollmentNumber}
              onChange={handleChange}
              className="peer w-full bg-neutral-900 border-neutral-800 text-white rounded-lg pt-6 pb-2 h-auto"
              required
            />
            <Label
              htmlFor="enrollmentNumber"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-all duration-200 ease-in-out
                         peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0
                         peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-0"
            >
              Enrollment Number
            </Label>
          </div>
          {/* Floating Label Input: Email */}
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder=" "
              value={userData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              placeholder=" "
              value={userData.password}
              onChange={handleChange}
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
          {/* Floating Label Input: Confirm Password */}
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder=" "
              value={userData.confirmPassword}
              onChange={handleChange}
              className="peer w-full bg-neutral-900 border-neutral-800 text-white rounded-lg pt-6 pb-2 h-auto"
              required
            />
            <Label
              htmlFor="confirmPassword"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-all duration-200 ease-in-out
                         peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0
                         peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-0"
            >
              Confirm Password
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200 rounded-full py-3"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
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
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- Main Page Component ---
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (__userData: any) => {
    setLoading(true);
    setError('');
    try {
      // Simulate signup success
      navigate('/login', { state: { message: 'Account created successfully. Please log in.' } });
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen font-sans bg-black">
      <div className="lg:col-span-3 bg-white rounded-xl lg:m-4">
        <LeftSideIllustration />
      </div>
      <div className="lg:col-span-2 bg-black">
        <SignupForm onSignup={handleSignup} loading={loading} error={error} />
      </div>
    </div>
  );
}