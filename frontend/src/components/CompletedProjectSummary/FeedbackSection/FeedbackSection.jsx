import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import './FeedbackSection.css';

export default function FeedbackSection({ feedback }) {
  const { coordinatorName, rating, message } = feedback;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} size={18} fill="#eab308" stroke="#eab308" className="star-icon" />);
      } else {
        stars.push(<Star key={i} size={18} stroke="#cbd5e1" className="star-icon" />);
      }
    }
    return stars;
  };

  return (
    <div className="feedback-section-container">
      <h3 className="overview-section-title">Coordinator Feedback</h3>
      
      <div className="feedback-card">
        {/* Rating and coordinator info */}
        <div className="feedback-card-header">
          <div className="coordinator-info">
            <span className="coordinator-label">Coordinator</span>
            <span className="coordinator-name">{coordinatorName}</span>
          </div>
          <div className="rating-block">
            <span className="rating-label">Overall Rating</span>
            <div className="stars-row">{renderStars()}</div>
          </div>
        </div>

        {/* Message */}
        <div className="feedback-message-box">
          <MessageSquare size={20} className="feedback-msg-icon" />
          <div className="feedback-message-content">
            <p className="feedback-message-txt">"{message}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
