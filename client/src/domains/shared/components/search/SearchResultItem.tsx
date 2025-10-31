import React, { useState, useCallback } from 'react';
import { SearchResultItem as SearchResultItemType, SearchProfileData, SearchHashtagData } from '../../types/search';
import {
  getPlatformIconUrl,
  createImageErrorHandler,
  getPlatformIconComponent,
  getFallbackImageUrl,
  getPlatformSpecificAssets,
  createImageLoader
} from '../../lib/imageUtils';

interface SearchResultItemProps {
  item: SearchResultItemType;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

// Utility function to format numbers
function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  item,
  isSelected = false,
  onClick,
  className = ""
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isProfile = item.service === 'profile';
  const profileData = item.data as SearchProfileData;
  const hashtagData = item.data as SearchHashtagData;

  // Get platform-specific assets
  const platformAssets = getPlatformSpecificAssets(item.platform);

  // Image error handlers
  const handleProfileImageError = createImageErrorHandler('profile');
  const handlePlatformIconError = createImageErrorHandler('logo');

  // Image loader handlers
  const imageLoader = createImageLoader(
    () => setImageLoaded(true),
    () => setImageError(true)
  );

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <div
      className={`
        box-border content-stretch flex gap-3 items-center justify-start px-4 py-3
        relative rounded-lg shrink-0 w-full cursor-pointer transition-colors
        hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}
        ${className}
      `}
      onClick={handleClick}
    >
      {isProfile ? (
        <>
          {/* Profile Picture */}
          <div className="content-stretch flex items-start justify-start relative shrink-0">
            <div className={`${platformAssets.avatarColor} content-stretch flex items-center justify-center relative rounded-lg shrink-0 size-[38px]`}>
              <div className="overflow-clip relative rounded-lg shrink-0 size-[38px]">
                {!imageError && profileData.profilePict ? (
                  <img
                    src={profileData.profilePict}
                    alt={`${profileData.username} avatar`}
                    className={`w-[38px] h-[38px] object-cover rounded-lg transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onError={handleProfileImageError}
                    onLoad={imageLoader.onLoad}
                    onErrorCapture={(e) => {
                      handleProfileImageError(e);
                      imageLoader.onError(e);
                    }}
                  />
                ) : null}
                {/* Fallback: Initial or default avatar */}
                {imageError || !profileData.profilePict ? (
                  <div className="absolute inset-0 flex items-center justify-center w-[38px] h-[38px] rounded-lg bg-gray-200">
                    <span className="text-sm font-semibold text-gray-600">
                      {profileData.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : null}
                {/* Loading state */}
                {!imageLoaded && !imageError && profileData.profilePict && (
                  <div className="absolute inset-0 flex items-center justify-center w-[38px] h-[38px] rounded-lg bg-gray-100">
                    <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Platform Icon Badge */}
          <div className="absolute content-stretch flex items-start justify-start left-2.5 top-2">
            <div className="content-stretch flex items-center justify-center relative rounded-full shrink-0 size-4">
              <div className="border-[1.6px] border-solid border-white absolute inset-[-1.6px] pointer-events-none rounded-full bg-white" />
              <div className="overflow-clip relative rounded-full shrink-0">
                {/* Try to load image icon first */}
                <img
                  src={getPlatformIconUrl(item.platform)}
                  alt={`${item.platform} icon`}
                  className="w-[16px] h-[16px] object-cover rounded-full"
                  onError={handlePlatformIconError}
                  style={{ display: imageError ? 'none' : 'block' }}
                />
                {/* Fallback to React Icon if image fails to load */}
                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center w-[16px] h-[16px]">
                    {getPlatformIconComponent(item.platform, 'w-[12px] h-[12px]')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="content-stretch flex flex-col gap-1 items-start justify-center relative shrink-0 flex-1">
            <div className="content-stretch flex gap-2.5 items-center justify-start relative shrink-0">
              <div className="font-semibold leading-5 not-italic relative shrink-0 text-sm text-gray-800 text-nowrap tracking-[0.07px]">
                {profileData.username}
              </div>
            </div>
            <div className="content-stretch flex font-normal gap-1 items-center justify-start leading-4 not-italic relative shrink-0 text-xs text-gray-500 text-nowrap tracking-[0.06px]">
              <div className="relative shrink-0">
                @{profileData.username}
              </div>
              {profileData.totalFollower !== undefined && (
                <>
                  <div className="relative shrink-0">
                    <span className="text-gray-400">•</span>
                  </div>
                  <div className="relative shrink-0">
                    {formatNumber(profileData.totalFollower)} Followers
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Hashtag Icon */}
          <div className="content-stretch flex items-start justify-start relative shrink-0">
            <div className={`${platformAssets.avatarColor} content-stretch flex items-center justify-center relative rounded-lg shrink-0 size-[38px]`}>
              <span className={`text-lg font-semibold ${platformAssets.brandColor}`}>#</span>
            </div>
          </div>

          {/* Platform Icon Badge */}
          <div className="absolute content-stretch flex items-start justify-start left-2.5 top-2">
            <div className="content-stretch flex items-center justify-center relative rounded-full shrink-0 size-4">
              <div className="border-[1.6px] border-solid border-white absolute inset-[-1.6px] pointer-events-none rounded-full bg-white" />
              <div className="overflow-clip relative rounded-full shrink-0">
                {/* Try to load image icon first */}
                <img
                  src={getPlatformIconUrl(item.platform)}
                  alt={`${item.platform} icon`}
                  className="w-[16px] h-[16px] object-cover rounded-full"
                  onError={handlePlatformIconError}
                  style={{ display: imageError ? 'none' : 'block' }}
                />
                {/* Fallback to React Icon if image fails to load */}
                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center w-[16px] h-[16px]">
                    {getPlatformIconComponent(item.platform, 'w-[12px] h-[12px]')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hashtag Info */}
          <div className="content-stretch flex flex-col gap-1 items-start justify-center relative shrink-0 flex-1">
            <div className="content-stretch flex gap-2.5 items-center justify-start relative shrink-0">
              <div className="font-semibold leading-5 not-italic relative shrink-0 text-sm text-gray-800 text-nowrap tracking-[0.07px]">
                #{hashtagData.hashtag}
              </div>
            </div>
            <div className="content-stretch flex font-normal gap-1 items-center justify-start leading-4 not-italic relative shrink-0 text-xs text-gray-500 text-nowrap tracking-[0.06px]">
              {hashtagData.totalPost !== undefined && (
                <>
                  <div className="relative shrink-0">
                    {formatNumber(hashtagData.totalPost)} Posts
                  </div>
                  <div className="relative shrink-0">
                    <span className="text-gray-400">•</span>
                  </div>
                </>
              )}
              <div className="relative shrink-0 capitalize">
                {item.platform}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResultItem;