import React from 'react';
import { FileText, Calendar, Eye, Download, CheckCircle, Clock, XCircle } from 'lucide-react';
import './Documents.css';

export default function Documents({ documents = [], onReview }) {
  const safeDocs = documents || [];
  if (safeDocs.length === 0) {
    return (
      <div className="empty-documents-view">
        <p className="empty-view-text">No documents uploaded to this workspace yet.</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="doc-status-badge doc-approved">
            <CheckCircle className="badge-status-icon" />
            Approved
          </span>
        );
      case 'Pending Review':
        return (
          <span className="doc-status-badge doc-pending">
            <Clock className="badge-status-icon" />
            Pending Review
          </span>
        );
      case 'Changes Requested':
        return (
          <span className="doc-status-badge doc-changes">
            <XCircle className="badge-status-icon" />
            Changes Requested
          </span>
        );
      default:
        return <span className="doc-status-badge">{status}</span>;
    }
  };

  const handleDownload = (docName) => {
    alert(`Mock file download: ${docName} download requested. files are simulated on client-side.`);
  };

  return (
    <div className="workspace-documents-tab">
      <h2 className="documents-tab-title">Uploaded Consultancy Assets</h2>
      
      <div className="table-responsive">
        <table className="modern-documents-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Uploaded By</th>
              <th>Upload Date</th>
              <th>Milestone Phase</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {safeDocs.map((doc) => (
              <tr key={doc.id} className="table-row-hover">
                <td className="doc-name-cell">
                  <FileText className="doc-file-icon" />
                  <span className="doc-title-text" title={doc.name}>
                    {doc.name}
                  </span>
                </td>
                <td>{doc.uploadedBy}</td>
                <td className="doc-date-cell">
                  <Calendar className="date-icon" />
                  <span>{doc.uploadDate}</span>
                </td>
                <td>
                  <span className="doc-milestone-pill">{doc.milestone}</span>
                </td>
                <td>
                  {getStatusBadge(doc.status)}
                </td>
                <td className="text-right">
                  <div className="doc-actions-row">
                    <button 
                      className="doc-action-btn doc-review-btn"
                      onClick={() => onReview && onReview(doc.id)}
                      title="Review Document"
                    >
                      <Eye className="btn-action-icon" />
                      <span>Review</span>
                    </button>
                    <button 
                      className="doc-action-btn doc-download-btn"
                      onClick={() => handleDownload(doc.name)}
                      title="Download Mock File"
                    >
                      <Download className="btn-action-icon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
