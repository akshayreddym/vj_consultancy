import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderCheck, ArrowRight } from 'lucide-react';
import './EmptyWorkspace.css';

export default function EmptyWorkspace() {
  const navigate = useNavigate();

  return (
    <div className="empty-workspace-state">
      <div className="empty-illustration-container">
        <FolderCheck size={52} className="empty-workspace-icon" />
      </div>
      <h3 className="empty-title">Workspace Not Available</h3>
      <p className="empty-subtitle">Please select an active project.</p>
      <button
        className="go-to-projects-btn"
        onClick={() => navigate('/projects')}
        type="button"
      >
        <span>Go to My Projects</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
