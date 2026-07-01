import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Download, ExternalLink, FileText } from 'lucide-react';
import InterviewSection from '../InterviewSection/InterviewSection';
import EvaluationForm from '../EvaluationForm/EvaluationForm';
import EvaluationSummary from '../EvaluationSummary/EvaluationSummary';
import './CandidateEvaluation.css';

const Github = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.size || 16}
    height={props.size || 16}
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.size || 16}
    height={props.size || 16}
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function CandidateEvaluation({
  candidate,
  onSchedule,
  onCommit,
  onBack
}) {
  if (!candidate) return null;

  // Track evaluation values locally in state
  const [localScores, setLocalScores] = useState({
    technicalKnowledge: candidate.scores?.technicalKnowledge || 0,
    communicationSkills: candidate.scores?.communicationSkills || 0,
    problemSolving: candidate.scores?.problemSolving || 0,
    confidence: candidate.scores?.confidence || 0,
    portfolioQuality: candidate.scores?.portfolioQuality || 0
  });
  
  const [localRemarks, setLocalRemarks] = useState(candidate.remarks || '');

  const handleScoreChange = (criterion, val) => {
    setLocalScores(prev => ({
      ...prev,
      [criterion]: val
    }));
  };

  const handleRemarksChange = (val) => {
    setLocalRemarks(val);
  };

  const handleSaveOutcome = (decision) => {
    if (decision === 'Passed' && localRemarks.trim().length === 0) {
      alert("Please enter coordinator remarks before passing the candidate.");
      return;
    }
    
    // Call parent handler to update candidate in parent state array
    onCommit(candidate.id, localScores, localRemarks, decision);
  };

  return (
    <div className="candidate-evaluation-container">
      {/* Header */}
      <div className="eval-detail-header">
        <button className="back-nav-btn" onClick={onBack}>
          <ArrowLeft className="back-icon" />
          <span>Back to Evaluation Queue</span>
        </button>
        <div className="header-meta">
          <h2 className="eval-detail-title">Candidate Evaluation</h2>
          <span className="eval-project-tag">Project: {candidate.appliedProject}</span>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="eval-grid-layout">
        
        {/* LEFT COLUMN: Student Profile Info */}
        <aside className="eval-sidebar-card left-column">
          <div className="eval-profile-header">
            <img
              src={candidate.profile.photo}
              alt={candidate.profile.name}
              className="eval-profile-photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.profile.name)}&background=7C3AED&color=fff&size=128`;
              }}
            />
            <h3 className="eval-student-name">{candidate.profile.name}</h3>
            <p className="eval-student-branch">{candidate.profile.branch}</p>
            <p className="eval-student-year text-muted">{candidate.profile.year}</p>
          </div>

          <div className="eval-contact-list">
            <h4 className="eval-sidebar-subheading">Contact</h4>
            <div className="eval-contact-item">
              <Mail className="eval-contact-icon" />
              <span className="eval-contact-text" title={candidate.profile.email}>
                {candidate.profile.email}
              </span>
            </div>
            <div className="eval-contact-item">
              <Phone className="eval-contact-icon" />
              <span className="eval-contact-text">{candidate.profile.phone}</span>
            </div>
            <div className="eval-contact-item">
              <MapPin className="eval-contact-icon" />
              <span className="eval-contact-text">{candidate.profile.location}</span>
            </div>
          </div>

          <div className="eval-skills-block">
            <h4 className="eval-sidebar-subheading">Technical Skills</h4>
            <div className="eval-skills-tags">
              {candidate.profile.skills.map((skill, index) => (
                <span key={index} className="eval-skill-badge">{skill}</span>
              ))}
            </div>
          </div>

          <div className="eval-resume-block">
            <h4 className="eval-sidebar-subheading">Resume</h4>
            <div className="eval-resume-mini-card">
              <div className="eval-resume-left">
                <FileText className="eval-pdf-icon" />
                <div className="eval-file-meta">
                  <span className="eval-file-name" title={`Resume_${candidate.profile.name.replace(/\s+/g, '_')}.pdf`}>
                    Resume_{candidate.profile.name.split(' ')[0]}.pdf
                  </span>
                  <span className="eval-file-size">1.2 MB • PDF</span>
                </div>
              </div>
              <a 
                href={candidate.profile.resumeUrl || "#"} 
                className="eval-download-btn"
                download
                onClick={(e) => e.preventDefault()} // Mock mode
              >
                <Download className="eval-download-icon" />
                <span>Download</span>
              </a>
            </div>
          </div>

          <div className="eval-socials-block">
            <h4 className="eval-sidebar-subheading">Portfolio & Links</h4>
            <div className="eval-social-links">
              {candidate.portfolio.github && (
                <a href={candidate.portfolio.github} target="_blank" rel="noopener noreferrer" className="eval-social-link-item">
                  <Github className="social-icon" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="social-arrow" />
                </a>
              )}
              {candidate.portfolio.linkedin && (
                <a href={candidate.portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="eval-social-link-item">
                  <Linkedin className="social-icon" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="social-arrow" />
                </a>
              )}
              {candidate.portfolio.portfolio && (
                <a href={candidate.portfolio.portfolio} target="_blank" rel="noopener noreferrer" className="eval-social-link-item">
                  <ExternalLink className="social-icon" />
                  <span>Personal Portfolio</span>
                  <ExternalLink className="social-arrow" />
                </a>
              )}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN: Interview Details + Evaluation Criteria */}
        <main className="eval-center-column">
          <InterviewSection 
            candidate={candidate}
            onSchedule={onSchedule}
          />
          <EvaluationForm 
            candidate={candidate}
            scores={localScores}
            onScoreChange={handleScoreChange}
            remarks={localRemarks}
            onRemarksChange={handleRemarksChange}
          />
        </main>

        {/* RIGHT COLUMN: Realtime Score Breakdown Summary */}
        <aside className="eval-right-column">
          <EvaluationSummary 
            scores={localScores}
          />
        </aside>
      </div>

      {/* BOTTOM ACTION BAR */}
      {candidate.evaluationStatus === 'Pending' && (
        <div className="eval-action-bar-sticky">
          <div className="action-bar-content-row">
            <div className="candidate-summary-meta">
              <span className="candidate-summary-name">{candidate.profile.name}</span>
              <span className="candidate-summary-status">• Evaluation In Progress</span>
            </div>
            
            <div className="action-bar-buttons-row">
              <button 
                className="btn-action-fail"
                onClick={() => handleSaveOutcome('Failed')}
              >
                Fail Candidate
              </button>
              <button 
                className="btn-action-pass"
                onClick={() => handleSaveOutcome('Passed')}
              >
                Pass Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
