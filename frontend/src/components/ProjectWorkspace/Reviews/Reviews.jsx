import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, XCircle, Send, AlertCircle } from 'lucide-react';
import './Reviews.css';

export default function Reviews({ project, reviewingDocId, onSelectDoc, onCommitReview }) {
  const { documents = [] } = project || {};
  const safeDocs = documents || [];

  // Track comments text in local state
  const [comments, setComments] = useState('');

  // Selected document instance
  const selectedDoc = safeDocs.find(d => d.id === reviewingDocId);

  // Sync comments field when selected document changes
  useEffect(() => {
    if (selectedDoc) {
      setComments(selectedDoc.comments || '');
    } else {
      setComments('');
    }
  }, [reviewingDocId, selectedDoc]);

  const handleSubmitReview = (status) => {
    if (!selectedDoc) return;
    if (status === 'Changes Requested' && comments.trim().length === 0) {
      alert("Please specify what changes are required in the comments field.");
      return;
    }
    
    // Commit to parent state
    onCommitReview(selectedDoc.id, comments, status);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="review-status-pill approved-badge"><CheckCircle className="badge-icon" /> Approved</span>;
      case 'Pending Review':
        return <span className="review-status-pill pending-badge"><Clock className="badge-icon" /> Pending Review</span>;
      case 'Changes Requested':
        return <span className="review-status-pill changes-badge"><XCircle className="badge-icon" /> Changes Requested</span>;
      default:
        return <span className="review-status-pill">{status}</span>;
    }
  };

  return (
    <div className="workspace-reviews-tab">
      <div className="reviews-workspace-grid">
        
        {/* Left Side: Documents Queue */}
        <div className="reviews-queue-card">
          <h3 className="reviews-card-title">Review Queue</h3>
          {safeDocs.length === 0 ? (
            <div className="no-review-items">
              <AlertCircle className="no-reviews-icon" />
              <span>No documents available.</span>
            </div>
          ) : (
            <div className="reviews-queue-list">
              {safeDocs.map((doc) => (
                <button
                  key={doc.id}
                  className={`review-queue-item ${reviewingDocId === doc.id ? 'active' : ''}`}
                  onClick={() => onSelectDoc && onSelectDoc(doc.id)}
                >
                  <FileText className="review-file-icon" />
                  <div className="review-item-meta">
                    <span className="review-item-name" title={doc.name}>{doc.name}</span>
                    <div className="review-item-sub">
                      <span>By {doc.uploadedBy}</span>
                      <span className="dot-sep">•</span>
                      <span>{doc.milestone}</span>
                    </div>
                  </div>
                  <span className={`item-mini-badge ${doc.status === 'Approved' ? 'bg-green' : doc.status === 'Changes Requested' ? 'bg-red' : 'bg-blue'}`}>
                    {doc.status === 'Pending Review' ? 'Pending' : doc.status.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Active Review Panel */}
        <div className="review-panel-card">
          {selectedDoc ? (
            <div className="active-review-workspace">
              <div className="review-header-details">
                <div className="review-header-top">
                  <h3 className="review-doc-name">{selectedDoc.name}</h3>
                  {getStatusBadge(selectedDoc.status)}
                </div>
                
                <div className="review-doc-meta-grid">
                  <div className="meta-detail-box">
                    <span className="meta-detail-lbl">Uploaded By</span>
                    <span className="meta-detail-val">{selectedDoc.uploadedBy}</span>
                  </div>
                  <div className="meta-detail-box">
                    <span className="meta-detail-lbl">Upload Date</span>
                    <span className="meta-detail-val">{selectedDoc.uploadDate}</span>
                  </div>
                  <div className="meta-detail-box">
                    <span className="meta-detail-lbl">Milestone Target</span>
                    <span className="meta-detail-val">{selectedDoc.milestone}</span>
                  </div>
                </div>
              </div>

              {/* Coordinator Comments form */}
              <div className="review-comments-form">
                <div className="comments-lbl-row">
                  <label className="comments-input-lbl">Coordinator Review Feedback</label>
                  <span className="comments-char-count">{comments.length} / 500 chars</span>
                </div>
                
                <textarea
                  className="comments-textarea"
                  value={comments}
                  onChange={(e) => setComments(e.target.value.slice(0, 500))}
                  placeholder="Enter detailed feedback. Provide clear instructions if requesting changes or specify validation notes on approval..."
                  rows={6}
                />

                <div className="review-action-row">
                  <button 
                    className="btn-review-changes"
                    onClick={() => handleSubmitReview('Changes Requested')}
                  >
                    <XCircle className="btn-icon" />
                    <span>Request Changes</span>
                  </button>

                  <button 
                    className="btn-review-approve"
                    onClick={() => handleSubmitReview('Approved')}
                  >
                    <CheckCircle className="btn-icon" />
                    <span>Approve Deliverable</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="empty-review-placeholder">
              <FileText className="placeholder-icon" />
              <h4 className="placeholder-title">Select a Document to Review</h4>
              <p className="placeholder-subtitle">Choose any file from the review queue on the left to start evaluating deliverables.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
