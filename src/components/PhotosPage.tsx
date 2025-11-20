import { motion, AnimatePresence } from 'motion/react';
import { ImageFallback } from './ImageFallback';
import { useEffect, useState } from 'react';
import { Footer } from './Footer';
import { ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface PhotosPageProps {
  isPhotoOpen: boolean;
  setIsPhotoOpen: (open: boolean) => void;
}

export function PhotosPage({ isPhotoOpen, setIsPhotoOpen }: PhotosPageProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const photoData = [
    { 
      id: 1, 
      src: "/images/Wicked_2025.jpg",
      alt: "Palco do musical Wicked Brasil 2025 com confetes caindo e a projeção escrita WICKED ATÉ 10 DE AGOSTO",
      title: "100 sessões de Wicked - O Musical",
      year: "2025",
      camera: "Sony α6400",
      description: "Fotografia do anúncio de extensão das datas de Wicked na centésima sessão."
    },
    { 
      id: 2, 
      src: "/images/Cassandra_Bea-Pacheco.png",
      alt: "Cena do videoclipe Cassandra com uma jovem mulher em meio a pessoas em um bar",
      title: "Videoclipe Cassandra",
      year: "2025",
      camera: "Canon EOS R10",
      description: "Minha cena favorita do videoclipe que filmei com a atriz maravilhosa Beá Pacheco."
    },
    { 
      id: 3, 
      src: "/images/Flores_Cinemateca.jpg",
      alt: "Pequenas flores roxas e sua folhagem verde com um muro de tijolos ao fundo",
      title: "Flores da Cinemateca",
      year: "2023",
      camera: "Samsung Galaxy S21 FE",
      description: "Estudo de cores do meu 1° semestre de Cinema e Audiovisual na ESPM."
    },
    { 
      id: 4, 
      src: "/images/Jovens_CCSP.jpg",
      alt: "Uma garota loira e um menino de descendência asiática de rostos juntos no CCSP em foto preta e branca",
      title: "Meus besties",
      year: "2023",
      camera: "Canon EOS R10",
      description: "Exercício de fotografia no Centro Cultural de São Paulo (CCSP)."
    },
    { 
      id: 5, 
      src: "/images/Lua_ampliada.jpg",
      alt: "Lua cheia com detalhes nítidos de sua superfície contra o céu preto",
      title: "Lua ampliada",
      year: "2024",
      camera: "Samsung Galaxy S21 FE",
      description: "Lua cheia retratada do último andar da ESPM."
    },
    { 
      id: 6, 
      src: "/images/Cassandra_Guitarra.png",
      alt: "Cena do videoclipe Cassandra com uma jovem vestida de vermelho tocando guitarra elétrica vista de perto",
      title: "Guitarra do Videoclipe Cassandra",
      year: "2025",
      camera: "Canon EOS R6",
      description: "Cena da guitarra elétrica do videoclipe que filmei."
    },
    /*{ 
      id: 7, 
      src: "https://images.unsplash.com/photo-1555655139-6098ba690004?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29keSUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTk4NTAzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Moody Portrait",
      title: "Retrato Atmosférico",
      year: "2024",
      camera: "Sony A7R IV",
      description: "Retrato com iluminação suave e atmosfera intimista."
    },
    { 
      id: 8, 
      src: "https://images.unsplash.com/photo-1430414734948-17ebbe665afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU5OTg1MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Sunset Landscape",
      title: "Pôr do Sol",
      year: "2023",
      camera: "Fujifilm GFX 100S",
      description: "Cores vibrantes do céu durante o golden hour."
    },
    { 
      id: 9, 
      src: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydHxlbnwxfHx8fDE3NTk5NTczMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Abstract Art",
      title: "Arte Abstrata",
      year: "2024",
      camera: "iPhone 14 Pro",
      description: "Experimentação com cores e texturas abstratas."
    },*/
  ];

  const navigatePhoto = (newDirection: number) => {
    if (selectedPhotoIndex === null) return;
    
    setDirection(newDirection);
    const newIndex = selectedPhotoIndex + newDirection;
    
    if (newIndex >= 0 && newIndex < photoData.length) {
      setSelectedPhotoIndex(newIndex);
    } else if (newIndex < 0) {
      setSelectedPhotoIndex(photoData.length - 1);
    } else {
      setSelectedPhotoIndex(0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedPhotoIndex === null) return;
    
    if (e.key === 'ArrowLeft') {
      navigatePhoto(-1);
    } else if (e.key === 'ArrowRight') {
      navigatePhoto(1);
    } else if (e.key === 'Escape') {
      setSelectedPhotoIndex(null);
      setIsPhotoOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  // Sync isPhotoOpen with selectedPhotoIndex
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      setIsPhotoOpen(true);
    } else {
      setIsPhotoOpen(false);
    }
  }, [selectedPhotoIndex, setIsPhotoOpen]);

  // Close photo when isPhotoOpen becomes false
  useEffect(() => {
    if (!isPhotoOpen && selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(null);
    }
  }, [isPhotoOpen]);

  const selectedPhoto = selectedPhotoIndex !== null ? photoData[selectedPhotoIndex] : null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <>
      <div className="min-h-screen px-4 md:px-9 pt-24 md:pt-32">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="mb-4" style={{ color: '#000000' }}>galeria de fotos</h1>
          <h4 className="max-w-lg mx-auto" style={{ color: '#444444', fontWeight: 800 }}>
            Seleção de algumas fotografias minhas ao longo dos anos. Clique nas imagens para mais informações sobre cada uma.
          </h4>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-xs md:max-w-xl mx-auto">
          {photoData.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2, transition: { duration: 0.2 } }}
              className="aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <LazyImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Instagram Embed */}
        <div className="text-center mt-12 md:mt-16">
          <h3 className="mb-6" style={{ color: '#000000' }}>me siga no Instagram</h3>
          <div className="flex justify-center">
            <iframe
              src="https://www.instagram.com/lucasmarinho/embed"
              className="border rounded-lg shadow-lg w-[310px] h-[330px] md:w-[400px] md:h-[410px]"
              frameBorder="0"
              scrolling="no"
              style={{ overflow: 'hidden' }}
            />
          </div>
        </div>

      </motion.div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal */}
      <AnimatePresence mode="wait" custom={direction}>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            {/* Photo with Swipe Support - Expanded horizontal touch area */}
            <motion.div
              key={selectedPhotoIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                
                if (swipe < -10000) {
                  navigatePhoto(1);
                } else if (swipe > 10000) {
                  navigatePhoto(-1);
                }
              }}
              className="absolute inset-x-0 top-0 bottom-0 z-15 flex items-center justify-center px-4 md:px-8"
            >
              <ImageFallback
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[90vh] object-contain select-none"
              />
            </motion.div>

            {/* Left Navigation Area */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1/6 z-30 flex items-center justify-start pl-4 md:pl-8 group pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto(-1);
              }}
            >
              <ChevronLeft 
                className="w-10 h-10 md:w-12 md:h-12 opacity-0 md:group-hover:opacity-80 transition-opacity duration-300 hidden md:block" 
                style={{ color: '#ffffff' }} 
              />
            </div>

            {/* Right Navigation Area */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-1/6 z-30 flex items-center justify-end pr-4 md:pr-8 group pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto(1);
              }}
            >
              <ChevronRight 
                className="w-10 h-10 md:w-12 md:h-12 opacity-0 md:group-hover:opacity-80 transition-opacity duration-300 hidden md:block" 
                style={{ color: '#ffffff' }} 
              />
            </div>
            
            {/* Photo Info - Fixed position on bottom left of viewport */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="fixed bottom-12 left-6 md:bottom-12 md:left-10 text-left space-y-1 max-w-[calc(100%-3rem)] md:max-w-[400px] pointer-events-none z-30"
              style={{ 
                color: '#ffffff',
                textShadow: '0 2px 12px rgba(0, 0, 0, 1), 0 4px 24px rgba(0, 0, 0, 0.8)'
              }}
            >
              <h3 className="text-xl md:text-xl mb-1">
                {selectedPhoto.title}
              </h3>
              <p className="text-base md:text-base opacity-95">
                {selectedPhoto.year}
              </p>
              <p className="text-sm md:text-sm opacity-90">
                {selectedPhoto.camera}
              </p>
              <p className="text-sm md:text-sm opacity-95 mt-2 leading-snug">
                {selectedPhoto.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}