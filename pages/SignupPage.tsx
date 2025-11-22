
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { GeoLogo } from '../components/logo.tsx';

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signup(name, email, password);
      onNavigate('profile');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="glass-panel rounded-2xl p-8 md:p-10 shadow-2xl border border-white/20 dark:border-white/5 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl">
          
          <div className="flex flex-col items-center text-center mb-8">
             <div className="mb-6 scale-110">
                <GeoLogo />
             </div>
             <h2 className="text-2xl font-bold font-playfair text-zinc-900 dark:text-white">Join the Collective</h2>
             <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Create your account to start designing.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder-zinc-400"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder-zinc-400"
                placeholder="design@geostudio.ai"
              />
            </div>

            <div className="space-y-1">
               <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all placeholder-zinc-400"
                placeholder="Create a strong password"
              />
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs text-center font-medium">
                    {error}
                </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-[0.15em] rounded-lg shadow-lg hover:shadow-xl transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
               {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                      Initializing...
                  </span>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/5 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Already have an account?{' '}
              <button 
                onClick={() => onNavigate('login')}
                className="text-zinc-900 dark:text-white font-bold hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>

        </div>
        
        <p className="text-center text-[10px] text-zinc-400 mt-8 opacity-60 uppercase tracking-widest">
            Secured by Stack Auth & Neon DB
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
