import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { GamePage } from './pages/GamePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useProgress } from './hooks/useProgress';

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash ? window.location.hash.slice(1) : '/';
  });

  const {
    totalStars,
    totalCompleted,
    soundEnabled,
    toggleSound,
    recordCompletion,
    getLevelProgress,
  } = useProgress();

  // Listen to hash change for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      setCurrentPath(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route parsing
  let content = null;

  if (currentPath === '/' || currentPath === '') {
    content = (
      <HomePage
        onNavigate={navigate}
        onPlayLevel={(levelId) => navigate(`/play/${levelId}`)}
        totalCompleted={totalCompleted}
        getLevelProgress={getLevelProgress}
      />
    );
  } else if (currentPath.startsWith('/categories')) {
    // Parse query param e.g. /categories?category=animals
    const urlParams = new URLSearchParams(
      currentPath.includes('?') ? currentPath.split('?')[1] : ''
    );
    const categoryParam = urlParams.get('category') || undefined;

    content = (
      <CategoriesPage
        initialCategoryId={categoryParam}
        onSelectLevel={(levelId) => navigate(`/play/${levelId}`)}
        onBackToHome={() => navigate('/')}
        getLevelProgress={getLevelProgress}
      />
    );
  } else if (currentPath.startsWith('/play/')) {
    const levelId = currentPath.replace('/play/', '').split('?')[0];

    content = (
      <GamePage
        levelId={levelId}
        onBack={() => navigate('/categories')}
        onGoToCategories={() => navigate('/categories')}
        onNavigateToLevel={(nextId) => navigate(`/play/${nextId}`)}
        onLevelComplete={recordCompletion}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />
    );
  } else {
    content = (
      <NotFoundPage
        onGoHome={() => navigate('/')}
        onGoCategories={() => navigate('/categories')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-between text-slate-100">
      <div>
        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
          totalStars={totalStars}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
        <main>{content}</main>
      </div>
      <Footer />
    </div>
  );
};

export default App;

