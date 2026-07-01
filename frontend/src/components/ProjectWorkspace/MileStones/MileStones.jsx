import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import './MileStones.css';

export default function MileStones({ milestones = [], onToggleMilestone }) {
  const safeMilestones = milestones || [];
  if (safeMilestones.length === 0) {
    return (
      <div className="empty-milestones-view">
        <p className="empty-view-text">No milestones defined for this project.</p>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="milestone-status-icon status-completed-icon" />;
      case 'In Progress':
        return <Clock className="milestone-status-icon status-progress-icon" />;
      case 'Not Started':
        return <Circle className="milestone-status-icon status-notstarted-icon" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-inprogress';
      case 'Not Started': return 'status-notstarted';
      default: return '';
    }
  };

  return (
    <div className="workspace-milestones-tab">
      <div className="milestones-header-row">
        <h2 className="milestones-tab-title">Project Execution Phases</h2>
        <p className="milestones-tab-desc">Toggle phase completion states using the checkboxes below to update overall progress.</p>
      </div>

      <div className="milestones-list-container">
        {safeMilestones.map((milestone) => (
          <div key={milestone.name} className={`milestone-item-card ${getStatusClass(milestone.status)}`}>
            
            {/* Interactive Toggle Checkbox */}
            <button 
              className="milestone-checkbox-btn"
              onClick={() => onToggleMilestone && onToggleMilestone(milestone.name)}
              title={`Mark ${milestone.status === 'Completed' ? 'In Progress' : 'Completed'}`}
            >
              {getStatusIcon(milestone.status)}
            </button>

            {/* Title & Description */}
            <div className="milestone-content-block">
              <span className="milestone-name-lbl">{milestone.name}</span>
              <span className="milestone-status-badge">{milestone.status}</span>
            </div>

            {/* Progress Indicators */}
            <div className="milestone-progress-block">
              <div className="milestone-progress-lbl">
                <span>Phase Progress</span>
                <span className="milestone-progress-val">{milestone.progress}%</span>
              </div>
              <div className="milestone-progress-track">
                <div 
                  className={`milestone-progress-fill ${milestone.status === 'Completed' ? 'fill-completed' : milestone.status === 'In Progress' ? 'fill-inprogress' : 'fill-notstarted'}`}
                  style={{ width: `${milestone.progress}%` }}
                />
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
