import React from 'react';
import * as Icons from 'lucide-react';
import './StatsCard.css';

export default function StatsCard({ title, value, icon, accent, isPayment, received, pending }) {
  // Dynamically resolve the Lucide icon from the string name passed as a prop
  const IconComponent = icon ? Icons[icon] : null;

  return (
    <div className={`stats-card stats-card-${accent}`}>
      <div className="stats-card-body">
        <div className="stats-card-info">
          <span className="stats-card-title">{title}</span>
          {isPayment ? (
            <div className="stats-card-payment-grid">
              <div className="payment-col">
                <span className="payment-label">Received</span>
                <span className="payment-val val-received">{received}</span>
              </div>
              <div className="payment-divider"></div>
              <div className="payment-col">
                <span className="payment-label">Pending</span>
                <span className="payment-val val-pending">{pending}</span>
              </div>
            </div>
          ) : (
            <span className="stats-card-value">{value}</span>
          )}
        </div>
        
        {IconComponent && (
          <div className="stats-card-icon-container">
            <IconComponent size={24} className="stats-card-icon" />
          </div>
        )}
      </div>
    </div>
  );
}
