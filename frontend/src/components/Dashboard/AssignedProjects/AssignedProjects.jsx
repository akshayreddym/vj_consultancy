import React from 'react';
import './AssignedProjects.css';

const MOCK_ASSIGNED_PROJECTS = [
  {
    id: 1,
    project: 'College ERP Portal',
    status: 'In Progress',
    progress: 75,
    deadline: '15 Jul 2026',
    priority: 'High'
  },
  {
    id: 2,
    project: 'Student Feedback System',
    status: 'In Progress',
    progress: 30,
    deadline: '30 Jul 2026',
    priority: 'Medium'
  }
];

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'High':
      return 'priority-high';
    case 'Medium':
      return 'priority-medium';
    case 'Low':
      return 'priority-low';
    default:
      return 'priority-default';
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 'In Progress':
      return 'status-in-progress';
    case 'Planning':
      return 'status-planning';
    case 'Completed':
      return 'status-completed';
    default:
      return 'status-default';
  }
};

export default function AssignedProjects() {
  return (
    <div className="assigned-projects-card">
      <div className="assigned-projects-header">
        <h2 className="assigned-projects-title">Assigned Projects</h2>
        <button className="view-all-btn" type="button">View All</button>
      </div>
      
      <div className="table-responsive-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Status</th>
              <th scope="col">Progress</th>
              <th scope="col">Deadline</th>
              <th scope="col">Priority</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ASSIGNED_PROJECTS.map((proj) => (
              <tr key={proj.id}>
                <td className="project-name-cell">{proj.project}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(proj.status)}`}>
                    {proj.status}
                  </span>
                </td>
                <td>
                  <div className="progress-container">
                    <div className="progress-bar-wrapper">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-percentage">{proj.progress}%</span>
                  </div>
                </td>
                <td className="deadline-cell">{proj.deadline}</td>
                <td>
                  <span className={`priority-badge ${getPriorityClass(proj.priority)}`}>
                    {proj.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
