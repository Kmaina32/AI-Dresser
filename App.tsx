import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './Header.tsx';
import ChatWidget from './components/ChatWidget.tsx';
import GlobalLoader from './components/GlobalLoader.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { RemixConfig } from './constants.ts';

// Lazy Load Pages for Performance Code Splitting
const HomePage = lazy(() => import('./pages/HomePage.tsx'));
const VehiclePage = lazy(() => import('./pages/VehiclePage.tsx'));
const InteriorPage = lazy(() => import('./pages/InteriorPage.tsx'));
const LandscapePage = lazy(() => import('./pages/LandscapePage.tsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.tsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'));
const AnimatePage = lazy(() => import('./pages/AnimatePage.tsx'));
const StyleQuizPage = lazy(() => import('./pages/StyleQuizPage.tsx'));
const MusicPosterPage = lazy(() => import('./pages/MusicPosterPage.tsx'));
const StudioSessionPage = lazy(() => import('./pages/StudioSessionPage.tsx'));
const CampaignPage = lazy(() => import('./pages/CampaignPage.tsx'));
const LandingPage = lazy(() => import('./pages/LandingPage.tsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.tsx'));
const SignupPage = lazy(() => import('./pages/SignupPage.tsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage.tsx'));

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [remixConfig, setRemixConfig] = useState<RemixConfig | null>(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  // Sync URL with state on initial load (SSR/Refresh support)
  useEffect(() => {
    // Strip leading/trailing slashes
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    if (path && path !== '') {
       setCurrentPage(path);
    }
  }, []);

  const handleNavigate = async (page: string) => {
    if (page === currentPage) return;
    
    setIsGlobalLoading(true);
    
    // Simulate a brief network/rendering delay for smoother UX feel during page transitions
    await new Promise(resolve => setTimeout(resolve, 400));

    setCurrentPage(page);
    if (page !== 'home') setRemixConfig(null);
    
    // Update URL without reload
    const urlPath = page === 'landing' ? '/' : `/${page}`;
    try {
      window.history.pushState({ page }, '', urlPath);
    } catch (e) {
      console.warn("History update blocked by environment");
    }
    
    window.scrollTo(0, 0);
    setIsGlobalLoading(false);
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
    switch (currentPage) {
      case 'landing': return <LandingPage onNavigate={handleNavigate} />;
      case 'home': return <HomePage initialRemixConfig={remixConfig} clearRemixConfig={() => setRemixConfig(null)} />;
      case 'vehicle': return <VehiclePage />;
      case 'interior': return <InteriorPage />;
      case 'landscape': return <LandscapePage />;
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

  // Determine if the global header should be shown
  const showGlobalHeader = !['landing', 'login', 'signup'].includes(currentPage);

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 font-sans selection:bg-amber-500/30 selection:text-black dark:selection:text-white flex flex-col transition-colors duration-500">
        {/* Global Loader Overlay */}
        {isGlobalLoading && <GlobalLoader />}

        {/* Global Background Pattern */}
        <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-30 z-0" />
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-white/50 via-white/10 to-transparent dark:from-transparent dark:via-zinc-950/50 dark:to-zinc-950 z-0" />
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.08),transparent_50%)] z-0" />
        
        {/* Conditionally Render Header */}
        {showGlobalHeader && <Header onNavigate={handleNavigate} />}
        
        {/* Main Content Area */}
        <main className={`flex-1 relative flex flex-col ${isGlobalLoading ? 'opacity-50 pointer-events-none filter blur-sm' : 'opacity-100'} transition-all duration-300`}>
          <div className={`flex-1 w-full ${!showGlobalHeader ? '' : 'mt-16'}`}>
              <Suspense fallback={<GlobalLoader />}>
                  {renderPage()}
              </Suspense>
          </div>
        </main>
        
        {/* AI Assistant */}
        <ChatWidget />
      </div>
    </ErrorBoundary>
  );
};

export default App;