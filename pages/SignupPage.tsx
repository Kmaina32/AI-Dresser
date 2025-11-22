
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { GeoLogo } from '../components/logo.tsx';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon.tsx';

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      
      {/* Left Side - Cinematic Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-900 items-center justify-center">
        <div className="absolute inset-0">
            <img 
                src="https://storage.googleapis.com/aistudio-project-files/assets/gallery/gallery_3.webp" 
                alt="Geo Studio Fashion" 
                className="w-full h-full object-cover opacity-50 grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 p-12 max-w-lg text-center">
             <div className="mb-8 transform scale-150 origin-center inline-block">
                <GeoLogo />
            </div>
            <h1 className="text-5xl font-playfair text-white font-bold leading-tight mb-6 tracking-tight">
                Join the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Creative Collective</span>
            </h1>
            <p className="text-zinc-300 text-lg font-light leading-relaxed">
                Start your journey. Create unlimited high-fidelity designs with the power of generative AI.
            </p>
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 relative bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
         <button 
            onClick={() => onNavigate('landing')}
            className="absolute top-8 left-8 sm:left-16 lg:left-12 p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-2 group"
        >
            <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </button>

        <div className="w-full max-w-md mx-auto animate-fade-in">
            <div className="mb-10 lg:hidden text-center">
                 <GeoLogo className="justify-center mb-4" />
            </div>

            <div className="mb-8">
                <h2 className="text-4xl font-bold text-zinc-900 dark:text-white font-playfair mb-3">Create Account</h2>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">Fill in your details to get started.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 pl-1">Full Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-sm px-4 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-zinc-400 dark:placeholder-zinc-600 shadow-sm"
                        placeholder="Jane Doe"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 pl-1">Email Address</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-sm px-4 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-zinc-400 dark:placeholder-zinc-600 shadow-sm"
                        placeholder="name@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 pl-1">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-sm px-4 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-zinc-400 dark:placeholder-zinc-600 shadow-sm"
                        placeholder="Create a strong password"
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-500/5 border-l-2 border-red-500 text-left animate-fade-in">
                        <p className="text-red-600 dark:text-red-400 text-xs font-medium">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none mt-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                    {isLoading ? 'Creating...' : 'Register'}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/5 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Already have an account?{' '}
                    <button 
                        onClick={() => onNavigate('login')}
                        className="text-zinc-900 dark:text-white font-bold hover:text-amber-500 transition-colors ml-1 underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4"
                    >
                        Sign In
                    </button>
                </p>
            </div>
            
             <div className="mt-10 text-center opacity-50 hover:opacity-100 transition-opacity">
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    System Secure
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
