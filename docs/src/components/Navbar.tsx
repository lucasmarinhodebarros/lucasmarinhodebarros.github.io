import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onNavigate: (page: 'home' | 'fotos' | 'sobre') => void;
  currentPage: string;
  scrollY: number;
  isPhotoOpen: boolean;
  setIsPhotoOpen: (open: boolean) => void;
}

export function Navbar({ isMenuOpen, setIsMenuOpen, onNavigate, currentPage, scrollY, isPhotoOpen, setIsPhotoOpen }: NavbarProps) {
  const handleNavigation = (page: 'home' | 'fotos' | 'sobre') => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate scroll progress for name animation (0 to 1)
  const scrollProgress = Math.min(scrollY / 500, 1); // Animate over first 500px of scroll
  const showNavName = scrollProgress > 0.8; // Show in navbar after 80% of animation
  
  // Get the page title based on current page
  const getPageTitle = () => {
    switch (currentPage) {
      case 'home':
        return 'Lucas Marinho';
      case 'fotos':
        return 'galeria de fotos';
      case 'sobre':
        return 'sobre mim';
      default:
        return 'Lucas Marinho';
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[60] p-4 md:p-6 transition-all duration-300`}
        style={{
          ...(isPhotoOpen ? { pointerEvents: 'none' } : {}),
          ...(showNavName && !isMenuOpen && !isPhotoOpen ? {
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px) saturate(150%)',
            WebkitBackdropFilter: 'blur(10px) saturate(150%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
          } : {})
        }}
      >
        <div className="flex justify-between items-center">
          {/* Logo/Name - Shows when scrolled */}
          <motion.button
            onClick={handleScrollToTop}
            className="transition-colors overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: showNavName && !isPhotoOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              color: '#000000',
              pointerEvents: 'auto',
              fontWeight: 900
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#444444'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
          >
            {getPageTitle()}
          </motion.button>

          {/* Menu Button */}
          <button
            onClick={() => {
              if (isPhotoOpen) {
                setIsPhotoOpen(false);
              } else {
                setIsMenuOpen(!isMenuOpen);
              }
            }}
            className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group"
            style={{ pointerEvents: 'auto' }}
            aria-label={isPhotoOpen ? "Close photo" : "Toggle menu"}
          >
            <div className="w-6 h-5 md:w-7 md:h-6 relative flex flex-col justify-center items-center">
              {/* Top line */}
              <motion.span
                className="absolute w-full h-0.5 rounded-full"
                animate={
                  isMenuOpen || isPhotoOpen
                    ? { rotate: 45, y: 0, backgroundColor: isPhotoOpen ? '#ffffff' : '#000000' }
                    : { rotate: 0, y: -4, backgroundColor: '#000000' }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              {/* Bottom line */}
              <motion.span
                className="absolute w-full h-0.5 rounded-full"
                animate={
                  isMenuOpen || isPhotoOpen
                    ? { rotate: -45, y: 0, backgroundColor: isPhotoOpen ? '#ffffff' : '#000000' }
                    : { rotate: 0, y: 4, backgroundColor: '#000000' }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px) saturate(150%)',
              WebkitBackdropFilter: 'blur(10px) saturate(150%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full flex flex-col items-center justify-center space-y-8 md:space-y-12">
              <motion.button
                onClick={() => handleNavigation('home')}
                className="transition-colors"
                style={{ color: '#000000' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#444444'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
              >
                início
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('fotos')}
                className="transition-colors"
                style={{ color: '#000000' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#444444'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.15 }}
              >
                fotos
              </motion.button>

              <motion.button
                onClick={() => handleNavigation('sobre')}
                className="transition-colors"
                style={{ color: '#000000' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#444444'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#000000'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                sobre mim
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
