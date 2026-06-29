import React, { useState } from 'react';
import { Plus, StickyNote, Trash2 } from 'lucide-react';
import './ProjectNotes.css';

const INITIAL_NOTES = [
  'Phase 1 completed successfully.',
  'Phase 2 is currently under development.',
  'Please follow coding standards.'
];

export default function ProjectNotes() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
      setIsAdding(false);
    }
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, idx) => idx !== index));
  };

  return (
    <div className="project-notes-container">
      <div className="project-notes-header">
        <h3 className="workspace-section-title">Project Notes</h3>
        {!isAdding && (
          <button
            className="add-note-btn"
            onClick={() => setIsAdding(true)}
            type="button"
          >
            <Plus size={16} />
            <span>Add Note</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form className="add-note-form" onSubmit={handleAddNote}>
          <textarea
            className="note-textarea"
            placeholder="Type your note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={3}
            autoFocus
          />
          <div className="note-form-actions">
            <button
              type="button"
              className="note-cancel-btn"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
            <button type="submit" className="note-save-btn">
              Save Note
            </button>
          </div>
        </form>
      )}

      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <div className="note-content-wrapper">
              <StickyNote size={16} className="note-icon" />
              <p className="note-text">{note}</p>
            </div>
            <button
              className="delete-note-btn"
              onClick={() => handleDeleteNote(index)}
              title="Delete note"
              type="button"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
