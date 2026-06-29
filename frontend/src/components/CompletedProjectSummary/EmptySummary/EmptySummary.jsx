import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderX, ArrowLeft } from 'lucide-react';
import './EmptySummary.css';

export default function EmptySummary() {
  const navigate = useNavigate();

  return (
    <div className="empty-summary-container">
      <div className="empty-summary-icon-box">
        <FolderX size={48} className="empty-summary-icon" />
      </div>
      <h2 className="empty-summary-title">Completed Project Not Found</h2>
      <p className="empty-summary-desc">
        We couldn't find the archived completed project details you are looking for. It may have been relocated.
      </p>
      <button
        className="empty-summary-return-btn"
        onClick={() => navigate('/projects')}
        type="button"
      >
        <ArrowLeft size={16} />
        <span>Return to My Projects</span>
      </button>
    </div>
  );
}
