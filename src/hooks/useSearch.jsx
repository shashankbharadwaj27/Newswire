import { useState, useEffect } from "react";

/**
 * Manages search input with debouncing.
 * Returns the raw input value (for controlled input)
 * and the debounced query (for API calls).
 *
 * @param {number} delay - debounce delay in ms (default 500)
 *
 * @example
 * const { inputValue, searchQuery, setInputValue, clearSearch } = useSearch();
 */
export function useSearch(delay = 500) {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue.trim());
    }, delay);

    return () => clearTimeout(timer);
  }, [inputValue, delay]);

  const clearSearch = () => {
    setInputValue("");
    setSearchQuery("");
  };

  return {
    inputValue,
    searchQuery,
    setInputValue,
    clearSearch,
  };
}