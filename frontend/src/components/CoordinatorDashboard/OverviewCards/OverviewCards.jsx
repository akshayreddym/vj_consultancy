import React from 'react';
import { FileText, Calendar, Briefcase, CheckCircle2 } from 'lucide-react';
import './OverviewCards.css';

export default function OverviewCards({ stats }) {
  // Helper to render correct icon based on type
  const renderIcon = (type) => {
    switch (type) {
      case 'applications':
        return <FileText className="card-icon" />;
      case 'evaluations':
        return <Calendar className="card-icon" />;
      case 'assignments':
        return <Briefcase className="card-icon" />;
      case 'completed':
        return <CheckCircle2 className="card-icon" />;
      default:
        return <FileText className="card-icon" />;
    }
  };

  return (
    <div className="overview-cards-grid">
      {stats.map((stat) => (
        <div key={stat.id} className={`overview-card-item card-${stat.type}`}>
          <div className="card-header-row">
            <span className={`icon-container icon-${stat.type}`}>
              {renderIcon(stat.type)}
            </span>
          </div>
          <div className="card-body-content">
            <h3 className="card-value-number">{stat.value}</h3>
            <span className="card-title-label">{stat.title}</span>
            <p className="card-subtitle-label">{stat.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
