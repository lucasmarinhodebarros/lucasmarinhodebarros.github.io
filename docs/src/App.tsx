import { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PhotosPage } from './components/PhotosPage';
import { AboutPage } from './components/AboutPage';
import { NotFoundPage } from './components/NotFoundPage';
import { Favicon } from './components/Favicon';
import { ConsoleKitty } from './components/ConsoleKitty';

export default function App() {
  const [gradientPosition, setGradientPosition] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'fotos' | 'sobre' | '404'>('home');
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    let lastGradientPosition = 0;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          
          // Only update if scroll changed by at least 10px
          if (Math.abs(scrollPosition - lastScrollY) < 10) {
            ticking = false;
            return;
          }
          
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercentage = documentHeight > 0 ? Math.min(Math.max((scrollPosition / documentHeight) * 100, 0), 100) : 0;
          
          // Only update if gradient changed by at least 1%
          if (Math.abs(scrollPercentage - lastGradientPosition) >= 1) {
            setGradientPosition(Math.round(scrollPercentage * 10) / 10);
            lastGradientPosition = scrollPercentage;
          }
          
          setScrollY(scrollPosition);
          lastScrollY = scrollPosition;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = useCallback((page: 'home' | 'fotos' | 'sobre' | '404') => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const backgroundStyle = useMemo(() => {
    const topLightness = Math.max(70, 100 - gradientPosition * 0.3);
    

    const hue = (currentPage === 'home' || currentPage === 'fotos') 
      ? gradientPosition * 6 
      : gradientPosition * 3;

    const topColor = (currentPage === 'home' || currentPage === 'fotos')
      ? topLightness 
      : 98; 
    
    return {
      background: `linear-gradient(180deg, hsl(0, 0%, ${topColor}%), hsl(${hue}, 80%, 90%))`
    };
  }, [gradientPosition, currentPage]);


  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    const preventDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('dragstart', preventDragStart);

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('dragstart', preventDragStart);
    };
  }, []);

  return (
    <div 
      className="min-h-screen transition-all duration-300 ease-out"
      style={backgroundStyle}
    >
      {/* SEO & Metadata */}
      <Favicon />

      <ConsoleKitty />

      <Navbar 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        scrollY={scrollY}
        isPhotoOpen={isPhotoOpen}
        setIsPhotoOpen={setIsPhotoOpen}
      />

      {currentPage === 'home' && <HomePage gradientPosition={gradientPosition} scrollY={scrollY} />}
      {currentPage === 'fotos' && <PhotosPage isPhotoOpen={isPhotoOpen} setIsPhotoOpen={setIsPhotoOpen} />}
      {currentPage === 'sobre' && <AboutPage />}
      {currentPage === '404' && <NotFoundPage onNavigateHome={() => handleNavigate('home')} />}
    </div>
  );
}
