import React from 'react';
import './EvaluationForm.css';

export default function EvaluationForm({ 
  candidate,
  scores, 
  onScoreChange, 
  remarks, 
  onRemarksChange 
}) {
  const criteria = [
    { key: 'technicalKnowledge', label: 'Technical Knowledge', desc: 'Understanding of core technologies and concepts' },
    { key: 'communicationSkills', label: 'Communication Skills', desc: 'Clarity, listening skills, and presentation quality' },
    { key: 'problemSolving', label: 'Problem Solving', desc: 'Analytical thinking and algorithmic approach' },
    { key: 'confidence', label: 'Confidence', desc: 'Composure, posture, and answers conviction' },
    { key: 'portfolioQuality', label: 'Portfolio Quality', desc: 'Complexity and code quality of past projects' }
  ];

  const scoreOptions = Array.from({ length: 11 }, (_, i) => i); // 0 to 10

  return (
    <div className="evaluation-form-card">
      <h3 className="eval-card-title">Evaluation Form</h3>

      <div className="criteria-list">
        {criteria.map((item) => (
          <div key={item.key} className="criteria-item-row">
            <div className="criteria-meta">
              <span className="criteria-label">{item.label}</span>
              <span className="criteria-desc">{item.desc}</span>
            </div>
            <select
              className="criteria-score-select"
              value={scores[item.key] || 0}
              onChange={(e) => onScoreChange(item.key, parseInt(e.target.value))}
              disabled={candidate.evaluationStatus !== 'Pending'}
            >
              {scoreOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt} / 10
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="remarks-form-group">
        <div className="remarks-header-row">
          <label className="remarks-label">Coordinator Remarks</label>
          <span className="char-count">
            {remarks.length} / 500 chars
          </span>
        </div>
        <textarea
          className="remarks-textarea"
          value={remarks}
          onChange={(e) => onRemarksChange(e.target.value.slice(0, 500))} // Enforce 500 chars limit
          placeholder="Add detailed feedback on the student's strengths, weaknesses, and potential role fitness..."
          rows={4}
          disabled={candidate.evaluationStatus !== 'Pending'}
        />
      </div>
    </div>
  );
}
