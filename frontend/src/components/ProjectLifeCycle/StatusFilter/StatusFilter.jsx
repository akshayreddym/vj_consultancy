import React from 'react';
import './StatusFilter.css';

export default function StatusFilter({ activeFilter, onFilterChange, counts = {} }) {
  const filters = [
    { key: 'All', label: 'All Projects' },
    { key: 'On Track', label: 'On Track' },
    { key: 'Completed', label: 'Completed' },
    { key: 'At Risk', label: 'At Risk' },
    { key: 'Delayed', label: 'Delayed' }
  ];

  return (
    <div className="lifecycle-pills-row">
      {filters.map((filter) => {
        const count = counts[filter.key] ?? 0;
        return (
          <button
            key={filter.key}
            className={`lifecycle-pill-btn pill-${filter.key.toLowerCase().replace(/\s+/g, '-')}-btn ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <span className="pill-label-text">{filter.label}</span>
            <span className="pill-badge-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
