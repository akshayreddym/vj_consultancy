import React from 'react';
import ProjectsRow from '../ProjectsRow/ProjectsRow';
import './ProjectsTable.css';

export default function ProjectsTable({ projects, onOpenProject }) {
  return (
    <div className="projects-table-container">
      <table className="projects-table">
        <thead>
          <tr>
            <th className="col-project">Project</th>
            <th className="col-domain">Domain</th>
            <th className="col-status">Status</th>
            <th className="col-progress">Progress</th>
            <th className="col-deadline">Deadline</th>
            <th className="col-action">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <ProjectsRow
              key={project.id}
              project={project}
              onOpenProject={onOpenProject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
