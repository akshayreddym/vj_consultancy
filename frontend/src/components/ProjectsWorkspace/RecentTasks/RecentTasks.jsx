import React from 'react';
import './RecentTasks.css';

const TASKS = [
  { id: 1, task: 'Design Database Schema', assignee: 'Anita Sharma', status: 'Completed', dueDate: '15 Jun 2026' },
  { id: 2, task: 'User Authentication Module', assignee: 'Rahul Iyer', status: 'Completed', dueDate: '20 Jun 2026' },
  { id: 3, task: 'Dashboard UI', assignee: 'Anita Sharma', status: 'In Progress', dueDate: '05 Jul 2026' },
  { id: 4, task: 'Student Management Module', assignee: 'Rahul Iyer', status: 'In Progress', dueDate: '15 Jul 2026' },
  { id: 5, task: 'Fee Management Module', assignee: 'Anita Sharma', status: 'Pending', dueDate: '30 Jul 2026' }
];

export default function RecentTasks() {
  const getBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'badge-completed';
      case 'in progress':
        return 'badge-in-progress';
      case 'pending':
        return 'badge-pending';
      default:
        return '';
    }
  };

  return (
    <div className="recent-tasks-container">
      <h3 className="workspace-section-title">Tasks</h3>
      <div className="tasks-table-wrapper">
        <table className="tasks-table">
          <thead>
            <tr>
              <th className="task-col">Task</th>
              <th className="assignee-col">Assigned To</th>
              <th className="status-col">Status</th>
              <th className="due-col">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {TASKS.map((item) => (
              <tr key={item.id} className="task-row">
                <td className="task-name">{item.task}</td>
                <td className="task-assignee">{item.assignee}</td>
                <td>
                  <span className={`status-badge-task ${getBadgeClass(item.status)}`}>
                    <span className="status-badge-dot"></span>
                    {item.status}
                  </span>
                </td>
                <td className="task-due-date">{item.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
