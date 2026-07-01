import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ClipboardCheck, Activity, User, ChevronRight } from 'lucide-react';
import './QuickAccess.css';

export default function QuickAccess({ links }) {
  const getLinkIcon = (id) => {
    switch (id) {
      case 'applications':
        return <FileText className="access-icon icon-purple" />;
      case 'evaluation':
        return <ClipboardCheck className="access-icon icon-blue" />;
      case 'lifecycle':
        return <Activity className="access-icon icon-green" />;
      case 'profile':
        return <User className="access-icon icon-orange" />;
      default:
        return <FileText className="access-icon" />;
    }
  };

  return (
    <div className="quick-access-container">
      <h3 className="quick-access-title">Quick Access</h3>
      <div className="quick-access-grid">
        {links.map((link) => (
          <Link key={link.id} to={link.path} className="quick-access-card">
            <div className="quick-access-top">
              <div className="access-icon-container">
                {getLinkIcon(link.id)}
              </div>
              <ChevronRight className="access-arrow-icon" />
            </div>
            <div className="quick-access-bottom">
              <h4 className="access-card-title">{link.title}</h4>
              <p className="access-card-desc">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
