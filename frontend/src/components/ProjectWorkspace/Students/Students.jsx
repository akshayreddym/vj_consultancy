import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, Award } from 'lucide-react';
import './Students.css';

export default function Students({ students = [] }) {
  const navigate = useNavigate();
  const safeStudents = students || [];

  if (safeStudents.length === 0) {
    return (
      <div className="empty-students-view">
        <p className="empty-view-text">No students assigned to this project yet.</p>
      </div>
    );
  }

  const handleViewProfile = (selectedStudent) => {
    navigate("/profile", {
      state: {
        student: selectedStudent,
        readOnly: true
      }
    });
  };

  return (
    <div className="workspace-students-tab">
      <h2 className="students-tab-title">Assigned Consultancy Team</h2>
      
      <div className="students-cards-grid">
        {safeStudents.map((student) => (
          <div key={student.id} className="student-profile-card">
            
            {/* Student Photo */}
            <div className="student-card-avatar-wrap">
              <img
                src={student.photo}
                alt={student.name}
                className="student-card-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=7C3AED&color=fff&size=128`;
                }}
              />
              <div className="student-role-badge">
                <Award className="student-role-icon" />
                <span>{student.role}</span>
              </div>
            </div>

            {/* Student Name */}
            <div className="student-card-meta">
              <h3 className="student-card-name">{student.name}</h3>
              <span className="student-card-inst">VJTI Coordinator Student</span>
            </div>

            {/* Individual Progress */}
            <div className="student-progress-section">
              <div className="student-progress-lbl">
                <span>Task Contribution</span>
                <span className="student-progress-val">{student.progress}%</span>
              </div>
              <div className="student-progress-track">
                <div 
                  className="student-progress-fill" 
                  style={{ width: `${student.progress}%` }}
                />
              </div>
            </div>

            {/* View Profile Action */}
            <button 
              className="student-view-profile-btn" 
              onClick={() => handleViewProfile(student)}
            >
              <Mail className="student-mail-icon" />
              <span>View Profile</span>
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
