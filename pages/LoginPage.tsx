
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { GeoLogo } from '../components/logo.tsx';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon.tsx';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

// Live Neural Background Component
const LiveBackground = () => (
    <div className="absolute inset-0 overflow-hidden bg-zinc-950">
        {/* Moving Gradients */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-amber-500/10 rounded-full blur-[100px] animate-drift-slow"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[120px] animate-drift-reverse"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Floating Particles (CSS only for performance) */}
        <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-amber-500/20 rounded-full animate-bounce-slow"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping-slow"></div>
        </div>

        <style>{`
            @keyframes drift {
                0% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(10%, 10%) rotate(5deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
             @keyframes drift-reverse {
                0% { transform: translate(0, 0) rotate(0deg); }
                50% { transform: translate(-10%, -5%) rotate(-5deg); }
                100% { transform: translate(0, 0) rotate(0deg); }
            }
            .animate-drift-slow { animation: drift 20s infinite ease-in-out; }
            .animate-drift-reverse { animation: drift-reverse 25s infinite ease-in-out; }
            .animate-bounce-slow { animation: bounce 5s infinite; }
            .animate-ping-slow { animation: ping 3s infinite; }
        `}</style>
    </div>
);

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, loginWithGoogle, resetPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    
    try {
      if (isResetting) {
          await resetPassword(email);
          setSuccessMsg('Password reset link sent to your email.');
          setIsResetting(false);
      } else {
          await login(email, password);
          onNavigate('profile');
      }
    } catch (err: any) {
      setError(err.message || 'Operation failed. Please check your details.');
    }
  };

  const handleGoogleLogin = async () => {
      try {
          await loginWithGoogle();
          onNavigate('profile');
      } catch (err) {
          setError('Google sign in failed.');
      }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      
      {/* Left Side - Cinematic Live Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <LiveBackground />
        
        <div className="relative z-10 p-12 max-w-lg text-center backdrop-blur-sm rounded-3xl border border-white/5 bg-black/20">
            <div className="mb-8 transform scale-150 origin-center inline-block">
                <GeoLogo />
            </div>
            <h1 className="text-5xl font-playfair text-white font-bold leading-tight mb-6 tracking-tight">
                Design <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Intelligence</span>
            </h1>
            <p className="text-zinc-300 text-lg font-light leading-relaxed">
                Connecting to neural mainframe... <br/>
                Access the Studio database to visualize fashion, automotive, and architectural concepts.
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
                <h2 className="text-4xl font-bold text-zinc-900 dark:text-white font-playfair mb-3">
                    {isResetting ? 'Reset Access' : 'Welcome back'}
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {isResetting ? 'Enter your email to receive a recovery link.' : 'Authenticate with the system.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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

                {!isResetting && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center pl-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Password</label>
                            <button 
                                type="button" 
                                onClick={() => setIsResetting(true)}
                                className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-500 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-sm px-4 py-4 text-zinc-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-zinc-400 dark:placeholder-zinc-600 shadow-sm"
                            placeholder="••••••••"
                        />
                    </div>
                )}

                {error && (
                    <div className="p-3 bg-red-500/5 border-l-2 border-red-500 text-left animate-fade-in">
                        <p className="text-red-600 dark:text-red-400 text-xs font-medium">{error}</p>
                    </div>
                )}
                
                {successMsg && (
                    <div className="p-3 bg-green-500/5 border-l-2 border-green-500 text-left animate-fade-in">
                        <p className="text-green-600 dark:text-green-400 text-xs font-medium">{successMsg}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-black dark:hover:text-black transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none mt-4 shadow-lg hover:shadow-xl"
                >
                    {isLoading ? 'Processing...' : (isResetting ? 'Send Reset Link' : 'Sign In')}
                </button>
            </form>

            {isResetting ? (
                <button 
                    onClick={() => { setIsResetting(false); setError(''); }}
                    className="w-full mt-4 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black dark:hover:text-white"
                >
                    Back to Login
                </button>
            ) : (
                <>
                    <div className="flex items-center gap-4 my-8">
                        <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-white/10"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Or</span>
                        <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-white/10"></div>
                    </div>

                    <button 
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full py-3 bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-white font-medium text-sm rounded-sm hover:bg-zinc-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-3"
                    >
                        <GoogleIcon />
                        Sign in with Google
                    </button>

                    <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-white/5 text-center">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Don't have an account?{' '}
                            <button 
                                onClick={() => onNavigate('signup')}
                                className="text-zinc-900 dark:text-white font-bold hover:text-amber-500 transition-colors ml-1 underline decoration-zinc-300 dark:decoration-zinc-700 underline-offset-4"
                            >
                                Get Started
                            </button>
                        </p>
                    </div>
                </>
            )}
            
             <div className="mt-12 text-center opacity-50 hover:opacity-100 transition-opacity">
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Database Connected
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
