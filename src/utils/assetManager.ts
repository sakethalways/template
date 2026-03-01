/**
 * Available images in /src/assets folder
 * Used as defaults and for dashboard selection
 */
export const AVAILABLE_ASSETS = {
  'hero-portrait.jpg': {
    name: 'Hero Portrait',
    path: '/src/assets/hero-portrait.jpg',
    category: 'hero',
  },
  'portfolio-1.jpg': {
    name: 'Portfolio 1 - Brand Campaign',
    path: '/src/assets/portfolio-1.jpg',
    category: 'work',
  },
  'portfolio-2.jpg': {
    name: 'Portfolio 2 - Behind The Scenes',
    path: '/src/assets/portfolio-2.jpg',
    category: 'work',
  },
  'portfolio-3.jpg': {
    name: 'Portfolio 3 - Viral Reels',
    path: '/src/assets/portfolio-3.jpg',
    category: 'work',
  },
  'portfolio-4.jpg': {
    name: 'Portfolio 4 - Product Launch',
    path: '/src/assets/portfolio-4.jpg',
    category: 'work',
  },
};

export const getAssetsByCategory = (category: string) => {
  return Object.entries(AVAILABLE_ASSETS)
    .filter(([_, asset]) => asset.category === category)
    .map(([key, asset]) => ({ key, ...asset }));
};

export const isBase64Image = (value: string): boolean => {
  return value.startsWith('data:image/');
};

export const isAssetImage = (value: string): boolean => {
  return value.startsWith('/src/assets/');
};

/**
 * Determine if an image is using an asset or custom upload
 */
export const getImageType = (value: string): 'asset' | 'uploaded' | 'none' => {
  if (!value) return 'none';
  if (isBase64Image(value)) return 'uploaded';
  if (isAssetImage(value)) return 'asset';
  return 'none';
};
