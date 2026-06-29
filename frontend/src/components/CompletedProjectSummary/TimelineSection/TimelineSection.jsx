import React from 'react';
import { Check } from 'lucide-react';
import './TimelineSection.css';

export default function TimelineSection({ timeline }) {
  return (
    <div className="timeline-section-container">
      <h3 className="overview-section-title">Completion Timeline</h3>
      <div className="summary-vertical-timeline">
        {timeline.map((step, index) => (
          <div key={index} className="summary-timeline-node-item">
            <div className="summary-timeline-marker">
              <div className="summary-timeline-dot">
                <Check size={10} className="timeline-check-svg" />
              </div>
              {index < timeline.length - 1 && <div className="summary-timeline-line"></div>}
            </div>
            <div className="summary-timeline-content">
              <div className="summary-timeline-content-header">
                <span className="summary-timeline-stage-name">{step.stage}</span>
                <span className="summary-timeline-stage-date">{step.date}</span>
              </div>
              <p className="summary-timeline-stage-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
