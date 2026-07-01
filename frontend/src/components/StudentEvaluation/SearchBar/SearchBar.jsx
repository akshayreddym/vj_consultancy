import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="eval-search-container">
      <Search className="eval-search-icon" />
      <input
        type="text"
        className="eval-search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="eval-search-clear"
          onClick={() => onChange('')}
          type="button"
          aria-label="Clear search"
        >
          <X className="eval-clear-icon" />
        </button>
      )}
    </div>
  );
}
