
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { GeoLogo } from '../components/logo.tsx';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      onNavigate('profile');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden px-4">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8 md:p-10">
          
          <div className="flex flex-col items-center text-center mb-10">
            <div className="mb-6 transform scale-110">
               <GeoLogo />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white font-playfair">Welcome Back</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">Sign in to access your design studio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 pl-1">Email</label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
                    placeholder="name@example.com"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center pl-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">Password</label>
                    <button type="button" className="text-[10px] text-amber-600 dark:text-amber-500 hover:underline">Forgot?</button>
                </div>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder-zinc-400 dark:placeholder-zinc-600"
                    placeholder="••••••••"
                />
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-center">
                    <p className="text-red-600 dark:text-red-400 text-xs font-medium">{error}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-[0.2em] rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none mt-4"
            >
                {isLoading ? 'Authenticating...' : 'Enter Studio'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/5 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                New to Geo Studio?{' '}
                <button 
                    onClick={() => onNavigate('signup')}
                    className="text-zinc-900 dark:text-white font-bold hover:text-amber-500 transition-colors ml-1"
                >
                    Create Account
                </button>
            </p>
          </div>

        </div>
        
        <div className="mt-8 text-center opacity-40">
             <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Secured by Stack Auth</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
