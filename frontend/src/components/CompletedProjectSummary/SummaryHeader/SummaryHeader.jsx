import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import './SummaryHeader.css';

export default function SummaryHeader({ project }) {
  const navigate = useNavigate();
  const { name, domain, client, completedDate, duration, teamSize, progress, iconName } = project;

  // Resolve Lucide Icon
  const ProjectIcon = Icons[iconName] || Icons.Folder;

  return (
    <div className="summary-header-container">
      {/* Back button link */}
      <button
        className="summary-back-btn"
        onClick={() => navigate('/projects')}
        type="button"
      >
        <Icons.ArrowLeft size={16} />
        <span>Back to My Projects</span>
      </button>

      {/* Main header title row */}
      <div className="summary-title-row">
        <div className="title-text-group">
          <div className="title-with-badge">
            <h1 className="summary-page-title">Project Archive</h1>
            <span className="summary-archive-badge">Completed</span>
          </div>
          <p className="summary-page-subtitle">
            This project has been successfully completed and archived.
          </p>
        </div>
      </div>

      {/* Project Header Card */}
      <div className="project-header-card">
        <div className="header-card-top">
          <div className="header-card-project-info">
            <div className="header-card-icon-box">
              <ProjectIcon size={24} />
            </div>
            <div className="header-card-title-details">
              <div className="header-card-name-row">
                <h2 className="header-card-name">{name}</h2>
                <span className="domain-pill">{domain}</span>
              </div>
              <div className="header-card-metadata">
                <span className="meta-item">
                  <strong>Client:</strong> {client}
                </span>
                <span className="meta-bullet">•</span>
                <span className="meta-item">
                  <strong>Completed:</strong> {completedDate}
                </span>
                <span className="meta-bullet">•</span>
                <span className="meta-item">
                  <strong>Duration:</strong> {duration}
                </span>
                <span className="meta-bullet">•</span>
                <span className="meta-item">
                  <strong>Team Size:</strong> {teamSize}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress block */}
        <div className="header-card-progress-section">
          <div className="progress-text-row-summary">
            <span className="progress-label-summary">Overall Progress</span>
            <span className="progress-val-summary">{progress}%</span>
          </div>
          <div className="progress-track-summary">
            <div
              className="progress-fill-summary"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
