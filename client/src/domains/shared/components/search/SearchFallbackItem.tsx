import React from 'react';

interface SearchFallbackItemProps {
  platform: 'instagram' | 'twitter' | 'tiktok';
  query: string;
  activeTab: 'profile' | 'hashtag';
  onClick?: () => void;
  disabled?: boolean;
}

function getPlatformIcon(platform: string): string {
  switch (platform) {
    case 'instagram':
      return '/platforms/instagram.png';
    case 'twitter':
      return '/platforms/twitter.png';
    case 'tiktok':
      return '/platforms/tiktok.png';
    default:
      return '/social-crab-logo.svg';
  }
}

function getPlatformName(platform: string): string {
  switch (platform) {
    case 'instagram':
      return 'Instagram';
    case 'twitter':
      return 'Twitter';
    case 'tiktok':
      return 'TikTok';
    default:
      return platform;
  }
}

const SearchFallbackItem: React.FC<SearchFallbackItemProps> = ({
  platform,
  query,
  activeTab,
  onClick,
  disabled = false
}) => {
  const platformName = getPlatformName(platform);
  const isHashtag = activeTab === 'hashtag';

  return (
    <div
      className={`box-border content-stretch flex gap-3 items-center justify-between px-4 py-3 relative rounded-lg shrink-0 w-full transition-colors ${disabled
        ? 'bg-gray-50 opacity-50 cursor-not-allowed'
        : 'bg-blue-50 hover:bg-blue-100 cursor-pointer'
        }`}
      onClick={disabled ? undefined : onClick}
      role={disabled ? undefined : 'button'}
      aria-disabled={disabled || undefined}
    >
      <div className="flex gap-3 items-center">
        <div className="content-stretch flex items-start justify-start relative shrink-0">
          <div className="content-stretch flex items-center justify-center relative rounded-lg shrink-0 size-[38px]">
            <div className="overflow-clip relative rounded-lg shrink-0">
              <img
                src={getPlatformIcon(platform)}
                alt={`${platformName} icon`}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="content-stretch flex flex-col gap-1 items-start justify-center relative shrink-0">
          <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0">
            <div className="font-semibold leading-5 not-italic relative shrink-0 text-sm text-gray-800 tracking-[0.07px]">
              {isHashtag ? `#${query}` : `@${query}`}
            </div>
            <div className="bg-blue-600 px-2 py-0.5 rounded-full">
              <span className="text-xs font-medium text-white">Start Analysis</span>
            </div>
          </div>
          <div className="content-stretch flex font-normal gap-1 items-center justify-start leading-4 not-italic relative shrink-0 text-xs text-gray-500 tracking-[0.06px]">
            <div className="relative shrink-0">
              Search on {platformName}
            </div>
          </div>
        </div>
      </div>

      {disabled && (
        <div className="flex items-center gap-1">
          <div className="bg-gray-400 px-2 py-1 rounded">
            <span className="text-xs font-medium text-white">Coming Soon</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFallbackItem;

