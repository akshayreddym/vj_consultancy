import React from 'react';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import './ApplicationsTable.css';

export default function ApplicationsTable({ applications, onViewDetails }) {
  return (
    <div className="applications-table-container">
      <table className="applications-table">
        <thead>
          <tr>
            <th className="col-project-app">Project</th>
            <th className="col-applied-app">Applied</th>
            <th className="col-status-app">Status</th>
            <th className="col-updated-app">Last Updated</th>
            <th className="col-action-app">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <ApplicationRow
              key={app.id}
              application={app}
              onViewDetails={onViewDetails}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
