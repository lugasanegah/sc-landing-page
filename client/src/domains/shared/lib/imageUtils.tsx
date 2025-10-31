// Image utility functions for handling fallbacks and loading states
import React from 'react';
import { FaInstagram, FaXTwitter, FaTiktok } from 'react-icons/fa6';

// Fallback image URLs with multiple fallback levels
export const getFallbackImageUrl = (type: 'profile' | 'logo' | 'avatar' | 'notfound' = 'logo'): string => {
  switch (type) {
    case 'profile':
      return '/Avatar.png';
    case 'avatar':
      return '/Avatar.png';
    case 'notfound':
      return '/ImageNotFound.jpeg';
    case 'logo':
    default:
      return '/figmaAssets/logo.svg';
  }
};

// Platform icon URLs with enhanced mapping
export const getPlatformIconUrl = (platform: string): string => {
  const iconMap: Record<string, string> = {
    'instagram': '/platforms/instagram.png',
    'twitter': '/platforms/twitter.png',
    'tiktok': '/platforms/tiktok.png',
    'x': '/platforms/twitter.png', // Alias for Twitter
    'x-profile': '/platforms/twitter.png'
  };

  return iconMap[platform.toLowerCase()] || getFallbackImageUrl('logo');
};

// React Icons fallback for platforms
export const getPlatformIconComponent = (platform: string, className = ''): React.ReactNode => {
  const platformLower = platform.toLowerCase();

  switch (platformLower) {
    case 'instagram':
    case 'instagram-profile':
      return <FaInstagram className={`text-pink-500 ${className}`} />;
    case 'twitter':
    case 'x':
    case 'x-profile':
    case 'twitter-profile':
      return <FaXTwitter className={`text-black ${className}`} />;
    case 'tiktok':
    case 'tiktok-profile':
      return <FaTiktok className={`text-gray-800 ${className}`} />;
    default:
      return null;
  }
};

// Enhanced image error handling with multiple fallback levels
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackType: 'profile' | 'logo' | 'avatar' | 'notfound' = 'logo'
): void => {
  const target = event.target as HTMLImageElement;

  // Multiple fallback strategy
  if (!target.src.includes(getFallbackImageUrl(fallbackType))) {
    target.src = getFallbackImageUrl(fallbackType);
  } else if (fallbackType !== 'logo') {
    // Final fallback to logo
    target.src = getFallbackImageUrl('logo');
  }

  target.onerror = null; // Prevent infinite loop
};

// Create image error handler with customizable fallback chain
export const createImageErrorHandler = (fallbackType: 'profile' | 'logo' | 'avatar' | 'notfound' = 'logo') => {
  return (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    handleImageError(event, fallbackType);
  };
};

// Generate avatar with background color (useful for missing profile images)
export const generateAvatarData = (name: string) => {
  const firstChar = name.charAt(0).toUpperCase();
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
  ];
  const colorIndex = firstChar.charCodeAt(0) % colors.length;

  return {
    char: firstChar,
    bgColor: colors[colorIndex],
    textColor: 'text-white'
  };
};

// Image loading state utilities
export const createImageLoader = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return {
    onLoad: (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = event.target as HTMLImageElement;
      target.classList.add('loaded');
      target.classList.remove('loading');
      onSuccess?.();
    },
    onError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = event.target as HTMLImageElement;
      target.classList.add('error');
      target.classList.remove('loading');
      onError?.();
    }
  };
};

// Utility to check if image exists (for preloading)
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};

// Get image dimensions
export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = src;
  });
};

// Platform-specific image utilities
export const getPlatformSpecificAssets = (platform: string) => {
  const platformLower = platform.toLowerCase();

  return {
    iconUrl: getPlatformIconUrl(platformLower),
    iconComponent: getPlatformIconComponent(platformLower),
    avatarColor: platformLower.includes('instagram') ? 'bg-pink-100' :
                   platformLower.includes('twitter') ? 'bg-blue-100' :
                   platformLower.includes('tiktok') ? 'bg-gray-100' : 'bg-gray-100',
    brandColor: platformLower.includes('instagram') ? 'text-pink-500' :
                platformLower.includes('twitter') ? 'text-blue-500' :
                platformLower.includes('tiktok') ? 'text-gray-800' : 'text-gray-800'
  };
};