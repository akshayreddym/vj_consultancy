import React, { useState } from 'react';
import { ArrowLeft, Download, Check } from 'lucide-react';
import './WorkspaceHeader.css';

export default function WorkspaceHeader({ project, onBack }) {
  const [showToast, setShowToast] = useState(false);

  if (!project) {
    return null;
  }

  const { name = '', client = '', status = '' } = project;

  const getStatusClass = (projStatus) => {
    switch (projStatus) {
      case 'On Track':
        return 'status-on-track';
      case 'Completed':
        return 'status-completed';
      case 'At Risk':
        return 'status-at-risk';
      case 'Delayed':
        return 'status-delayed';
      default:
        return '';
    }
  };

  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  return (
    <div className="workspace-header-container">
      <button className="workspace-back-btn" onClick={onBack}>
        <ArrowLeft className="back-icon" />
        <span>Back to Project Lifecycle</span>
      </button>

      <div className="workspace-header-main">
        <div className="workspace-title-block">
          <h1 className="workspace-project-title">{name}</h1>
          <div className="workspace-meta-row">
            <span className="workspace-client-lbl">Client: <strong>{client}</strong></span>
            <span className="workspace-meta-dot">•</span>
            <span className={`workspace-status-badge ${getStatusClass(status)}`}>
              {status}
            </span>
          </div>
        </div>

        <button className="workspace-export-btn" onClick={handleExport}>
          <Download className="export-icon" />
          <span>Export Report</span>
        </button>
      </div>

      {showToast && (
        <div className="toast-notification-success">
          <div className="toast-icon-wrapper">
            <Check className="toast-check-icon" />
          </div>
          <div className="toast-content">
            <span className="toast-title">Report Exported!</span>
            <span className="toast-desc">Project report downloaded successfully for {name}.</span>
          </div>
        </div>
      )}
    </div>
  );
}
