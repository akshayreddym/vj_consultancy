import React from 'react';
import './ProjectsTabs.css';

export default function ProjectsTabs({ activeTab, setActiveTab, counts }) {
  const tabs = [
    { id: 'All', label: 'All Projects', count: counts.all },
    { id: 'In Progress', label: 'In Progress', count: counts.inProgress },
    { id: 'Completed', label: 'Completed', count: counts.completed },
    { id: 'On Hold', label: 'On Hold', count: counts.onHold },
  ];

  return (
    <div className="projects-tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`projects-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          type="button"
        >
          <span className="tab-label">{tab.label}</span>
          <span className={`tab-count ${activeTab === tab.id ? 'active-count' : ''}`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
