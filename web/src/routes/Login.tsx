import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail01Icon, LockPasswordIcon, Ticket02Icon } from 'hugeicons-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-background">
      {/* Top Gradient Accent */}
      <div className="h-32 bg-gradient-primary opacity-20 blur-3xl absolute top-0 left-0 right-0"></div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
        {/* Logo with Glow */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-purple rounded-3xl mb-6 shadow-glow">
            <Ticket02Icon size={48} color="#ffffff" variant="solid" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Epiko Shows</span>
          </h1>
          <p className="text-text-secondary text-sm">Your premium movie experience</p>
        </div>

        {/* Login Card with Glass Effect */}
        <div className="w-full space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input - Modern */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Mail01Icon size={20} color="#9CA3AF" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-background-card border border-border rounded-2xl pl-12 pr-4 py-4 text-white placeholder-text-muted focus:outline-none focus:border-primary focus:shadow-glow smooth-transition"
              />
            </div>

            {/* Password Input - Modern */}
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <LockPasswordIcon size={20} color="#9CA3AF" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-background-card border border-border rounded-2xl pl-12 pr-4 py-4 text-white placeholder-text-muted focus:outline-none focus:border-primary focus:shadow-glow smooth-transition"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-primary text-sm hover:text-primary-light smooth-transition">
                Forgot password?
              </button>
            </div>

            {/* Login Button - Gradient */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-purple hover:shadow-glow text-white font-semibold py-4 rounded-2xl smooth-transition disabled:opacity-50 active:scale-95 shadow-card mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-text-muted text-xs uppercase">Or</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Sign Up */}
          <button className="w-full bg-background-card border-2 border-border hover:border-primary text-white font-medium py-4 rounded-2xl smooth-transition">
            Create New Account
          </button>

          {/* Footer Note */}
          <p className="text-center text-text-muted text-xs mt-8">
            Demo mode: Enter any credentials to continue
          </p>
        </div>
      </div>
    </div>
  );
}
