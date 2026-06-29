import React from 'react';
import * as Icons from 'lucide-react';
import './EmptyProfile.css';

export default function EmptyProfile({ onRecreate }) {
  const UserXIcon = Icons.UserX;
  const SparklesIcon = Icons.Sparkles;

  return (
    <div className="empty-profile-card">
      <div className="empty-illustration-wrapper">
        {/* Animated SVG Illustration */}
        <svg
          className="empty-state-svg"
          viewBox="0 0 200 200"
          width="160"
          height="160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle decorative elements */}
          <circle cx="100" cy="100" r="80" fill="#f5f3ff" />
          <circle cx="100" cy="100" r="60" fill="#e0e7ff" opacity="0.6" />
          
          {/* Dotted border circle */}
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="#c7d2fe"
            strokeWidth="2"
            strokeDasharray="6 6"
          />

          {/* Central avatar outline */}
          <circle cx="100" cy="85" r="24" fill="#a5b4fc" />
          <path
            d="M56 142C56 122.118 72.1177 106 92 106H108C127.882 106 144 122.118 144 142V150H56V142Z"
            fill="#818cf8"
          />
          
          {/* Missing slash or cross symbol representing "Not Available" */}
          <circle cx="140" cy="70" r="18" fill="#ffffff" shadow="0 2px 4px rgba(0,0,0,0.1)" />
          <circle cx="140" cy="70" r="14" fill="#fee2e2" />
          <path
            d="M135 65L145 75M145 65L135 75"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="empty-text-wrapper">
        <h3 className="empty-title">Profile Not Available</h3>
        <p className="empty-subtitle">Complete your profile to continue.</p>
      </div>

      <button
        type="button"
        className="recreate-profile-btn"
        onClick={onRecreate}
      >
        <SparklesIcon size={16} />
        <span>Initialize Demo Profile</span>
      </button>
    </div>
  );
}
