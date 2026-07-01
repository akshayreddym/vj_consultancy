import React, { useRef } from 'react';
import * as Icons from 'lucide-react';
import './ProfileHeader.css';

export default function ProfileHeader({ profile, isEditing, onChange, onEditClick, onSave, onCancel, readOnly }) {
  const MailIcon = Icons.Mail;
  const PhoneIcon = Icons.Phone;
  const MapPinIcon = Icons.MapPin;
  const GraduationCapIcon = Icons.GraduationCap;
  const CameraIcon = Icons.Camera;
  const EditIcon = Icons.Edit;

  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      onChange('profilePhoto', previewUrl);
    }
  };

  return (
    <div className={`profile-header-card ${isEditing ? 'card-editing-mode' : ''}`}>
      <div className="profile-header-main">
        {/* Profile Avatar Container */}
        <div 
          className={`profile-avatar-container ${isEditing ? 'editable-avatar' : ''}`}
          onClick={handleAvatarClick}
        >
          <img
            src={profile.profilePhoto || "/student_profile_photo.png"}
            alt={profile.fullName || "Student Profile"}
            className="profile-avatar-img"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'flex';
              }
            }}
          />
          <div className="profile-avatar-fallback" style={{ display: 'none' }}>
            {profile.fullName ? profile.fullName.split(' ').map(n => n[0]).join('') : 'SP'}
          </div>
          
          {isEditing && (
            <>
              <div className="profile-avatar-overlay">
                <CameraIcon size={20} className="avatar-camera-icon" />
                <span>Change Photo</span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*"
                style={{ display: 'none' }}
              />
            </>
          )}
        </div>

        {/* Profile Details Content */}
        <div className="profile-details-content">
          <div className="profile-name-row">
            {isEditing ? (
              <div className="profile-edit-input-group transition-fade">
                <input
                  type="text"
                  value={profile.fullName || ''}
                  onChange={(e) => onChange('fullName', e.target.value)}
                  placeholder="Full Name"
                  className="profile-input-name"
                />
                <input
                  type="text"
                  value={profile.role || ''}
                  onChange={(e) => onChange('role', e.target.value)}
                  placeholder="Role (e.g., Full Stack Web Developer)"
                  className="profile-input-role"
                />
              </div>
            ) : (
              <>
                <h2 className="profile-display-name">{profile.fullName || 'No Name Provided'}</h2>
                <span className="profile-role-badge">{profile.role || 'Student'}</span>
              </>
            )}
          </div>

          {/* Contact & Education details grid */}
          <div className="profile-quick-info-grid">
            <div className="quick-info-item">
              <MailIcon size={16} className="info-icon" />
              <span className="info-text">{profile.email}</span>
            </div>

            <div className="quick-info-item">
              <PhoneIcon size={16} className="info-icon" />
              {isEditing ? (
                <input
                  type="text"
                  value={profile.phone || ''}
                  onChange={(e) => onChange('phone', e.target.value)}
                  placeholder="Phone Number"
                  className="profile-inline-input transition-fade"
                />
              ) : (
                <span className="info-text">{profile.phone || 'Not provided'}</span>
              )}
            </div>

            <div className="quick-info-item">
              <MapPinIcon size={16} className="info-icon" />
              {isEditing ? (
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => onChange('location', e.target.value)}
                  placeholder="Location"
                  className="profile-inline-input transition-fade"
                />
              ) : (
                <span className="info-text">{profile.location || 'Not provided'}</span>
              )}
            </div>

            <div className="quick-info-item">
              <GraduationCapIcon size={16} className="info-icon" />
              {isEditing ? (
                <input
                  type="text"
                  value={profile.educationSummary || ''}
                  onChange={(e) => onChange('educationSummary', e.target.value)}
                  placeholder="Education Summary"
                  className="profile-inline-input transition-fade"
                />
              ) : (
                <span className="info-text">{profile.educationSummary || 'Not provided'}</span>
              )}
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        {!readOnly && (
          <div className="header-actions-container">
            {isEditing ? (
              <div className="header-actions-group transition-fade">
                <button
                  type="button"
                  className="header-action-btn cancel-btn-purple"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="header-action-btn save-btn-purple"
                  onClick={onSave}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="edit-profile-btn"
                onClick={onEditClick}
              >
                <EditIcon size={16} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* About Me Details */}
      <div className="profile-about-section">
        <h3 className="section-title-small">About Me</h3>
        {isEditing ? (
          <textarea
            value={profile.aboutMe || ''}
            onChange={(e) => onChange('aboutMe', e.target.value)}
            placeholder="Write a brief professional description about yourself..."
            className="profile-textarea-about transition-fade"
            rows={4}
          />
        ) : (
          <p className="profile-about-text">
            {profile.aboutMe || "Write something about yourself in Edit Mode."}
          </p>
        )}
      </div>
    </div>
  );
}
