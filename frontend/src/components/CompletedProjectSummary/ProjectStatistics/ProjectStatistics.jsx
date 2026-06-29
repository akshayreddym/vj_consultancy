import React from 'react';
import { Files, CheckSquare, Award, Clock, CalendarDays } from 'lucide-react';
import './ProjectStatistics.css';

export default function ProjectStatistics({ statistics }) {
  const { filesSubmitted, tasksCompleted, completion, duration, completionDate } = statistics;

  const stats = [
    { label: 'Files Submitted', value: `${filesSubmitted} Files`, icon: Files, bg: 'rgba(59, 130, 246, 0.08)', color: '#2563eb' },
    { label: 'Tasks Completed', value: `${tasksCompleted} Tasks`, icon: CheckSquare, bg: 'rgba(139, 92, 246, 0.08)', color: '#8b5cf6' },
    { label: 'Completion Rate', value: completion, icon: Award, bg: 'rgba(34, 197, 94, 0.08)', color: '#16a34a' },
    { label: 'Project Duration', value: duration, icon: Clock, bg: 'rgba(249, 115, 22, 0.08)', color: '#ea580c' },
    { label: 'Completion Date', value: completionDate, icon: CalendarDays, bg: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }
  ];

  return (
    <div className="project-statistics-container">
      <h3 className="statistics-section-title">Project Statistics</h3>
      <div className="statistics-cards-stack">
        {stats.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="stat-card-item">
              <div className="stat-card-left">
                <div 
                  className="stat-card-icon-box"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <IconComponent size={18} />
                </div>
                <div className="stat-card-details">
                  <span className="stat-card-label">{item.label}</span>
                  <span className="stat-card-value">{item.value}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
