import React from 'react';
import { Briefcase, ClipboardList, CheckCircle2, CalendarDays, Award, XCircle } from 'lucide-react';
import './StatusSummary.css';

export default function StatusSummary({ counts }) {
  const summaries = [
    { label: 'Total Applications', count: counts.total, icon: Briefcase, className: 'summary-total' },
    { label: 'Under Review', count: counts.underReview, icon: ClipboardList, className: 'summary-review' },
    { label: 'Shortlisted', count: counts.shortlisted, icon: CheckCircle2, className: 'summary-shortlisted' },
    { label: 'Interview Scheduled', count: counts.interview, icon: CalendarDays, className: 'summary-interview' },
    { label: 'Selected', count: counts.selected, icon: Award, className: 'summary-selected' },
    { label: 'Rejected', count: counts.rejected, icon: XCircle, className: 'summary-rejected' },
  ];

  return (
    <div className="status-summary-grid">
      {summaries.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className={`summary-card-item ${item.className}`}>
            <div className="summary-card-inner">
              <div className="summary-text-info">
                <span className="summary-card-label">{item.label}</span>
                <span className="summary-card-count">{item.count}</span>
              </div>
              <div className="summary-icon-box">
                <IconComponent size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
