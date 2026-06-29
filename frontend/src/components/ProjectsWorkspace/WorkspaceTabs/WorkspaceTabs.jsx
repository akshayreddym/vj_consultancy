import React from 'react';
import './WorkspaceTabs.css';

export default function WorkspaceTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'uploads', label: 'Uploads' },
    { id: 'progress', label: 'Progress' },
    { id: 'team', label: 'Team & Info' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <div className="workspace-tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`workspace-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
