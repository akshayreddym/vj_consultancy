import React from 'react';
import './ActivityFeed.css';

const ACTIVITIES = [
  { id: 1, user: 'Rahul Iyer', initials: 'RI', action: 'uploaded Dashboard_UI.pdf', time: '2 hours ago', bg: '#eff6ff', color: '#1d4ed8' },
  { id: 2, user: 'Anita Sharma', initials: 'AS', action: 'completed Design Database Schema', time: '4 hours ago', bg: '#f0fdf4', color: '#15803d' },
  { id: 3, user: 'System', initials: 'SY', action: 'progress updated to 60%', time: '1 day ago', bg: '#faf5ff', color: '#7c3aed' },
  { id: 4, user: 'Anita Sharma', initials: 'AS', action: 'uploaded Database Schema', time: '1 day ago', bg: '#f0fdf4', color: '#15803d' },
  { id: 5, user: 'Anita Sharma', initials: 'AS', action: 'commented on Student Module', time: '2 days ago', bg: '#fdf2f8', color: '#db2777' }
];

export default function ActivityFeed() {
  return (
    <div className="activity-feed-container">
      <h3 className="workspace-section-title">Activity Feed</h3>
      <div className="activity-list">
        {ACTIVITIES.map((act) => (
          <div key={act.id} className="activity-item">
            <div
              className="user-initials-badge"
              style={{ backgroundColor: act.bg, color: act.color }}
            >
              {act.initials}
            </div>
            <div className="activity-details">
              <p className="activity-text">
                <strong className="activity-username">{act.user}</strong> {act.action}
              </p>
              <span className="activity-timestamp">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
