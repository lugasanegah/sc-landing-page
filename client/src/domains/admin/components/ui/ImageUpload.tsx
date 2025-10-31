import React, { useState, useRef } from 'react';
import { Button } from '@/domains/shared/components/ui/button';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  multiple?: boolean;
  onMultipleUpload?: (urls: string[]) => void;
}

export const ImageUpload = ({ 
  value, 
  onChange, 
  className = '', 
  multiple = false,
  onMultipleUpload 
}: ImageUploadProps): JSX.Element => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      if (multiple && files.length > 1) {
        // Multiple file upload
        const formData = new FormData();
        Array.from(files).forEach(file => {
          formData.append('images', file);
        });

        const response = await fetch('/api/admin/upload/images', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          const urls = result.data.map((file: any) => file.url);
          onMultipleUpload?.(urls);
        } else {
          alert('Failed to upload images: ' + result.message);
        }
      } else {
        // Single file upload
        const formData = new FormData();
        formData.append('image', files[0]);

        const response = await fetch('/api/admin/upload/image', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          const imageUrl = result.data.url;
          setPreviewUrl(imageUrl);
          onChange(imageUrl);
        } else {
          alert('Failed to upload image: ' + result.message);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image(s)');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setPreviewUrl(url);
    onChange(url);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl('');
    onChange('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={previewUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="button"
            variant="outline"
            onClick={triggerFileSelect}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full h-48 object-cover rounded-lg border"
            onError={() => {
              console.error('Failed to load image');
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-white hover:bg-gray-50"
          >
            Remove
          </Button>
        </div>
      )}

      {/* Upload Area */}
      {!previewUrl && (
        <div
          onClick={triggerFileSelect}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Click to upload
              </span>{' '}
              or drag and drop
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};