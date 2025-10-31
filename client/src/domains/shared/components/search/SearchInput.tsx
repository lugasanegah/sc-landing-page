import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export interface SearchInputRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  getInput: () => HTMLInputElement | null;
}

const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(({
  value,
  onChange,
  placeholder = "Enter Instagram Profile or Hashtag",
  isLoading = false,
  onFocus,
  onBlur,
  className = ""
}, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Expose input methods to parent component
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    select: () => inputRef.current?.select(),
    getInput: () => inputRef.current
  }));

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <FaMagnifyingGlass
          aria-hidden
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={isLoading}
          className={`
            w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-prelinecoblue-ribbon
            disabled:opacity-50 disabled:cursor-not-allowed
            placeholder-gray-400 text-gray-900
            transition-colors duration-200
            ${isLoading ? 'pr-10' : ''}
          `}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-prelinecoblue-ribbon rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
