import React from 'react';
import { Search } from 'lucide-react';
import './ProjectsSearchBar.css';

export default function ProjectsSearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="projects-search-wrapper">
      <Search className="search-icon" size={18} />
      <input
        type="text"
        className="projects-search-input"
        placeholder="Search projects by project name, domain or client..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search projects by name, domain or client"
      />
    </div>
  );
}
