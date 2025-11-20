import { useEffect } from 'react';

export function ConsoleKitty() {
  useEffect(() => {
    const kittyArt = `
                         ╱|、
                        (˚ˎ 。7    você achou o gatinho escondido
                         |、˜〵    que mantém meu site funcionando.
                         じしˍ,)ノ  @lucasmarinho no instagram e tiktok
    `;
    
    console.log('%c' + kittyArt, 'color: #828282; font-family: monospace;');
  }, []);

  return null;
}