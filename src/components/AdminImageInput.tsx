import { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { AVAILABLE_ASSETS, getImageType, isBase64Image, getAssetsByCategory } from '@/utils/assetManager';
import { compressImage } from '@/utils/imageCompression';

interface AdminImageInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  category: 'hero' | 'work' | 'about';
  fieldIndex?: number;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}

export const AdminImageInput = ({
  value,
  onChange,
  label,
  category,
  fieldIndex,
  onUploadStart,
  onUploadEnd,
}: AdminImageInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const imageType = getImageType(value);
  const assets = getAssetsByCategory(category);

  const handleAssetSelect = (assetPath: string) => {
    // Clear old uploaded image if exists
    onChange(assetPath);
  };

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    onUploadStart?.();

    try {
      console.log('[AdminImageInput] Uploading image:', file.name, file.size, 'bytes');
      
      // Convert to high-quality base64 without compression
      let processedImage = await compressImage(file, 10000, 0.95);
      console.log('[AdminImageInput] Image compressed, size:', processedImage.length);
      
      console.log('[AdminImageInput] Final image size:', processedImage.length);
      onChange(processedImage);
    } catch (error) {
      console.error('[AdminImageInput] Error:', error);
      alert('Failed to process image: ' + error);
    } finally {
      setIsLoading(false);
      onUploadEnd?.();
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="border border-border rounded-md p-4 space-y-3">
      <label className="block text-sm font-semibold">{label}</label>

      {/* Current Image Preview */}
      {value && (
        <div className="relative w-full h-40 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={() => console.error('Image failed to load:', value)}
          />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* No Image State */}
      {!value && (
        <div className="w-full h-40 rounded-md border-2 border-dashed border-border flex items-center justify-center bg-gray-50">
          <div className="text-center text-muted-foreground">
            <ImageIcon size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No image selected</p>
          </div>
        </div>
      )}

      {/* Asset Selection */}
      {assets.length > 0 && (
        <div>
          <label className="block text-xs font-semibold mb-2 text-muted-foreground">
            Or use existing asset
          </label>
          <select
            value={imageType === 'asset' ? value : ''}
            onChange={(e) => {
              if (e.target.value) {
                handleAssetSelect(e.target.value);
              }
            }}
            className="w-full px-3 py-2 border border-border rounded-md text-sm"
          >
            <option value="">-- Select Asset --</option>
            {assets.map((asset) => (
              <option key={asset.key} value={asset.path}>
                {asset.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Upload New Image */}
      <div>
        <label className="block text-xs font-semibold mb-2 text-muted-foreground">
          Or upload new image
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0]);
              }
            }}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-border rounded-md text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-md">
              <div className="text-xs font-semibold text-primary">Compressing...</div>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {isLoading ? 'Compressing...' : 'Image will be compressed automatically'}
        </p>
      </div>

      {/* Clear Button */}
      {value && (
        <button
          onClick={handleClear}
          className="w-full px-3 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition-colors"
        >
          Remove Image
        </button>
      )}

      {/* Image Type Indicator */}
      {value && (
        <div className="text-xs text-muted-foreground">
          {imageType === 'asset' && <span className="text-blue-600">📦 Using asset image</span>}
          {imageType === 'uploaded' && <span className="text-green-600">📤 Using uploaded image</span>}
        </div>
      )}
    </div>
  );
};

export default AdminImageInput;
