import React from 'react';
import './EvaluationSummary.css';

export default function EvaluationSummary({ scores }) {
  const values = Object.values(scores);
  const totalScore = values.reduce((sum, val) => sum + val, 0);
  const averageScore = (totalScore / 5).toFixed(1);
  const isRecommended = totalScore >= 30; // Pass if >= 30 out of 50 (i.e. average >= 6)

  const scoreLabels = {
    technicalKnowledge: 'Technical Knowledge',
    communicationSkills: 'Communication Skills',
    problemSolving: 'Problem Solving',
    confidence: 'Confidence',
    portfolioQuality: 'Portfolio Quality'
  };

  // Mock conic-gradient degree calculation for circular circle
  const percentScore = (totalScore / 50) * 100;
  const conicStyle = {
    background: `radial-gradient(circle, #ffffff 70%, transparent 71%),
                 conic-gradient(${isRecommended ? '#10b981' : '#ef4444'} ${percentScore}%, #f1f5f9 ${percentScore}%)`
  };

  return (
    <div className="evaluation-summary-card">
      <h3 className="eval-card-title">Evaluation Summary</h3>

      <div className="summary-score-overview">
        {/* Dynamic Circular Gauge */}
        <div className="summary-circular-gauge" style={conicStyle}>
          <span className={`total-score-val ${isRecommended ? 'pass-color' : 'fail-color'}`}>
            {totalScore}
          </span>
          <span className="total-score-max">/ 50</span>
        </div>

        <div className="summary-metrics-meta">
          <div className="summary-metric-item">
            <span className="metric-label">Average Score</span>
            <span className="metric-value">{averageScore} / 10</span>
          </div>

          <div className="summary-metric-item">
            <span className="metric-label">Recommendation</span>
            {isRecommended ? (
              <span className="recommendation-badge recommend-pass">PASS</span>
            ) : (
              <span className="recommendation-badge recommend-fail">FAIL</span>
            )}
          </div>
        </div>
      </div>

      {/* Score Breakdown Bars */}
      <div className="summary-breakdown-section">
        <h4 className="breakdown-title">Score Breakdown</h4>
        <div className="breakdown-list">
          {Object.entries(scores).map(([key, score]) => (
            <div key={key} className="breakdown-item">
              <div className="breakdown-header">
                <span className="breakdown-item-label">{scoreLabels[key] || key}</span>
                <span className="breakdown-item-score">{score} / 10</span>
              </div>
              <div className="breakdown-progress-track">
                <div 
                  className={`breakdown-progress-bar ${score >= 6 ? 'pass-bar' : 'fail-bar'}`}
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
