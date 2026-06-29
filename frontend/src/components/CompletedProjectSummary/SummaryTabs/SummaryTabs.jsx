import React from 'react';
import './SummaryTabs.css';

export default function SummaryTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'deliverables', label: 'Deliverables' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className="summary-tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`summary-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
