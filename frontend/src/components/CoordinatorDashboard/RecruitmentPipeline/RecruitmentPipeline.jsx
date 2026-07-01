import React from 'react';
import { UserPlus, UserCheck, ClipboardCheck, Briefcase } from 'lucide-react';
import './RecruitmentPipeline.css';

export default function RecruitmentPipeline({ stages }) {
  const getStageIcon = (id) => {
    switch (id) {
      case 'apps':
        return <UserPlus className="pipeline-icon" />;
      case 'short':
        return <UserCheck className="pipeline-icon" />;
      case 'eval':
        return <ClipboardCheck className="pipeline-icon" />;
      case 'assign':
        return <Briefcase className="pipeline-icon" />;
      default:
        return <UserPlus className="pipeline-icon" />;
    }
  };

  return (
    <div className="pipeline-container">
      <h3 className="pipeline-title">Recruitment Pipeline</h3>
      <div className="pipeline-flow">
        {stages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div className="pipeline-stage-item">
              <div className={`pipeline-circle-badge badge-${stage.color}`}>
                {getStageIcon(stage.id)}
              </div>
              <div className="pipeline-stage-details">
                <span className="pipeline-stage-name">{stage.name}</span>
                <span className="pipeline-stage-count">{stage.count}</span>
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="pipeline-connector-line">
                <div className="line-inner"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
