import React from 'react';
import './DashboardHeader.css';

export default function DashboardHeader({ title, subtitle }) {
  return (
    <div className="coordinator-header-section">
      <h1 className="coordinator-title">{title}</h1>
      <p className="coordinator-subtitle">{subtitle}</p>
    </div>
  );
}
