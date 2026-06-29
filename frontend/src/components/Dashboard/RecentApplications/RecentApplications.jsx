import React from 'react';
import './RecentApplications.css';

const MOCK_APPLICATIONS = [
  {
    id: 1,
    project: 'College ERP Portal',
    status: 'Shortlisted',
    appliedOn: '20 Jun 2026'
  },
  {
    id: 2,
    project: 'Student Feedback System',
    status: 'Interview Scheduled',
    appliedOn: '18 Jun 2026'
  },
  {
    id: 3,
    project: 'Event Management System',
    status: 'Under Review',
    appliedOn: '15 Jun 2026'
  },
  {
    id: 4,
    project: 'E-Commerce Mobile App',
    status: 'Rejected',
    appliedOn: '10 Jun 2026'
  },
  {
    id: 5,
    project: 'Hospital Management Dashboard',
    status: 'Selected',
    appliedOn: '05 Jun 2026'
  },
  {
    id: 6,
    project: 'Smart Traffic Controller',
    status: 'Applied',
    appliedOn: '02 Jun 2026'
  }
];

const getStatusClass = (status) => {
  switch (status) {
    case 'Applied':
      return 'badge-applied';
    case 'Under Review':
      return 'badge-under-review';
    case 'Shortlisted':
      return 'badge-shortlisted';
    case 'Interview Scheduled':
      return 'badge-interview';
    case 'Rejected':
      return 'badge-rejected';
    case 'Selected':
      return 'badge-selected';
    default:
      return 'badge-default';
  }
};

export default function RecentApplications() {
  return (
    <div className="recent-apps-card">
      <div className="recent-apps-header">
        <h2 className="recent-apps-title">Recent Applications</h2>
        <button className="view-all-btn" type="button">View All</button>
      </div>
      
      <div className="table-responsive-wrapper">
        <table className="apps-table">
          <thead>
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Status</th>
              <th scope="col">Applied On</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_APPLICATIONS.map((app) => (
              <tr key={app.id}>
                <td className="project-name-cell">{app.project}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="date-cell">{app.appliedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
