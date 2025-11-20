import { motion } from 'motion/react';
import { useState } from 'react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
}

export function NotFoundPage({ onNavigateHome }: NotFoundPageProps) {
  // GIFs de erro do Giphy - substitua com os que você preferir
  const errorGifs = [
    'https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif', // 404 error
    'https://media.giphy.com/media/VwoJkTfZAUBSU/giphy.gif', // confused
    'https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif', // lost
    'https://media.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif', // error
  ];

  // Escolhe um GIF aleatório quando a página carrega
  const [randomGif] = useState(() => errorGifs[Math.floor(Math.random() * errorGifs.length)]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Background GIF com overlay escuro */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={randomGif}
            alt="Error animation"
            className="w-full h-full object-cover"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            draggable={false}
          />
        </motion.div>
        
        {/* Overlay escuro */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl mb-3"
          style={{ color: '#ffffff' }}
        >
          errou o caminho!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl mb-8"
          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
        >
          a página que você procura não existe
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={onNavigateHome}
          className="inline-block px-12 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ 
            backgroundColor: '#ffffff', 
            color: '#000000',
            transformOrigin: 'center center'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          <span style={{ display: 'block', lineHeight: '1.5rem' }}>voltar para home</span>
        </motion.button>
      </div>
    </div>
  );
}
