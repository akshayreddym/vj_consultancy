import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ value, onChange, placeholder = "Search projects..." }) {
  return (
    <div className="lifecycle-search-container">
      <Search className="lifecycle-search-icon" />
      <input
        type="text"
        className="lifecycle-search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="lifecycle-search-clear"
          onClick={() => onChange('')}
          type="button"
          aria-label="Clear search"
        >
          <X className="lifecycle-clear-icon" />
        </button>
      )}
    </div>
  );
}
