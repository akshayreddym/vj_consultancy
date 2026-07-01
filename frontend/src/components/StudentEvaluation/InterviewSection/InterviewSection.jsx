import React, { useState } from 'react';
import { Video, Calendar, Clock, Sparkles, Send, Check } from 'lucide-react';
import './InterviewSection.css';

export default function InterviewSection({ candidate, onSchedule }) {
  const [platform, setPlatform] = useState(candidate.interview?.platform || 'Google Meet');
  const [link, setLink] = useState(candidate.interview?.link || '');
  const [date, setDate] = useState(candidate.interview?.date || '');
  const [time, setTime] = useState(candidate.interview?.time || '');
  const [showToast, setShowToast] = useState(false);

  const handleGenerateMeeting = () => {
    // Generate a random 3-3-4 string like abc-defg-hij
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const randPart = (len) => Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const mockLink = `https://meet.google.com/vjc-${randPart(3)}-${randPart(4)}`;
    setLink(mockLink);
  };

  const handleSendInvitation = (e) => {
    e.preventDefault();
    if (!link || !date || !time) {
      alert("Please fill in the meeting link, date, and time before sending invitation.");
      return;
    }
    
    // Call parent handler
    onSchedule(candidate.id, { platform, link, date, time });
    
    // Show local success toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="interview-section-card">
      <h3 className="eval-card-title">Interview Details</h3>
      
      <form onSubmit={handleSendInvitation} className="interview-form-grid">
        <div className="form-group-item">
          <label className="form-label">Meeting Platform</label>
          <div className="select-wrapper">
            <Video className="input-icon" />
            <select 
              className="form-select-control"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              disabled={candidate.evaluationStatus !== 'Pending'}
            >
              <option value="Google Meet">Google Meet</option>
              <option value="Microsoft Teams">Microsoft Teams</option>
              <option value="Zoom">Zoom</option>
            </select>
          </div>
        </div>

        <div className="form-group-item">
          <label className="form-label">Meeting Link</label>
          <div className="input-with-action">
            <input
              type="text"
              className="form-input-control text-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Generate or enter meeting URL..."
              disabled={candidate.evaluationStatus !== 'Pending'}
            />
            {candidate.evaluationStatus === 'Pending' && (
              <button
                type="button"
                className="generate-meet-btn"
                onClick={handleGenerateMeeting}
                title="Generate Google Meet URL"
              >
                <Sparkles className="btn-spark-icon" />
                <span>Generate</span>
              </button>
            )}
          </div>
        </div>

        <div className="form-date-time-row">
          <div className="form-group-item">
            <label className="form-label">Interview Date</label>
            <div className="input-wrapper">
              <Calendar className="input-icon" />
              <input
                type="date"
                className="form-input-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={candidate.evaluationStatus !== 'Pending'}
              />
            </div>
          </div>

          <div className="form-group-item">
            <label className="form-label">Interview Time</label>
            <div className="input-wrapper">
              <Clock className="input-icon" />
              <input
                type="time"
                className="form-input-control"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={candidate.evaluationStatus !== 'Pending'}
              />
            </div>
          </div>
        </div>

        {candidate.evaluationStatus === 'Pending' && (
          <button type="submit" className="send-invitation-btn">
            <Send className="send-icon" />
            <span>Send Invitation & Schedule</span>
          </button>
        )}
      </form>

      {/* Floating Success Toast */}
      {showToast && (
        <div className="toast-notification-success">
          <div className="toast-icon-wrapper">
            <Check className="toast-check-icon" />
          </div>
          <div className="toast-content">
            <span className="toast-title">Invitation Sent!</span>
            <span className="toast-desc">Interview scheduled and Google Meet invitation sent to {candidate.profile.name}.</span>
          </div>
        </div>
      )}
    </div>
  );
}
