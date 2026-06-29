import React from 'react';
import * as Icons from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './QuickLinks.css';

const QUICK_LINKS_DATA = [
  {
    id: 'browse-projects',
    title: 'Browse Projects',
    subtitle: 'Explore available consultancy projects',
    icon: 'Search',
    colorClass: 'link-blue',
    path: '/browse-projects'
  },
  {
    id: 'my-applications',
    title: 'My Applications',
    subtitle: 'Track your applications',
    icon: 'FileText',
    colorClass: 'link-purple',
    path: '/my-applications'
  },
  {
    id: 'my-projects',
    title: 'My Projects',
    subtitle: 'View assigned projects',
    icon: 'Briefcase',
    colorClass: 'link-green',
    path: '/projects'
  },
  {
    id: 'my-profile',
    title: 'My Profile',
    subtitle: 'Manage your profile',
    icon: 'User',
    colorClass: 'link-orange',
    path: '/my-profile'
  }
];

export default function QuickLinks() {
  const navigate = useNavigate();

  return (
    <div className="quick-links-card">
      <h2 className="quick-links-title">Quick Actions</h2>
      <div className="quick-links-grid">
        {QUICK_LINKS_DATA.map((link) => {
          const IconComponent = Icons[link.icon] || Icons.HelpCircle;
          return (
            <div
              key={link.id}
              className="quick-link-item"
              onClick={() => navigate(link.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(link.path);
                }
              }}
            >
              <div className={`quick-link-icon-container ${link.colorClass}`}>
                <IconComponent size={20} className="quick-link-icon" />
              </div>
              <div className="quick-link-details">
                <span className="quick-link-item-title">{link.title}</span>
                <span className="quick-link-item-subtitle">{link.subtitle}</span>
              </div>
              <div className="quick-link-arrow">
                <Icons.ArrowRight size={18} className="arrow-svg" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
