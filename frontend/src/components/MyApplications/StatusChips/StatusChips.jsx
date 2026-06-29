import React from 'react';
import './StatusChips.css';

export default function StatusChips({ activeFilter, setActiveFilter }) {
  const chips = [
    'All',
    'Applied',
    'Under Review',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
  ];

  return (
    <div className="status-chips-container">
      {chips.map((chip, index) => (
        <button
          key={index}
          className={`status-chip-btn ${activeFilter === chip ? 'active' : ''}`}
          onClick={() => setActiveFilter(chip)}
          type="button"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
