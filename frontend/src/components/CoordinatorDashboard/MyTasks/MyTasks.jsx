import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import './MyTasks.css';

export default function MyTasks({ tasks }) {
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h3 className="tasks-title">My Tasks</h3>
        <span className="tasks-count">{tasks.length} Pending</span>
      </div>
      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-row">
            <div className="task-left-section">
              <div className="task-checkbox-mock">
                <CheckCircle className="task-check-icon" />
              </div>
              <div className="task-info">
                <h4 className="task-name">{task.name}</h4>
                <div className="task-meta">
                  <span className="task-project-name">{task.projectName}</span>
                  <span className="task-meta-dot">•</span>
                  <div className="task-due-date">
                    <Calendar className="task-calendar-icon" />
                    <span>Due: {task.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="task-right-section">
              <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
