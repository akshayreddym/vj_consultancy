import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Smartphone, Folder } from 'lucide-react';
import './WorkspaceHeader.css';

export default function WorkspaceHeader({ project }) {
  const navigate = useNavigate();
  const { name, description, client, domain, deadline, status, progress, iconName } = project;

  const getIcon = () => {
    switch (iconName) {
      case 'Code':
        return <Code size={24} className="header-project-icon" />;
      case 'Smartphone':
        return <Smartphone size={24} className="header-project-icon" />;
      default:
        return <Folder size={24} className="header-project-icon" />;
    }
  };

  return (
    <div className="workspace-header-container">
      {/* Back to projects page button */}
      <button
        className="back-to-projects-btn"
        onClick={() => navigate('/projects')}
        type="button"
      >
        <ArrowLeft size={16} />
        <span>Back to My Projects</span>
      </button>

      {/* Main header block */}
      <div className="workspace-header-main">
        <div className="workspace-title-section">
          <div className="workspace-icon-wrapper">
            {getIcon()}
          </div>
          <div className="workspace-title-text">
            <h1 className="workspace-project-name">{name}</h1>
            <p className="workspace-project-desc">{description}</p>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="workspace-info-grid">
        <div className="info-item">
          <span className="info-label">Client</span>
          <span className="info-value">{client}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Domain</span>
          <span className="info-value">{domain}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Deadline</span>
          <span className="info-value">{deadline}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Status</span>
          <span className="status-badge-workspace">{status}</span>
        </div>
      </div>

      {/* Progress section */}
      <div className="workspace-progress-section">
        <div className="progress-text-row">
          <span className="progress-label">Overall Progress</span>
          <span className="progress-val-text">{progress}%</span>
        </div>
        <div className="progress-bar-track-workspace">
          <div
            className="progress-bar-fill-workspace"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
