import React from 'react';
import * as Icons from 'lucide-react';
import './AcademicInformation.css';

export default function AcademicInformation({ academic }) {
  const SchoolIcon = Icons.School;
  const GraduationCapIcon = Icons.GraduationCap;
  const GitBranchIcon = Icons.GitBranch;
  const CalendarIcon = Icons.Calendar;
  const AwardIcon = Icons.Award;
  const LockIcon = Icons.Lock;

  return (
    <div className="academic-info-card">
      <div className="academic-header">
        <h3 className="section-card-title">Academic Information</h3>
        <div className="academic-badges">
          <span className="verified-badge" title="Verified by College Administration">
            <Icons.CheckCircle size={12} />
            <span>Verified</span>
          </span>
          <span className="readonly-badge" title="This section is locked and can only be updated by the admin">
            <LockIcon size={11} />
            <span>Locked</span>
          </span>
        </div>
      </div>

      <div className="academic-grid">
        {/* College Name */}
        <div className="academic-field-group full-width">
          <label className="academic-label">
            <SchoolIcon size={14} className="label-icon" />
            <span>College / Institution</span>
          </label>
          <div className="academic-value font-semibold">{academic.college || '—'}</div>
        </div>

        {/* Degree */}
        <div className="academic-field-group">
          <label className="academic-label">
            <GraduationCapIcon size={14} className="label-icon" />
            <span>Degree</span>
          </label>
          <div className="academic-value">{academic.degree || '—'}</div>
        </div>

        {/* Branch */}
        <div className="academic-field-group">
          <label className="academic-label">
            <GitBranchIcon size={14} className="label-icon" />
            <span>Branch / Specialization</span>
          </label>
          <div className="academic-value">{academic.branch || '—'}</div>
        </div>

        {/* Current Year */}
        <div className="academic-field-group">
          <label className="academic-label">
            <CalendarIcon size={14} className="label-icon" />
            <span>Current Year</span>
          </label>
          <div className="academic-value">{academic.year || '—'}</div>
        </div>

        {/* Batch */}
        <div className="academic-field-group">
          <label className="academic-label">
            <CalendarIcon size={14} className="label-icon" />
            <span>Academic Batch</span>
          </label>
          <div className="academic-value">{academic.batch || '—'}</div>
        </div>

        {/* CGPA */}
        <div className="academic-field-group">
          <label className="academic-label">
            <AwardIcon size={14} className="label-icon" />
            <span>Cumulative GPA (CGPA)</span>
          </label>
          <div className="academic-value cgpa-highlight">
            <span className="cgpa-number">{academic.cgpa || '—'}</span>
            <span className="cgpa-scale">/ 10.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
