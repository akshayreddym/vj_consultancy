import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Calendar, ChevronRight, CheckCircle2, Clock, XCircle, UserCheck } from 'lucide-react';
import './EvaluationQueue.css';

export default function EvaluationQueue({
  candidates,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onSelectCandidate
}) {
  // Filter candidates by search query (name or project) and status filter
  const filteredCandidates = candidates.filter(candidate => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      candidate.profile.name.toLowerCase().includes(query) ||
      candidate.appliedProject.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All' || candidate.evaluationStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate status counts
  const totalCount = candidates.length;
  const pendingCount = candidates.filter(c => c.evaluationStatus === 'Pending').length;
  const passedCount = candidates.filter(c => c.evaluationStatus === 'Passed').length;
  const failedCount = candidates.filter(c => c.evaluationStatus === 'Failed').length;

  const getInterviewStatusBadge = (status) => {
    switch (status) {
      case 'Awaiting Interview':
        return <span className="status-badge interview-awaiting">Awaiting Interview</span>;
      case 'Interview Scheduled':
        return <span className="status-badge interview-scheduled">Interview Scheduled</span>;
      case 'Interview Completed':
        return <span className="status-badge interview-completed">Interview Completed</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const getEvaluationStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="status-badge eval-pending">
            <Clock className="badge-icon" />
            Pending
          </span>
        );
      case 'Passed':
        return (
          <span className="status-badge eval-passed">
            <CheckCircle2 className="badge-icon" />
            Passed
          </span>
        );
      case 'Failed':
        return (
          <span className="status-badge eval-failed">
            <XCircle className="badge-icon" />
            Failed
          </span>
        );
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="eval-queue-container">
      {/* Search and Filters Row */}
      <div className="eval-filters-row">
        <div className="eval-pills">
          <button
            className={`pill-btn ${statusFilter === 'All' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('All')}
          >
            All <span className="pill-count">{totalCount}</span>
          </button>
          <button
            className={`pill-btn pill-pending ${statusFilter === 'Pending' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('Pending')}
          >
            Pending <span className="pill-count">{pendingCount}</span>
          </button>
          <button
            className={`pill-btn pill-passed ${statusFilter === 'Passed' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('Passed')}
          >
            Passed <span className="pill-count">{passedCount}</span>
          </button>
          <button
            className={`pill-btn pill-failed ${statusFilter === 'Failed' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('Failed')}
          >
            Failed <span className="pill-count">{failedCount}</span>
          </button>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by candidate name or project..."
        />
      </div>

      {filteredCandidates.length === 0 ? (
        <div className="no-candidates-found">
          <p>No candidates found matching your criteria. Try another search or filter.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Applied Project</th>
                <th>Shortlisted On</th>
                <th>Interview Status</th>
                <th>Evaluation Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="table-row-hover">
                  <td className="student-profile-cell">
                    <img
                      src={candidate.profile.photo}
                      alt={candidate.profile.name}
                      className="student-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.profile.name)}&background=7C3AED&color=fff`;
                      }}
                    />
                    <div className="student-info-meta">
                      <span className="student-name-text">{candidate.profile.name}</span>
                      <span className="student-branch-text">
                        {candidate.profile.branch} • {candidate.profile.year}
                      </span>
                    </div>
                  </td>
                  <td className="project-cell">
                    <span className="project-title-text" title={candidate.appliedProject}>
                      {candidate.appliedProject}
                    </span>
                  </td>
                  <td className="date-cell">
                    <Calendar className="cell-icon" />
                    <span>{candidate.shortlistedOn}</span>
                  </td>
                  <td>
                    {getInterviewStatusBadge(candidate.interviewStatus)}
                  </td>
                  <td>
                    {getEvaluationStatusBadge(candidate.evaluationStatus)}
                  </td>
                  <td className="text-right">
                    {candidate.evaluationStatus === 'Pending' ? (
                      <button
                        className="action-btn evaluate-btn"
                        onClick={() => onSelectCandidate(candidate.id)}
                      >
                        <span>Evaluate</span>
                        <ChevronRight className="btn-icon" />
                      </button>
                    ) : (
                      <button
                        className="action-btn view-eval-btn"
                        onClick={() => onSelectCandidate(candidate.id)}
                      >
                        <span>View Evaluation</span>
                        <UserCheck className="btn-icon" />
                      </button>
                    )}
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
