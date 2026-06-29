import React from 'react';
import { FolderOpen } from 'lucide-react';
import './EmptyProject.css';

export default function EmptyProject() {
  return (
    <div className="empty-project-state">
      <div className="empty-icon-container">
        <FolderOpen size={48} className="empty-folder-icon" />
      </div>
      <h3 className="empty-title">No Projects Found</h3>
      <p className="empty-subtitle">Try changing your search or selected filter.</p>
    </div>
  );
}
