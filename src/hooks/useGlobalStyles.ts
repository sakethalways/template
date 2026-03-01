import { useEffect } from 'react';
import { useContent } from '@/context/ContentContext';

export const useGlobalStyles = () => {
  const { content } = useContent();

  useEffect(() => {
    // Update CSS Variables
    const root = document.documentElement;
    
    // Colors
    root.style.setProperty('--primary', content.global.colors.primary);
    root.style.setProperty('--secondary', content.global.colors.secondary);
    root.style.setProperty('--background', content.global.colors.background);
    root.style.setProperty('--foreground', content.global.colors.foreground);
    
    // Fonts
    root.style.setProperty('--font-display', `'${content.global.fonts.display}', serif`);
    root.style.setProperty('--font-body', `'${content.global.fonts.body}', serif`);
    
    // Document title
    document.title = `${content.global.siteName} - Creative Portfolio`;
  }, [content.global]);

  return {
    colors: content.global.colors,
    fonts: content.global.fonts,
    animations: content.global.animations,
  };
};
