
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { GeoLogo } from '../components/logo.tsx';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon.tsx';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      onNavigate('profile');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center px-4 py-12 bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8 glass-panel p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <GeoLogo className="scale-125" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white font-playfair">Welcome Back</h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to access your creative suite
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-500 text-zinc-900 dark:text-white rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 placeholder-zinc-500 dark:placeholder-zinc-500 text-zinc-900 dark:text-white rounded-lg bg-transparent focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-widest rounded-lg text-black bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-all"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Don't have an account?{' '}
            <button onClick={() => onNavigate('signup')} className="font-medium text-amber-600 dark:text-amber-500 hover:text-amber-500">
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
