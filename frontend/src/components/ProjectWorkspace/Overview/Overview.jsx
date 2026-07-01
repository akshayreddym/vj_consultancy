import React from 'react';
import { Briefcase, FileText, Users, Calendar, Award } from 'lucide-react';
import './Overview.css';

export default function Overview({ project }) {
  if (!project) {
    return null;
  }
  const { description = '', techStack = [], owner = '', progress = 0, milestones = [], documents = [], students = [], deadline = '' } = project;

  // Calculate completed milestones
  const completedMilestones = milestones.filter(m => m.status === 'Completed').length;

  return (
    <div className="workspace-overview-tab">
      <div className="overview-main-grid">
        
        {/* Left Section: Details Card */}
        <div className="overview-details-card">
          <h2 className="overview-section-title">Project Description</h2>
          <p className="overview-description-text">{description}</p>

          <h3 className="overview-subsection-title">Technology Stack</h3>
          <div className="overview-tech-tags">
            {techStack.map((tech, index) => (
              <span key={index} className="overview-tech-badge">{tech}</span>
            ))}
          </div>

          <h3 className="overview-subsection-title">Project Owner / Principal Investigator</h3>
          <div className="overview-owner-info">
            <Award className="owner-award-icon" />
            <div className="owner-meta">
              <span className="owner-name-lbl">{owner}</span>
              <span className="owner-dept-lbl">Veermata Jijabai Technological Institute (VJTI)</span>
            </div>
          </div>
        </div>

        {/* Right Section: Progress & Stats */}
        <div className="overview-stats-column">
          
          {/* Progress Card */}
          <div className="overview-progress-card">
            <div className="progress-card-header">
              <span className="progress-card-lbl">Overall Project Progress</span>
              <span className="progress-card-val">{progress}%</span>
            </div>
            <div className="progress-card-track">
              <div 
                className={`progress-card-fill ${progress === 100 ? 'bg-completed' : 'bg-on-track'}`} 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="progress-card-desc">
              {progress === 100 
                ? 'All milestone deliverables completed.' 
                : `${milestones.length - completedMilestones} execution phases remaining.`}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="overview-stats-grid">
            <div className="stat-grid-card">
              <div className="stat-icon-wrapper blue-icon">
                <Briefcase className="stat-grid-icon" />
              </div>
              <div className="stat-grid-meta">
                <span className="stat-meta-number">{completedMilestones} / {milestones.length}</span>
                <span className="stat-meta-label">Milestones Done</span>
              </div>
            </div>

            <div className="stat-grid-card">
              <div className="stat-icon-wrapper green-icon">
                <FileText className="stat-grid-icon" />
              </div>
              <div className="stat-grid-meta">
                <span className="stat-meta-number">{documents.length}</span>
                <span className="stat-meta-label">Documents</span>
              </div>
            </div>

            <div className="stat-grid-card">
              <div className="stat-icon-wrapper purple-icon">
                <Users className="stat-grid-icon" />
              </div>
              <div className="stat-grid-meta">
                <span className="stat-meta-number">{students.length}</span>
                <span className="stat-meta-label">Active Students</span>
              </div>
            </div>

            <div className="stat-grid-card">
              <div className="stat-icon-wrapper yellow-icon">
                <Calendar className="stat-grid-icon" />
              </div>
              <div className="stat-grid-meta">
                <span className="stat-meta-number" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>{deadline}</span>
                <span className="stat-meta-label">Target Deadline</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
