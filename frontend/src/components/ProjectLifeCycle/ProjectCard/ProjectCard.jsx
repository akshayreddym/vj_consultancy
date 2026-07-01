import React from 'react';
import { Calendar, FileText, Users, ExternalLink, Briefcase } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ project, onOpen }) {
  const { name, client, progress, students = [], documents = [], deadline, status } = project;

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

  return (
    <div className="lifecycle-project-card">
      <div className="card-top-header">
        <div className="project-icon-circle">
          <Briefcase className="project-briefcase-icon" />
        </div>
        <span className={`project-status-badge ${getStatusClass(status)}`}>
          {status}
        </span>
      </div>

      <div className="project-title-block">
        <h3 className="project-card-name" title={name}>{name}</h3>
        <p className="project-card-client">Client: {client}</p>
      </div>

      {/* Progress Bar */}
      <div className="project-progress-section">
        <div className="progress-label-row">
          <span className="progress-lbl-text">Overall Progress</span>
          <span className="progress-percent-val">{progress}%</span>
        </div>
        <div className="progress-bar-track">
          <div 
            className={`progress-bar-fill ${progress === 100 ? 'bg-completed' : status === 'Delayed' ? 'bg-delayed' : status === 'At Risk' ? 'bg-at-risk' : 'bg-on-track'}`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Assigned Students Avatar Stack */}
      <div className="project-meta-details">
        <div className="meta-info-row">
          <div className="meta-info-left">
            <Users className="meta-icon-users" />
            <span className="meta-info-label">Assigned Students</span>
          </div>
          <div className="student-avatars-stack">
            {students.slice(0, 3).map((student) => (
              <img
                key={student.id}
                src={student.photo}
                alt={student.name}
                className="stack-avatar-img"
                title={`${student.name} (${student.role})`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=7C3AED&color=fff`;
                }}
              />
            ))}
            {students.length > 3 && (
              <div className="stack-avatar-more">
                +{students.length - 3}
              </div>
            )}
          </div>
        </div>

        <div className="meta-info-stats">
          <div className="stat-meta-item">
            <FileText className="stat-meta-icon" />
            <span>{documents.length} Document{documents.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="stat-meta-item">
            <Calendar className="stat-meta-icon" />
            <span>{deadline}</span>
          </div>
        </div>
      </div>

      <button className="open-workspace-btn" onClick={() => onOpen(project)}>
        <span>Open Project</span>
        <ExternalLink className="open-workspace-icon" />
      </button>
    </div>
  );
}
