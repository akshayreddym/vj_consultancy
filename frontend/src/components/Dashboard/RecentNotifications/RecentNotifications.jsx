import React from 'react';
import * as Icons from 'lucide-react';
import './RecentNotifications.css';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Application shortlisted',
    time: '2 hours ago',
    icon: 'CheckCircle2',
    colorClass: 'noti-green'
  },
  {
    id: 2,
    title: 'Interview scheduled',
    time: '5 hours ago',
    icon: 'Calendar',
    colorClass: 'noti-blue'
  },
  {
    id: 3,
    title: 'Assigned to College ERP Portal',
    time: '1 day ago',
    icon: 'Briefcase',
    colorClass: 'noti-purple'
  },
  {
    id: 4,
    title: 'Project deadline tomorrow',
    time: '1 day ago',
    icon: 'Clock',
    colorClass: 'noti-orange'
  },
  {
    id: 5,
    title: 'Application rejected',
    time: '3 days ago',
    icon: 'XCircle',
    colorClass: 'noti-red'
  }
];

export default function RecentNotifications() {
  return (
    <div className="recent-notifications-card">
      <div className="recent-notifications-header">
        <h2 className="recent-notifications-title">Recent Notifications</h2>
      </div>
      
      <div className="notifications-list">
        {MOCK_NOTIFICATIONS.map((noti) => {
          const IconComponent = Icons[noti.icon] || Icons.Bell;
          return (
            <div key={noti.id} className="notification-item">
              <div className={`notification-icon-wrapper ${noti.colorClass}`}>
                <IconComponent size={18} className="notification-icon" />
              </div>
              <div className="notification-content">
                <p className="notification-item-title">{noti.title}</p>
                <span className="notification-time">{noti.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
