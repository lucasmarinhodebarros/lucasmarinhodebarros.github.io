import { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  onDragStart?: (e: React.DragEvent) => void;
}

export function LazyImage({ src, alt, className = '', style, onClick, onContextMenu, onDragStart }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Create thumbnail version (tiny blur placeholder)
    const thumbnailSrc = `${src}&w=20&blur=10`;
    setImageSrc(thumbnailSrc);

    // Load full resolution image
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={style}
      onClick={onClick}
    >
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-700 ease-out"
        style={{
          filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
          transform: isLoaded ? 'scale(1)' : 'scale(1.1)',
          ...style
        }}
        onContextMenu={onContextMenu}
        onDragStart={onDragStart}
        loading="lazy"
      />
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ mixBlendMode: 'overlay' }}
        />
      )}
    </div>
  );
}
