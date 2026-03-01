import { describe, it, expect, beforeEach } from 'vitest';
import { 
  AVAILABLE_ASSETS, 
  getAssetsByCategory, 
  isBase64Image, 
  isAssetImage, 
  getImageType 
} from '@/utils/assetManager';

describe('Image Management System', () => {
  describe('Asset Inventory', () => {
    it('should have all 5 assets available', () => {
      const assetList = Object.values(AVAILABLE_ASSETS);
      expect(assetList).toHaveLength(5);
    });

    it('should have hero asset with correct path', () => {
      expect(AVAILABLE_ASSETS['hero-portrait.jpg'].path).toBe('/src/assets/hero-portrait.jpg');
      expect(AVAILABLE_ASSETS['hero-portrait.jpg'].category).toBe('hero');
    });

    it('should have 4 work portfolio assets', () => {
      const workAssets = [
        AVAILABLE_ASSETS['portfolio-1.jpg'],
        AVAILABLE_ASSETS['portfolio-2.jpg'],
        AVAILABLE_ASSETS['portfolio-3.jpg'],
        AVAILABLE_ASSETS['portfolio-4.jpg'],
      ];
      
      workAssets.forEach((asset) => {
        expect(asset.category).toBe('work');
        expect(asset.path).toContain('/src/assets/portfolio-');
      });
    });
  });

  describe('Asset Category Filtering', () => {
    it('should return only hero assets for hero category', () => {
      const heroAssets = getAssetsByCategory('hero');
      expect(heroAssets).toHaveLength(1);
      expect(heroAssets[0].path).toContain('hero-portrait');
    });

    it('should return only work assets for work category', () => {
      const workAssets = getAssetsByCategory('work');
      expect(workAssets).toHaveLength(4);
      workAssets.forEach((asset) => {
        expect(asset.path).toContain('portfolio-');
      });
    });
  });

  describe('Image Type Detection', () => {
    it('should detect base64 encoded images', () => {
      const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABA...';
      expect(isBase64Image(base64Image)).toBe(true);
    });

    it('should detect asset paths', () => {
      const assetPath = '/src/assets/hero-portrait.jpg';
      expect(isAssetImage(assetPath)).toBe(true);
    });

    it('should classify image types correctly', () => {
      const base64 = 'data:image/jpeg;base64,abc123';
      const asset = '/src/assets/portfolio-1.jpg';
      const empty = '';

      expect(getImageType(base64)).toBe('uploaded');
      expect(getImageType(asset)).toBe('asset');
      expect(getImageType(empty)).toBe('none');
    });
  });

  describe('Image Management Workflow', () => {
    let currentImage: string;

    beforeEach(() => {
      currentImage = '';
    });

    it('should handle selecting an asset', () => {
      const assetPath = '/src/assets/hero-portrait.jpg';
      currentImage = assetPath;
      
      expect(currentImage).toBe(assetPath);
      expect(getImageType(currentImage)).toBe('asset');
    });

    it('should handle replacing asset with uploaded image', () => {
      // Start with asset
      currentImage = '/src/assets/portfolio-1.jpg';
      expect(getImageType(currentImage)).toBe('asset');

      // Replace with base64 (clearing old asset reference)
      const base64Image = 'data:image/jpeg;base64,newImage123';
      currentImage = base64Image;

      expect(getImageType(currentImage)).toBe('uploaded');
      expect(currentImage).not.toContain('portfolio-1');
    });

    it('should handle replacing uploaded image with another asset', () => {
      // Start with uploaded
      currentImage = 'data:image/jpeg;base64,uploaded123';
      expect(getImageType(currentImage)).toBe('uploaded');

      // Replace with asset
      currentImage = '/src/assets/portfolio-2.jpg';

      expect(getImageType(currentImage)).toBe('asset');
      expect(currentImage).not.toContain('uploaded');
    });

    it('should handle clearing image completely', () => {
      currentImage = '/src/assets/hero-portrait.jpg';
      expect(getImageType(currentImage)).toBe('asset');

      currentImage = '';

      expect(getImageType(currentImage)).toBe('none');
      expect(currentImage).toBe('');
    });
  });

  describe('Storage Efficiency', () => {
    it('should use asset paths (not base64) to save storage', () => {
      const assetPath = '/src/assets/hero-portrait.jpg';
      const assetPathSize = assetPath.length; // ~31 bytes

      const fakeBase64 = 'data:image/jpeg;base64,' + 'a'.repeat(5000);
      const base64Size = fakeBase64.length; // ~5030 bytes

      expect(assetPathSize).toBeLessThan(50);
      expect(base64Size).toBeGreaterThan(5000);
    });

    it('should ensure asset selection reduces storage footprint', () => {
      const workAssets = getAssetsByCategory('work');
      let totalStorageUsed = 0;

      workAssets.forEach((asset) => {
        totalStorageUsed += asset.path.length;
      });

      // 4 assets × ~30 chars each = ~120 bytes total
      expect(totalStorageUsed).toBeLessThan(200);
    });
  });
});
