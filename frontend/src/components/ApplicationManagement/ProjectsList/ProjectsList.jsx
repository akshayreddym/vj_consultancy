import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Calendar, ChevronRight, Briefcase } from 'lucide-react';
import './ProjectsList.css';

export default function ProjectsList({ projects, searchQuery, onSearchChange, onViewApplicants }) {
  // Filter projects by name
  const filteredProjects = projects.filter(project => {
    const query = searchQuery.toLowerCase();
    return project.name.toLowerCase().includes(query);
  });

  return (
    <div className="projects-list-container">
      <div className="list-header-row">
        <h2 className="section-title">Projects</h2>
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search projects..."
        />
      </div>

      {filteredProjects.length === 0 ? (
        <div className="no-search-results">
          <p>No projects match your search criteria. Try a different query.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th className="text-center">Applications</th>
                <th>Deadline</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="table-row-hover">
                  <td className="project-name-cell">
                    <div className="project-icon-wrapper">
                      <Briefcase className="project-cell-icon" />
                    </div>
                    <span className="project-title-text" title={project.name}>
                      {project.name}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="applications-count-badge">
                      {project.applicants.length}
                    </span>
                  </td>
                  <td className="deadline-cell">
                    <Calendar className="cell-date-icon" />
                    <span>{project.deadline}</span>
                  </td>
                  <td>
                    <span className={`status-pill ${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      className="view-applicants-btn"
                      onClick={() => onViewApplicants(project.id)}
                    >
                      <span>View Applicants</span>
                      <ChevronRight className="btn-chevron-icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
