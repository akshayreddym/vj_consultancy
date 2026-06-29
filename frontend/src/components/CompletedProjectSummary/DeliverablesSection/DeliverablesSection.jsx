import React from 'react';
import { Download, FileText, FileCode, FileImage } from 'lucide-react';
import './DeliverablesSection.css';

export default function DeliverablesSection({ deliverables }) {
  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="deliverable-icon-file text-red" size={18} />;
      case 'zip':
        return <FileCode className="deliverable-icon-file text-orange" size={18} />;
      case 'png':
        return <FileImage className="deliverable-icon-file text-blue" size={18} />;
      case 'pptx':
        return <FileText className="deliverable-icon-file text-yellow" size={18} />;
      default:
        return <FileText className="deliverable-icon-file text-gray" size={18} />;
    }
  };

  return (
    <div className="deliverables-section-container">
      <h3 className="overview-section-title">Submitted Deliverables</h3>
      <div className="deliverables-table-wrapper">
        <table className="deliverables-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Type</th>
              <th>File Size</th>
              <th>Submitted On</th>
              <th className="action-col-summary">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliverables.map((item, index) => (
              <tr key={index} className="deliverable-row">
                <td className="file-name-cell-summary">
                  <div className="file-info-summary">
                    {getFileIcon(item.type)}
                    <span className="file-name-txt-summary">{item.name}</span>
                  </div>
                </td>
                <td className="uppercase-text">{item.type}</td>
                <td className="size-text-summary">{item.size}</td>
                <td className="date-text-summary">{item.submittedOn}</td>
                <td>
                  <div className="action-cell-wrapper-summary">
                    <button className="summary-download-btn" title="Download file" type="button">
                      <Download size={16} />
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
