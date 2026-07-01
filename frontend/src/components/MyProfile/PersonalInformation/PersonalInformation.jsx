import React from 'react';
import * as Icons from 'lucide-react';
import './PersonalInformation.css';

export default function PersonalInformation({ profile, isEditing, onChange, onSave, onCancel, readOnly }) {
  const UserIcon = Icons.User;
  const MailIcon = Icons.Mail;
  const PhoneIcon = Icons.Phone;
  const CalendarIcon = Icons.Calendar;
  const MapPinIcon = Icons.MapPin;
  const HomeIcon = Icons.Home;
  const FileTextIcon = Icons.FileText;

  return (
    <div className={`personal-info-card ${isEditing ? 'card-editing-mode' : ''}`}>
      <div className="section-header">
        <h3 className="section-card-title">Personal Information</h3>
        {isEditing && <span className="editing-indicator">Editing Mode</span>}
      </div>

      <div className="personal-info-grid">
        {/* Full Name */}
        <div className="info-field-group">
          <label className="field-label">
            <UserIcon size={14} className="label-icon" />
            <span>Full Name</span>
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profile.fullName || ''}
              onChange={(e) => onChange('fullName', e.target.value)}
              className="field-input transition-fade"
              placeholder="Enter full name"
              required
            />
          ) : (
            <div className="field-value">{profile.fullName || '—'}</div>
          )}
        </div>

        {/* Email Address */}
        <div className="info-field-group">
          <label className="field-label">
            <MailIcon size={14} className="label-icon" />
            <span>Email Address</span>
          </label>
          {isEditing ? (
            <input
              type="email"
              value={profile.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              className="field-input transition-fade"
              placeholder="Enter email address"
              required
            />
          ) : (
            <div className="field-value">{profile.email || '—'}</div>
          )}
        </div>

        {/* Phone Number */}
        <div className="info-field-group">
          <label className="field-label">
            <PhoneIcon size={14} className="label-icon" />
            <span>Phone Number</span>
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              className="field-input transition-fade"
              placeholder="Enter phone number"
            />
          ) : (
            <div className="field-value">{profile.phone || '—'}</div>
          )}
        </div>

        {/* Date of Birth */}
        <div className="info-field-group">
          <label className="field-label">
            <CalendarIcon size={14} className="label-icon" />
            <span>Date of Birth</span>
          </label>
          {isEditing ? (
            <input
              type="date"
              value={profile.dob || ''}
              onChange={(e) => onChange('dob', e.target.value)}
              className="field-input transition-fade"
            />
          ) : (
            <div className="field-value">
              {profile.dob ? new Date(profile.dob).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : '—'}
            </div>
          )}
        </div>

        {/* Gender */}
        <div className="info-field-group">
          <label className="field-label">
            <UserIcon size={14} className="label-icon" />
            <span>Gender</span>
          </label>
          {isEditing ? (
            <select
              value={profile.gender || ''}
              onChange={(e) => onChange('gender', e.target.value)}
              className="field-input field-select transition-fade"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <div className="field-value">{profile.gender || '—'}</div>
          )}
        </div>

        {/* Location */}
        <div className="info-field-group">
          <label className="field-label">
            <MapPinIcon size={14} className="label-icon" />
            <span>Location</span>
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => onChange('location', e.target.value)}
              className="field-input transition-fade"
              placeholder="City, Country"
            />
          ) : (
            <div className="field-value">{profile.location || '—'}</div>
          )}
        </div>

        {/* Address */}
        <div className="info-field-group full-width">
          <label className="field-label">
            <HomeIcon size={14} className="label-icon" />
            <span>Address</span>
          </label>
          {isEditing ? (
            <textarea
              value={profile.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
              className="field-input field-textarea transition-fade"
              placeholder="Enter current home address"
              rows={3}
            />
          ) : (
            <div className="field-value address-value">{profile.address || '—'}</div>
          )}
        </div>

        {/* About Me (Shared/synced field inside Personal Info Section as well) */}
        <div className="info-field-group full-width">
          <label className="field-label">
            <FileTextIcon size={14} className="label-icon" />
            <span>About Me</span>
          </label>
          {isEditing ? (
            <textarea
              value={profile.aboutMe || ''}
              onChange={(e) => onChange('aboutMe', e.target.value)}
              className="field-input field-textarea transition-fade"
              placeholder="Write a brief professional summary"
              rows={4}
            />
          ) : (
            <div className="field-value address-value">{profile.aboutMe || '—'}</div>
          )}
        </div>
      </div>

      {/* Action Buttons ONLY in Edit Mode */}
      {isEditing && !readOnly && (
        <div className="form-actions-row transition-fade">
          <button
            type="button"
            className="action-btn cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="action-btn save-btn"
            onClick={onSave}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
