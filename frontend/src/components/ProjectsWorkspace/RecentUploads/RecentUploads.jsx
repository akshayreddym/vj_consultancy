import React, { useState, useRef } from 'react';
import { Download, MoreVertical, FileText, FileImage, FileCode, UploadCloud } from 'lucide-react';
import './RecentUploads.css';

const INITIAL_FILES = [
  { id: 1, name: 'Dashboard_UI.pdf', size: '2.4 MB', time: '2 hours ago' },
  { id: 2, name: 'Database_Schema.sql', size: '1.2 MB', time: '1 day ago' },
  { id: 3, name: 'API_Documentation.docx', size: '850 KB', time: '3 days ago' },
  { id: 4, name: 'ER_Diagram.png', size: '3.1 MB', time: '4 days ago' },
  { id: 5, name: 'Project_Proposal.pdf', size: '1.5 MB', time: '1 week ago' }
];

export default function RecentUploads({ showDragDrop = true }) {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const getFileIcon = (name) => {
    const ext = name.split('.').pop().toLowerCase();
    if (ext === 'pdf' || ext === 'docx' || ext === 'doc') {
      return <FileText className="file-type-icon text-red" size={18} />;
    } else if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {
      return <FileImage className="file-type-icon text-blue" size={18} />;
    } else {
      return <FileCode className="file-type-icon text-purple" size={18} />;
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (uploadedList) => {
    const newFiles = [];
    for (let i = 0; i < uploadedList.length; i++) {
      const file = uploadedList[i];
      // Format file size
      let sizeStr = '';
      if (file.size < 1024 * 1024) {
        sizeStr = `${Math.round(file.size / 1024)} KB`;
      } else {
        sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      }
      
      newFiles.push({
        id: Date.now() + i,
        name: file.name,
        size: sizeStr,
        time: 'Just now'
      });
    }
    setFiles([...newFiles, ...files]);
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="recent-uploads-container">
      <h3 className="workspace-section-title">Project Uploads</h3>

      {showDragDrop && (
        <div 
          className={`drag-drop-zone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            ref={fileInputRef}
            type="file" 
            className="file-upload-input" 
            multiple={true} 
            onChange={handleChange}
          />
          <div className="upload-prompt-wrapper">
            <UploadCloud size={36} className="upload-cloud-icon" />
            <p className="upload-prompt-text">
              Drag and drop your project files here, or <span className="browse-link" onClick={onButtonClick}>browse</span>
            </p>
            <span className="upload-formats-subtext">
              Supported formats: PDF, SQL, DOCX, PNG, ZIP (Max 10MB)
            </span>
          </div>
        </div>
      )}

      <div className="uploads-table-wrapper">
        <table className="uploads-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Size</th>
              <th>Uploaded</th>
              <th className="uploads-action-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="upload-row">
                <td className="file-name-cell">
                  <div className="file-info-box">
                    {getFileIcon(file.name)}
                    <span className="file-name-text">{file.name}</span>
                  </div>
                </td>
                <td className="file-size-text">{file.size}</td>
                <td className="file-time-text">{file.time}</td>
                <td>
                  <div className="upload-actions-wrapper">
                    <button className="upload-action-btn" title="Download file" type="button">
                      <Download size={16} />
                    </button>
                    <button className="upload-action-btn" title="More options" type="button">
                      <MoreVertical size={16} />
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
