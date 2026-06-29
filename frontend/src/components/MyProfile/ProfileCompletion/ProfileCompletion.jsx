import React from 'react';
import * as Icons from 'lucide-react';
import './ProfileCompletion.css';

export default function ProfileCompletion({ percentage, checklist }) {
  const CheckCircleIcon = Icons.CheckCircle2;
  const CircleIcon = Icons.Circle;

  // SVG parameters for circular progress
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="profile-completion-card">
      <div className="completion-top-layout">
        {/* Left Side: Circular Progress */}
        <div className="circular-progress-wrapper">
          <svg className="circular-progress-svg" width="110" height="110">
            {/* Background Track */}
            <circle
              className="circle-bg"
              cx="55"
              cy="55"
              r={radius}
              strokeWidth={strokeWidth}
            />
            {/* Dynamic Active Stroke */}
            <circle
              className="circle-indicator"
              cx="55"
              cy="55"
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="circular-progress-text">
            <span className="percentage-num">{percentage}%</span>
            <span className="percentage-label">Complete</span>
          </div>
        </div>

        {/* Right Side: Details & Checklist */}
        <div className="completion-info-details">
          <h3 className="completion-card-title">Profile Completion</h3>
          <p className="completion-card-subtitle">
            Complete your profile to increase your chances of getting selected.
          </p>

          {/* Horizontal Progress Bar */}
          <div className="horizontal-bar-container">
            <div
              className="horizontal-bar-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Checklist Grid */}
      <div className="checklist-divider"></div>
      
      <ul className="completion-checklist-grid" aria-label="Profile Sections Checklist">
        <li className={`checklist-item ${checklist.personalInfo ? 'completed' : 'incomplete'}`}>
          {checklist.personalInfo ? (
            <CheckCircleIcon className="checklist-icon checked" size={18} />
          ) : (
            <CircleIcon className="checklist-icon unchecked" size={18} />
          )}
          <span className="checklist-text">Personal Information</span>
        </li>

        <li className={`checklist-item ${checklist.skills ? 'completed' : 'incomplete'}`}>
          {checklist.skills ? (
            <CheckCircleIcon className="checklist-icon checked" size={18} />
          ) : (
            <CircleIcon className="checklist-icon unchecked" size={18} />
          )}
          <span className="checklist-text">Skills</span>
        </li>

        <li className={`checklist-item ${checklist.resume ? 'completed' : 'incomplete'}`}>
          {checklist.resume ? (
            <CheckCircleIcon className="checklist-icon checked" size={18} />
          ) : (
            <CircleIcon className="checklist-icon unchecked" size={18} />
          )}
          <span className="checklist-text">Resume</span>
        </li>

        <li className={`checklist-item ${checklist.links ? 'completed' : 'incomplete'}`}>
          {checklist.links ? (
            <CheckCircleIcon className="checklist-icon checked" size={18} />
          ) : (
            <CircleIcon className="checklist-icon unchecked" size={18} />
          )}
          <span className="checklist-text">Professional Links</span>
        </li>

        <li className={`checklist-item ${checklist.academic ? 'completed' : 'incomplete'}`}>
          {checklist.academic ? (
            <CheckCircleIcon className="checklist-icon checked" size={18} />
          ) : (
            <CircleIcon className="checklist-icon unchecked" size={18} />
          )}
          <span className="checklist-text">Academic Information</span>
        </li>
      </ul>
    </div>
  );
}
