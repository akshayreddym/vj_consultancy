import React from 'react';
import { Calendar, FileText, CheckCircle2, Clock } from 'lucide-react';
import './ProgressTrack.css';

export default function ProgressTrack({ project }) {
  const { progress = 0, milestones = [], students = [], documents = [], deadline = '' } = project || {};
  const safeMilestones = milestones || [];
  const safeStudents = students || [];
  const safeDocs = documents || [];

  // Milestone stats
  const completedMilestones = safeMilestones.filter(m => m.status === 'Completed').length;
  const totalMilestones = safeMilestones.length;
  const milestoneCompletionRate = totalMilestones > 0 
    ? Math.round((completedMilestones / totalMilestones) * 100) 
    : 0;

  // Pending reviews count
  const pendingReviewsCount = safeDocs.filter(d => d.status === 'Pending Review').length;

  return (
    <div className="workspace-progress-tab">
      <div className="progress-dashboard-grid">
        
        {/* Left Side: Large Progress Gauge */}
        <div className="progress-gauge-card">
          <h3 className="progress-card-title">Overall Status</h3>
          <div className="progress-circle-wrapper">
            <div className="progress-circle-bg">
              <div className="progress-circle-fill-value">{progress}%</div>
              <span className="progress-circle-lbl">Complete</span>
            </div>
            {/* Dynamic CSS conic gradient circular gauge */}
            <div 
              className="progress-circular-conic"
              style={{
                background: `conic-gradient(#7c3aed ${progress}%, #f1f5f9 ${progress}%)`
              }}
            />
          </div>
          <div className="progress-gauge-meta">
            <div className="gauge-meta-item">
              <Calendar className="meta-icon" />
              <div className="meta-text">
                <span className="meta-lbl">Target Deadline</span>
                <span className="meta-val">{deadline}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Milestone Completion & Student workload */}
        <div className="progress-details-column">
          
          {/* Milestone Rates Card */}
          <div className="progress-details-card">
            <h4 className="details-card-title">Milestone Completion Rate</h4>
            <div className="details-metric-row">
              <span className="metric-number">{completedMilestones} / {totalMilestones}</span>
              <span className="metric-percentage">{milestoneCompletionRate}%</span>
            </div>
            <div className="details-progress-track">
              <div className="details-progress-fill purple-fill" style={{ width: `${milestoneCompletionRate}%` }} />
            </div>
            <div className="milestones-checklist">
              {safeMilestones.map((m) => (
                <div key={m.name} className="checklist-item">
                  {m.status === 'Completed' ? (
                    <CheckCircle2 className="check-icon completed" />
                  ) : (
                    <Clock className="check-icon pending" />
                  )}
                  <span className={`checklist-lbl ${m.status === 'Completed' ? 'done' : ''}`}>
                    {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Contributions Card */}
          <div className="progress-details-card">
            <h4 className="details-card-title">Student Contributions</h4>
            <div className="students-contribution-list">
              {safeStudents.map((student) => (
                <div key={student.id} className="contribution-item">
                  <div className="student-profile-summary">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="summary-avatar-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=7C3AED&color=fff`;
                      }}
                    />
                    <div className="student-text-info">
                      <span className="student-summary-name">{student.name}</span>
                      <span className="student-summary-role">{student.role}</span>
                    </div>
                  </div>

                  <div className="contribution-progress-group">
                    <div className="contribution-progress-lbl">
                      <span>Task Progress</span>
                      <span>{student.progress}%</span>
                    </div>
                    <div className="contribution-progress-track">
                      <div className="contribution-progress-fill green-fill" style={{ width: `${student.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Reviews Card */}
          <div className="progress-details-card pending-reviews-card">
            <div className="pending-reviews-header">
              <FileText className="pending-reviews-icon" />
              <div className="pending-reviews-text">
                <span className="pending-reviews-lbl">Pending Coordinator Reviews</span>
                <span className="pending-reviews-desc">Items awaiting validation and grading feedback.</span>
              </div>
              <span className={`pending-count-badge ${pendingReviewsCount > 0 ? 'alert-active' : ''}`}>
                {pendingReviewsCount}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
