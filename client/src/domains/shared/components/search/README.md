# SearchAnything Component

A comprehensive search component for finding social media profiles and hashtags across Instagram, Twitter, and TikTok platforms.

## Features

- **Multi-platform Search**: Search across Instagram, Twitter, and TikTok
- **Dual Search Modes**: Switch between profile and hashtag search
- **Real-time Results**: Debounced API calls with loading states
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Error Handling**: Graceful error handling with fallbacks
- **Accessibility**: Keyboard navigation and ARIA support
- **Customizable**: Configurable placeholders, result limits, and styling

## Components

### SearchAnything
Main container component that manages state and orchestrates search functionality.

**Props:**
- `placeholder?: string` - Input placeholder text
- `maxResults?: number` - Maximum number of results to display (default: 50)
- `showTabs?: boolean` - Whether to show profile/hashtag tabs (default: true)
- `className?: string` - Additional CSS classes

### SearchInput
Reusable search input component with loading state.

**Props:**
- `value: string` - Input value
- `onChange: (value: string) => void` - Change handler
- `placeholder?: string` - Placeholder text
- `isLoading?: boolean` - Loading state
- `onFocus?: () => void` - Focus handler
- `onBlur?: () => void` - Blur handler
- `className?: string` - Additional CSS classes

### SearchResultItem
Individual search result display component.

**Props:**
- `item: SearchResultItem` - Search result data
- `isSelected?: boolean` - Selection state
- `onClick?: () => void` - Click handler
- `className?: string` - Additional CSS classes

### SearchDropdown
Dropdown container for search results with tabs.

**Props:**
- `isOpen: boolean` - Dropdown visibility
- `results: SearchResultItem[]` - Search results
- `isLoading: boolean` - Loading state
- `activeTab: 'profile' | 'hashtag'` - Active tab
- `onTabChange: (tab: 'profile' | 'hashtag') => void` - Tab change handler
- `onResultClick: (result: SearchResultItem) => void` - Result click handler
- `query: string` - Current search query
- `error?: string | null` - Error message
- `onMouseEnter?: () => void` - Mouse enter handler
- `onMouseLeave?: () => void` - Mouse leave handler

### SearchTabs
Tab component for switching between profile and hashtag search.

**Props:**
- `activeTab: 'profile' | 'hashtag'` - Active tab
- `onTabChange: (tab: 'profile' | 'hashtag') => void` - Tab change handler
- `className?: string` - Additional CSS classes

### ErrorBoundary
Error boundary component for graceful error handling.

**Props:**
- `children: ReactNode` - Child components
- `fallback?: ReactNode` - Custom fallback UI

## Usage

### Basic Usage
```tsx
import SearchAnything from '@/domains/shared/components/search/SearchAnything';

function MyComponent() {
  return (
    <SearchAnything
      placeholder="Search profiles or hashtags"
      maxResults={10}
    />
  );
}
```

### With Error Boundary
```tsx
import SearchAnything from '@/domains/shared/components/search/SearchAnything';
import ErrorBoundary from '@/domains/shared/components/search/ErrorBoundary';

function MyComponent() {
  return (
    <ErrorBoundary>
      <SearchAnything
        placeholder="Search profiles or hashtags"
        maxResults={10}
      />
    </ErrorBoundary>
  );
}
```

## API Integration

The component uses the `/check-data` endpoint from your backend API:

```
GET {API_BASE_URL}/check-data?key={query}
```

### Response Format
```typescript
interface SearchApiResponse {
  success: boolean;
  data: SearchServiceData[];
}
```

## Type Definitions

Key types are defined in `src/domains/shared/types/search.ts`:

- `SearchProfileData` - Profile-specific data
- `SearchHashtagData` - Hashtag-specific data
- `SearchResultItem` - Individual search result
- `SearchApiResponse` - API response format

## Styling

The component uses Tailwind CSS with the landing page's design system:
- `prelinecoblue-ribbon` - Primary brand color
- `prelinecowhite` - White color
- `prelinecomirage` - Text color
- Responsive breakpoints for mobile/desktop

## Error Handling

The component includes comprehensive error handling:
- Network error detection
- API error responses
- Image loading fallbacks
- Rate limiting handling
- Component-level error boundaries

## Browser Support

- Modern browsers with ES6+ support
- React 18+
- Next.js 13+ (Image component)

## Performance

- Debounced search (300ms delay)
- Result pagination support
- Image lazy loading
- Efficient re-rendering
- Memory cleanup