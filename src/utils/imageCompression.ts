/**
 * Utility to compress images before storing in localStorage
 * Reduces file size to fit within storage limits
 */
export const compressImage = async (file: File, maxWidth = 400, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Scale down if too large
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG with quality setting
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        
        // Warn if still too large
        if (compressedBase64.length > 500000) {
          console.warn(`Compressed image is ${(compressedBase64.length / 1024).toFixed(2)}KB - may impact performance`);
        }
        
        resolve(compressedBase64);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Check if localStorage quota has been exceeded
 */
export const checkStorageQuota = (data: string): { safe: boolean; size: string } => {
  const size = new Blob([data]).size;
  const sizeKB = (size / 1024).toFixed(2);
  const sizeWarning = size > 1000000; // Over 1MB

  return {
    safe: !sizeWarning,
    size: `${sizeKB}KB`,
  };
};
