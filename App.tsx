
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import HomePage from './pages/HomePage.tsx';
import GalleryPage from './pages/GalleryPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import AnimatePage from './pages/AnimatePage.tsx';
import StyleQuizPage from './pages/StyleQuizPage.tsx';
import MusicPosterPage from './pages/MusicPosterPage.tsx';
import StudioSessionPage from './pages/StudioSessionPage.tsx';
import CampaignPage from './pages/CampaignPage.tsx';
import LandingPage from './pages/LandingPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignupPage from './pages/SignupPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import ChatWidget from './components/ChatWidget.tsx';
import { RemixConfig } from './constants.ts';
import { useAuth } from './context/AuthContext.tsx';
import { GeoLogo } from './components/logo.tsx';

// Pages that do not require authentication
const PUBLIC_PAGES = ['landing', 'about', 'login', 'signup'];

const App: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');
  const [remixConfig, setRemixConfig] = useState<RemixConfig | null>(null);

  // Sync URL with state on initial load (SSR/Refresh support)
  useEffect(() => {
    // Strip leading/trailing slashes
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path && path !== '') {
      setCurrentPage(path);
    }
  }, []);

  const handleNavigate = (page: string) => {
    // Route Protection: If trying to access private page without user, redirect to login
    if (!isLoading && !user && !PUBLIC_PAGES.includes(page)) {
        setCurrentPage('login');
        window.history.pushState({ page: 'login' }, '', '/login');
        return;
    }

    setCurrentPage(page);
    if (page !== 'home') setRemixConfig(null);
    
    // Update URL without reload
    const urlPath = page === 'landing' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', urlPath);
    
    window.scrollTo(0, 0);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
        const path = window.location.pathname.replace(/^\/|\/$/g, '');
        setCurrentPage(path || 'landing');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleRemix = (config: RemixConfig) => {
    setRemixConfig(config);
    handleNavigate('home');
  };

  const renderPage = () => {
    // Show Loading Spinner while Auth is restoring
    if (isLoading) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center pt-32">
                <div className="scale-150 animate-pulse mb-8">
                    <GeoLogo />
                </div>
                <div className="w-48 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 animate-progress"></div>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-400">System Initializing</p>
            </div>
        );
    }

    // Double-check route protection during render (handles deep links/refresh)
    const isPublic = PUBLIC_PAGES.includes(currentPage);
    if (!isPublic && !user) {
        // Return login page if unauthorized, but don't change state to avoid loops during render
        return <LoginPage onNavigate={handleNavigate} />;
    }

    switch (currentPage) {
      case 'landing': return <LandingPage onNavigate={handleNavigate} />;
      case 'home': return <HomePage initialRemixConfig={remixConfig} clearRemixConfig={() => setRemixConfig(null)} />;
      case 'session': return <StudioSessionPage />;
      case 'campaign': return <CampaignPage />;
      case 'poster': return <MusicPosterPage />;
      case 'animate': return <AnimatePage />;
      case 'gallery': return <GalleryPage onRemix={handleRemix} />;
      case 'quiz': return <StyleQuizPage onRemix={handleRemix} />;
      case 'about': return <AboutPage />;
      case 'login': return <LoginPage onNavigate={handleNavigate} />;
      case 'signup': return <SignupPage onNavigate={handleNavigate} />;
      case 'profile': return <ProfilePage onNavigate={handleNavigate} />;
      default: return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 font-sans selection:bg-amber-500/30 selection:text-black dark:selection:text-white flex flex-col transition-colors duration-500">
      {/* Global Background Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-30 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-white/50 via-white/10 to-transparent dark:from-transparent dark:via-zinc-950/50 dark:to-zinc-950 z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.08),transparent_50%)] z-0" />
      
      <Header onNavigate={handleNavigate} />
      
      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col">
        <div className={`flex-1 w-full ${currentPage === 'landing' || currentPage === 'login' || currentPage === 'signup' ? '' : 'mt-16'}`}>
             {renderPage()}
        </div>
      </main>
      
      {/* AI Assistant */}
      <ChatWidget />
    </div>
  );
};

export default App;
