import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import AnimatePage from './pages/AnimatePage';
import StyleQuizPage from './pages/StyleQuizPage';
import { GalleryItem } from './data/galleryData';

export interface RemixConfig extends Omit<GalleryItem, 'image' | 'title' | 'description'> {}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [remixConfig, setRemixConfig] = useState<RemixConfig | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    // Clear remix config when navigating manually
    if (page !== 'home') {
      setRemixConfig(null);
    }
  };

  const handleRemix = (config: RemixConfig) => {
    setRemixConfig(config);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage initialRemixConfig={remixConfig} clearRemixConfig={() => setRemixConfig(null)} />;
      case 'animate':
        return <AnimatePage />;
      case 'gallery':
        return <GalleryPage onRemix={handleRemix} />;
      case 'quiz':
        return <StyleQuizPage onRemix={handleRemix} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage initialRemixConfig={remixConfig} clearRemixConfig={() => setRemixConfig(null)} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header onNavigate={handleNavigate} />
      {renderPage()}
    </div>
  );
};

export default App;