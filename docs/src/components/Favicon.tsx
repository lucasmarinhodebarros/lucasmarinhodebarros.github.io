import { useEffect } from 'react';

export function Favicon() {
  useEffect(() => {
    // Remove existing favicons
    const existingFavicons = document.querySelectorAll("link[rel*='icon']");
    existingFavicons.forEach(favicon => favicon.remove());

    // Path to your favicon image
    // Coloque sua foto em: /public/images/favicon.jpg ou favicon.png
    const faviconUrl = '/images/lucas-marinho.jpg';

    // Add new favicon (16x16 and 32x32)
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/jpeg'; // ou 'image/png' se for PNG
    link.href = faviconUrl;
    document.head.appendChild(link);

    // Apple Touch Icon (180x180 para iOS)
    const appleTouchIcon = document.createElement('link');
    appleTouchIcon.rel = 'apple-touch-icon';
    appleTouchIcon.href = faviconUrl;
    document.head.appendChild(appleTouchIcon);

    // Shortcut icon (opcional)
    const shortcutIcon = document.createElement('link');
    shortcutIcon.rel = 'shortcut icon';
    shortcutIcon.href = faviconUrl;
    document.head.appendChild(shortcutIcon);

  }, []);

  return null;
}

