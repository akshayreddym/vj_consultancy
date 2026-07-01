import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { ArrowLeft, Calendar, FileText, ChevronRight, CheckCircle, Clock, XCircle } from 'lucide-react';
import './ApplicantsList.css';

export default function ApplicantsList({
  project,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onViewDetails,
  onBackToProjects
}) {
  if (!project) return null;

  // Filter applicants by search query (name, branch, skills) and status filter
  const filteredApplicants = project.applicants.filter(applicant => {
    // 1. Search Query Filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      applicant.profile.name.toLowerCase().includes(query) ||
      applicant.profile.branch.toLowerCase().includes(query) ||
      applicant.profile.skills.some(skill => skill.toLowerCase().includes(query));

    // 2. Status Filter
    const matchesStatus = statusFilter === 'All' || applicant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate status counts
  const totalCount = project.applicants.length;
  const appliedCount = project.applicants.filter(a => a.status === 'Applied').length;
  const shortlistedCount = project.applicants.filter(a => a.status === 'Shortlisted').length;
  const rejectedCount = project.applicants.filter(a => a.status === 'Rejected').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied':
        return (
          <span className="badge-status badge-applied">
            <Clock className="badge-icon" />
            Applied
          </span>
        );
      case 'Shortlisted':
        return (
          <span className="badge-status badge-shortlisted">
            <CheckCircle className="badge-icon" />
            Shortlisted
          </span>
        );
      case 'Rejected':
        return (
          <span className="badge-status badge-rejected">
            <XCircle className="badge-icon" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="applicants-list-container">
      {/* Back navigation */}
      <button className="back-nav-btn" onClick={onBackToProjects}>
        <ArrowLeft className="back-icon" />
        <span>Back to Projects</span>
      </button>

      {/* Project Summary Card */}
      <div className="project-summary-card">
        <div className="summary-left">
          <h2 className="project-summary-title">{project.name}</h2>
          <div className="project-meta-grid">
            <div className="meta-item">
              <span className="meta-label">Domain:</span>
              <span className="meta-val-badge">{project.domain}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Deadline:</span>
              <span className="meta-val">
                <Calendar className="meta-icon" />
                {project.deadline}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Total Applications:</span>
              <span className="meta-val">
                <FileText className="meta-icon" />
                {totalCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Row */}
      <div className="filters-control-card">
        {/* Status Pills Filter */}
        <div className="status-filter-pills">
          <button
            className={`pill-btn ${statusFilter === 'All' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('All')}
          >
            All <span className="pill-count">{totalCount}</span>
          </button>
          <button
            className={`pill-btn pill-applied ${statusFilter === 'Applied' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('Applied')}
          >
            Applied <span className="pill-count">{appliedCount}</span>
          </button>
          <button
            className={`pill-btn pill-shortlisted ${statusFilter === 'Shortlisted' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('Shortlisted')}
          >
            Shortlisted <span className="pill-count">{shortlistedCount}</span>
          </button>
          <button
            className={`pill-btn pill-rejected ${statusFilter === 'Rejected' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('Rejected')}
          >
            Rejected <span className="pill-count">{rejectedCount}</span>
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by student, branch, or skill..."
        />
      </div>

      {/* Applicants Table */}
      {filteredApplicants.length === 0 ? (
        <div className="no-applicants-found">
          <p>No applicants found matching the search criteria or selected status filter.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Shortlisted On</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => (
                <tr key={applicant.id} className="table-row-hover">
                  <td className="student-profile-cell">
                    <img
                      src={applicant.profile.photo}
                      alt={applicant.profile.name}
                      className="student-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(applicant.profile.name)}&background=7C3AED&color=fff`;
                      }}
                    />
                    <div className="student-info-meta">
                      <span className="student-name-text">{applicant.profile.name}</span>
                      <span className="student-branch-text">
                        {applicant.profile.branch} • {applicant.profile.year}
                      </span>
                    </div>
                  </td>
                  <td className="applied-date-cell">
                    {applicant.appliedOn}
                  </td>
                  <td>
                    {getStatusBadge(applicant.status)}
                  </td>
                  <td className="shortlisted-date-cell">
                    {applicant.shortlistedOn ? applicant.shortlistedOn : '—'}
                  </td>
                  <td className="text-right">
                    <button
                      className="view-details-btn"
                      onClick={() => onViewDetails(applicant.id)}
                    >
                      <span>View Details</span>
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
