import React from 'react';
import './Dashboardheader.css';

export default function Dashboardheader() {
  return (
    <div className="dashboard-header-container">
      <h1 className="dashboard-header-title">
        Welcome back, Student <span className="wave-emoji">👋</span>
      </h1>
      <p className="dashboard-header-subtitle">
        Here's what's happening with your consultancy activities today.
      </p>
    </div>
  );
}
