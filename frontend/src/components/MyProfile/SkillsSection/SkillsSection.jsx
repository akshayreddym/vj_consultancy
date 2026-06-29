import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './SkillsSection.css';

// Pre-defined list of common skills for quick additions or autocomplete
const SUGGESTED_SKILLS = [
  "HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", 
  "MongoDB", "Git", "GitHub", "Python", "SQL", "Java", "C++", 
  "Tailwind CSS", "Bootstrap", "TypeScript", "Next.js", "Docker",
  "AWS", "PostgreSQL", "Firebase", "Redux", "GraphQL"
];

export default function SkillsSection({ skills, isEditing, onAddSkill, onRemoveSkill }) {
  const [newSkill, setNewSkill] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const PlusIcon = Icons.Plus;
  const XIcon = Icons.X;
  const TerminalIcon = Icons.Terminal;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const cleanSkill = newSkill.trim();
    if (cleanSkill && !skills.includes(cleanSkill)) {
      onAddSkill(cleanSkill);
      setNewSkill('');
    }
  };

  const handleSuggestionClick = (suggested) => {
    if (!skills.includes(suggested)) {
      onAddSkill(suggested);
    }
    setNewSkill('');
    setShowSuggestions(false);
  };

  // Filter suggestions to show only those not already added
  const filteredSuggestions = SUGGESTED_SKILLS.filter(
    (s) => s.toLowerCase().includes(newSkill.toLowerCase()) && !skills.includes(s)
  );

  return (
    <div className={`skills-section-card ${isEditing ? 'card-editing-mode' : ''}`}>
      <div className="skills-header">
        <div className="skills-title-row">
          <TerminalIcon size={18} className="skills-card-icon" />
          <h3 className="section-card-title">Skills & Technologies</h3>
        </div>
        <span className="skills-count">{skills.length} Skills Listed</span>
      </div>

      <div className="skills-container">
        {skills.length === 0 ? (
          <p className="no-skills-msg">No skills added yet. Switch to Edit Mode to add skills.</p>
        ) : (
          <div className="skills-chips-wrapper">
            {skills.map((skill) => (
              <div key={skill} className={`skill-chip ${isEditing ? 'editable-chip' : ''}`}>
                <span className="skill-name">{skill}</span>
                {isEditing && (
                  <button
                    type="button"
                    className="remove-skill-btn"
                    onClick={() => onRemoveSkill(skill)}
                    aria-label={`Remove ${skill}`}
                  >
                    <XIcon size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="add-skill-form-container transition-fade">
          <form onSubmit={handleAddSubmit} className="add-skill-form">
            <div className="add-skill-input-wrapper">
              <input
                type="text"
                placeholder="Type a skill (e.g. Next.js, AWS)..."
                value={newSkill}
                onChange={(e) => {
                  setNewSkill(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // Delay blur so click on suggestion registers first
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                className="add-skill-input"
              />
              
              {/* Autocomplete Suggestions Dropdown */}
              {showSuggestions && newSkill.trim() && filteredSuggestions.length > 0 && (
                <ul className="suggestions-dropdown" role="listbox">
                  {filteredSuggestions.slice(0, 5).map((suggested) => (
                    <li
                      key={suggested}
                      className="suggestion-item"
                      onMouseDown={() => handleSuggestionClick(suggested)}
                    >
                      {suggested}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="submit"
              className="add-skill-btn"
              disabled={!newSkill.trim() || skills.includes(newSkill.trim())}
            >
              <PlusIcon size={16} />
              <span>Add</span>
            </button>
          </form>
          
          {/* Quick recommendations chips */}
          <div className="quick-suggestions-box">
            <span className="quick-suggest-label">Popular Suggestions:</span>
            <div className="quick-suggest-chips">
              {SUGGESTED_SKILLS.slice(0, 8)
                .filter((s) => !skills.includes(s))
                .map((suggested) => (
                  <button
                    key={suggested}
                    type="button"
                    className="suggest-chip"
                    onClick={() => onAddSkill(suggested)}
                  >
                    +{suggested}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
