import React from 'react';
import { FileText, FileSpreadsheet, FileArchive, File } from 'lucide-react';
import './PendingReviews.css';

export default function PendingReviews({ reviews }) {
  // Helper to determine the right icon based on file extension
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf':
        return <FileText className="file-type-icon icon-pdf" />;
      case 'docx':
      case 'doc':
        return <FileText className="file-type-icon icon-doc" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="file-type-icon icon-xls" />;
      case 'zip':
      case 'rar':
        return <FileArchive className="file-type-icon icon-zip" />;
      default:
        return <File className="file-type-icon" />;
    }
  };

  const handleReviewClick = (filename) => {
    alert(`Opening review drawer for: ${filename}`);
  };

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h3 className="reviews-title">Pending Reviews</h3>
        <span className="reviews-badge">{reviews.length} Files</span>
      </div>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-row">
            <div className="review-left">
              <div className="file-icon-wrapper">
                {getFileIcon(review.filename)}
              </div>
              <div className="file-details">
                <h4 className="file-name">{review.filename}</h4>
                <p className="file-meta">
                  Uploaded by <span className="uploader-name">{review.uploadedBy}</span> • {review.time}
                </p>
              </div>
            </div>
            <div className="review-right">
              <button 
                className="review-btn"
                onClick={() => handleReviewClick(review.filename)}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
