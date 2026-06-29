import React from 'react';
import * as Icons from 'lucide-react';
import './ProjectsRow.css';

export default function ProjectsRow({ project, onOpenProject }) {
  const { id, name, client, domain, status, progress, deadline, iconName } = project;

  // Dynamically resolve the project icon, fallback to Folder
  const ProjectIcon = Icons[iconName] || Icons.Folder;

  const handleClick = (e) => {
    // If status is On Hold, clicking anywhere does nothing
    if (status === 'On Hold') {
      return;
    }
    // If the click is on the three-dot button, do not navigate
    if (e.target.closest('.more-options-btn')) {
      return;
    }
    onOpenProject(id, status);
  };

  const getStatusClass = (statusStr) => {
    switch (statusStr.toLowerCase()) {
      case 'in progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'on hold':
        return 'status-on-hold';
      default:
        return '';
    }
  };

  const renderActionButton = () => {
    if (status === 'In Progress') {
      return (
        <button
          className="workspace-btn btn-open-workspace"
          onClick={(e) => {
            e.stopPropagation();
            onOpenProject(id, status);
          }}
          type="button"
        >
          Open Workspace
        </button>
      );
    } else if (status === 'Completed') {
      return (
        <button
          className="workspace-btn btn-view-summary"
          onClick={(e) => {
            e.stopPropagation();
            onOpenProject(id, status);
          }}
          type="button"
        >
          View Summary
        </button>
      );
    } else if (status === 'On Hold') {
      return (
        <button
          className="workspace-btn btn-on-hold"
          disabled
          type="button"
        >
          On Hold
        </button>
      );
    }
    return null;
  };

  const isOnHold = status === 'On Hold';

  return (
    <tr 
      className={`projects-row ${isOnHold ? 'row-disabled' : ''}`} 
      onClick={isOnHold ? undefined : handleClick}
    >
      {/* Project Info Column */}
      <td className="cell-project">
        <div className="project-info-wrapper">
          <div className={`project-icon-box status-bg-${status.toLowerCase().replace(' ', '-')}`}>
            <ProjectIcon className="project-row-icon" size={18} />
          </div>
          <div className="project-name-details">
            <span className="project-row-name">{name}</span>
            <span className="project-row-client">{client}</span>
          </div>
        </div>
      </td>

      {/* Domain Column */}
      <td className="cell-domain">
        <span className="project-row-domain">{domain}</span>
      </td>

      {/* Status Column */}
      <td className="cell-status">
        <span className={`status-badge ${getStatusClass(status)}`}>
          <span className="status-dot"></span>
          {status}
        </span>
      </td>

      {/* Progress Column */}
      <td className="cell-progress">
        {status.toLowerCase() === 'on hold' ? (
          <span className="progress-value-on-hold">--</span>
        ) : (
          <div className="progress-container">
            <span className="progress-percentage">{progress}%</span>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </td>

      {/* Deadline Column */}
      <td className="cell-deadline">
        <span className="project-row-deadline">{deadline}</span>
      </td>

      {/* Action Column */}
      <td className="cell-action">
        <div className="row-actions-wrapper" onClick={(e) => e.stopPropagation()}>
          {renderActionButton()}
          <button
            className="more-options-btn"
            aria-label="More options"
            type="button"
          >
            <Icons.MoreVertical size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
