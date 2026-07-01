import React, { useRef } from 'react';
import * as Icons from 'lucide-react';
import './ResumeSection.css';

export default function ResumeSection({ resume, isEditing, onUploadSimulate, readOnly }) {
  const FileTextIcon = Icons.FileText;
  const DownloadIcon = Icons.Download;
  const UploadCloudIcon = Icons.UploadCloud;
  const Trash2Icon = Icons.Trash2;

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const today = new Date();
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-GB', options);
      
      onUploadSimulate(file.name, formattedDate);
    }
  };

  const handleRemoveResume = () => {
    onUploadSimulate("", ""); // Empty filename updates the completion percentage dynamically
  };

  const handleMockDownload = () => {
    if (resume.resumeName) {
      alert(`Mock Download: Downloading "${resume.resumeName}"...`);
    }
  };

  return (
    <div className={`resume-section-card ${isEditing ? 'card-editing-mode' : ''}`}>
      <div className="resume-header">
        <h3 className="section-card-title">Resume</h3>
        {isEditing && <span className="action-hint transition-fade">Replace enabled</span>}
      </div>

      <div className="resume-card-body">
        {resume.resumeName ? (
          <div className="resume-file-info-row">
            {/* File Icon */}
            <div className="file-icon-box">
              <FileTextIcon size={28} className="file-pdf-icon" />
            </div>

            {/* File Meta */}
            <div className="file-meta-box">
              <h4 className="file-name">{resume.resumeName}</h4>
              <span className="file-date">Uploaded on {resume.uploadedDate}</span>
            </div>

            {/* Actions Grid */}
            <div className="resume-actions-group">
              <button
                type="button"
                className="resume-btn download-btn"
                onClick={handleMockDownload}
                title="Download Resume"
              >
                <DownloadIcon size={16} />
                <span>Download</span>
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="resume-btn remove-resume-btn transition-fade"
                  onClick={handleRemoveResume}
                  title="Remove Resume"
                >
                  <Trash2Icon size={16} />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="no-resume-box transition-fade">
            <FileTextIcon size={32} className="no-resume-icon" />
            <p className="no-resume-text">
              {readOnly ? "No resume uploaded." : "No resume uploaded. Switch to Edit Mode to upload."}
            </p>
          </div>
        )}

        {/* Upload/Replace Button */}
        {!readOnly && (
          <div className="upload-action-box">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className={`resume-btn upload-trigger-btn ${isEditing ? 'active' : 'disabled'}`}
              onClick={handleUploadClick}
              disabled={!isEditing}
            >
              <UploadCloudIcon size={16} />
              <span>{resume.resumeName ? 'Replace Resume' : 'Upload New Resume'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
