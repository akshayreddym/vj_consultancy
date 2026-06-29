import React from 'react';
import './OverviewSection.css';

export default function OverviewSection({ project }) {
  const { overview, completedDate, duration } = project;

  return (
    <div className="overview-section-container">
      {/* Project Description */}
      <div className="overview-block">
        <h3 className="overview-section-title">Project Description</h3>
        <p className="overview-description-text">{overview.description}</p>
      </div>

      {/* Final Outcome */}
      <div className="overview-block">
        <h3 className="overview-section-title">Final Outcome</h3>
        <p className="overview-outcome-text">{overview.outcome}</p>
      </div>

      {/* Meta attributes card grid */}
      <div className="overview-meta-card">
        <h3 className="overview-section-title">Project Specifications</h3>
        <div className="meta-card-grid">
          <div className="meta-grid-item">
            <span className="meta-grid-label">Current Status</span>
            <span className="status-badge-archive">Completed</span>
          </div>
          <div className="meta-grid-item">
            <span className="meta-grid-label">Completion Date</span>
            <span className="meta-grid-val">{completedDate}</span>
          </div>
          <div className="meta-grid-item">
            <span className="meta-grid-label">Project Duration</span>
            <span className="meta-grid-val">{duration}</span>
          </div>
          <div className="meta-grid-item">
            <span className="meta-grid-label">Final Evaluation Score</span>
            <span className="meta-grid-val highlight-score">{overview.finalScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
