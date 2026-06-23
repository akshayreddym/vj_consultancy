import './ActivityList.css';

export default function ActivityList({ activities = [] }) {
  return (
    <div className="activity-card">
      <div className="activity-card-header">
        <h3 className="activity-card-title">Recent Activities</h3>
        <span className="activity-count-badge">{activities.length} total</span>
      </div>
      
      {activities.length === 0 ? (
        <div className="activity-empty">No recent activity found.</div>
      ) : (
        <div className="activity-timeline">
          {activities.map((activity, index) => (
            <div className="activity-item" key={activity.id || index}>
              <div className="activity-marker-container">
                <div className="activity-marker-dot"></div>
                {index !== activities.length - 1 && <div className="activity-marker-line"></div>}
              </div>
              <div className="activity-content">
                <span className="activity-text">{activity.title}</span>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
