import React, { createContext, useContext, useState, useEffect } from 'react';
import contentData from '@/data/content.json';
import { ensureLocalStorageIsValid } from '@/utils/localStorageManager';

interface ContentContextType {
  content: typeof contentData;
  updateContent: (section: string, data: any) => void;
  resetContent: () => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState(contentData);
  const [isLoading, setIsLoading] = useState(false);

  // Load from localStorage on mount and merge with fresh data
  useEffect(() => {
    ensureLocalStorageIsValid(contentData);
    
    const savedContent = localStorage.getItem('website_content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        // Merge saved content with fresh content to handle new keys
        const merged = {
          ...contentData,
          ...parsed,
          global: { ...contentData.global, ...parsed.global },
          hero: { ...contentData.hero, ...parsed.hero },
          about: { ...contentData.about, ...parsed.about },
          services: { ...contentData.services, ...parsed.services },
          work: { ...contentData.work, ...parsed.work },
          contact: { ...contentData.contact, ...parsed.contact },
          navbar: { ...contentData.navbar, ...parsed.navbar },
          marquee: { ...contentData.marquee, ...parsed.marquee },
          textReveal: { ...contentData.textReveal, ...parsed.textReveal },
          testimonials: { ...contentData.testimonials, ...parsed.testimonials },
        };
        setContent(merged);
      } catch (error) {
        console.error('Failed to load saved content:', error);
        setContent(contentData); // Fallback to default
      }
    }
  }, []);

  const updateContent = (section: string, data: any) => {
    setIsLoading(true);
    try {
      const updated = {
        ...content,
        [section]: { ...content[section as keyof typeof content], ...data }
      };
      setContent(updated);
      // Save to localStorage
      localStorage.setItem('website_content', JSON.stringify(updated));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to update content:', error);
      setIsLoading(false);
    }
  };

  const resetContent = () => {
    setContent(contentData);
    localStorage.removeItem('website_content');
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
};
