import React from 'react';
import { FileSearch } from 'lucide-react';
import './EmptyApplications.css';

export default function EmptyApplications() {
  return (
    <div className="empty-applications-state">
      <div className="empty-app-icon-container">
        <FileSearch size={48} className="empty-app-icon" />
      </div>
      <h3 className="empty-app-title">No Applications Found</h3>
      <p className="empty-app-subtitle">Try changing your search or filter.</p>
    </div>
  );
}
