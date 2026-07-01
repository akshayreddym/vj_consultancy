import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search-bar-container">
      <Search className="search-bar-icon" />
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="search-bar-clear"
          onClick={() => onChange('')}
          type="button"
          aria-label="Clear search"
        >
          <X className="search-clear-icon" />
        </button>
      )}
    </div>
  );
}
