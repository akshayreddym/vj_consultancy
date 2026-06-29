import React from 'react';
import * as Icons from 'lucide-react';
import './ApplicationRow.css';

export default function ApplicationRow({ application, onViewDetails }) {
  const { id, projectName, description, projectIcon, appliedDate, relativeDate, status, lastUpdated } = application;

  // Resolve Lucide Icon
  const IconComponent = Icons[projectIcon] || Icons.Folder;

  const getStatusClass = (statusStr) => {
    switch (statusStr.toLowerCase()) {
      case 'applied':
        return 'badge-applied';
      case 'under review':
        return 'badge-review';
      case 'shortlisted':
        return 'badge-shortlisted';
      case 'interview scheduled':
      case 'interview':
        return 'badge-interview';
      case 'selected':
        return 'badge-selected';
      case 'rejected':
        return 'badge-rejected';
      default:
        return '';
    }
  };

  const handleClick = (e) => {
    onViewDetails(application);
  };

  return (
    <tr className="application-row" onClick={handleClick}>
      {/* Project info column */}
      <td className="cell-project-app">
        <div className="project-app-wrapper">
          <div className={`project-app-icon status-bg-${status.toLowerCase().replace(' ', '-')}`}>
            <IconComponent size={18} />
          </div>
          <div className="project-app-details">
            <span className="project-app-name">{projectName}</span>
            <span className="project-app-desc">{description}</span>
          </div>
        </div>
      </td>

      {/* Applied date column */}
      <td className="cell-applied-app">
        <div className="date-stack">
          <span className="primary-date">{appliedDate}</span>
          <span className="relative-date-sub">{relativeDate}</span>
        </div>
      </td>

      {/* Status column */}
      <td className="cell-status-app">
        <span className={`status-badge-app ${getStatusClass(status)}`}>
          <span className="status-badge-dot"></span>
          {status}
        </span>
      </td>

      {/* Last updated column */}
      <td className="cell-updated-app">
        <span className="updated-date">{lastUpdated}</span>
      </td>

      {/* Action button column */}
      <td className="cell-action-app">
        <button
          className="track-progress-btn"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(application);
          }}
          type="button"
        >
          Track Progress
        </button>
      </td>
    </tr>
  );
}
