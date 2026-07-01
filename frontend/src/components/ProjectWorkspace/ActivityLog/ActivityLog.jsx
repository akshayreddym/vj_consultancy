import React from 'react';
import { UploadCloud, CheckCircle, AlertTriangle, Play, Award } from 'lucide-react';
import './ActivityLog.css';

export default function ActivityLog({ activityLog = [] }) {
  const safeLog = activityLog || [];
  if (safeLog.length === 0) {
    return (
      <div className="empty-activity-view">
        <p className="empty-view-text">No activity recorded for this workspace yet.</p>
      </div>
    );
  }

  const getActivityIcon = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('uploaded')) {
      return (
        <div className="activity-icon-circle upload-circle">
          <UploadCloud className="act-icon" />
        </div>
      );
    } else if (msg.includes('approved')) {
      return (
        <div className="activity-icon-circle approved-circle">
          <CheckCircle className="act-icon" />
        </div>
      );
    } else if (msg.includes('changes requested') || msg.includes('requested changes')) {
      return (
        <div className="activity-icon-circle changes-circle">
          <AlertTriangle className="act-icon" />
        </div>
      );
    } else if (msg.includes('completed') || msg.includes('milestone')) {
      return (
        <div className="activity-icon-circle completed-circle">
          <Award className="act-icon" />
        </div>
      );
    } else {
      return (
        <div className="activity-icon-circle default-circle">
          <Play className="act-icon" />
        </div>
      );
    }
  };

  return (
    <div className="workspace-activity-tab">
      <h2 className="activity-tab-title">Project Activity Timeline</h2>

      <div className="timeline-container">
        {safeLog.map((log, index) => (
          <div key={log.id || index} className="timeline-item">
            
            {/* Left timeline icon column */}
            <div className="timeline-left-col">
              {getActivityIcon(log.message)}
              {index < activityLog.length - 1 && <div className="timeline-line-connector" />}
            </div>

            {/* Right timeline details column */}
            <div className="timeline-right-col">
              <div className="timeline-bubble-content">
                <p className="timeline-message-text">{log.message}</p>
                <span className="timeline-time-label">{log.timestamp}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
