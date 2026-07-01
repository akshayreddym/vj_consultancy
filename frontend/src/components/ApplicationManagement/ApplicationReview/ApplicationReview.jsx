import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, Download, ExternalLink,
  GraduationCap, BookOpen, Award, CheckCircle, Clock, XCircle, FileText
} from 'lucide-react';
import './ApplicationReview.css';

const Github = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.size || 16}
    height={props.size || 16}
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.size || 16}
    height={props.size || 16}
    className={props.className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ApplicationReview({
  project,
  applicant,
  onBackToApplicants,
  onShortlist,
  onReject
}) {
  const navigate = useNavigate();

  if (!project || !applicant) return null;

  const handleProceedToEvaluation = () => {
    navigate('/coordinator/evaluation', {
      state: {
        applicant: applicant,
        from: 'application-management'
      }
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Applied':
        return (
          <span className="badge-status badge-applied">
            <Clock className="badge-icon" />
            Applied
          </span>
        );
      case 'Shortlisted':
        return (
          <span className="badge-status badge-shortlisted">
            <CheckCircle className="badge-icon" />
            Shortlisted
          </span>
        );
      case 'Rejected':
        return (
          <span className="badge-status badge-rejected">
            <XCircle className="badge-icon" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="application-review-container">
      {/* Header with back navigation */}
      <div className="review-header">
        <button className="back-nav-btn" onClick={onBackToApplicants}>
          <ArrowLeft className="back-icon" />
          <span>Back to Applicants</span>
        </button>
        <div className="header-meta-info">
          <h2 className="review-title">Application Review</h2>
          <div className="review-status-container">
            <span className="status-label">Status:</span>
            {getStatusBadge(applicant.status)}
          </div>
        </div>
      </div>

      {/* 3-Section Grid Layout */}
      <div className="review-grid">
        
        {/* LEFT SECTION: Profile, Contact, Skills, Resume */}
        <aside className="review-card left-section">
          <div className="profile-header-card">
            <img 
              src={applicant.profile.photo} 
              alt={applicant.profile.name} 
              className="profile-photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(applicant.profile.name)}&background=7C3AED&color=fff&size=128`;
              }}
            />
            <h3 className="student-name">{applicant.profile.name}</h3>
            <p className="student-subtext">{applicant.profile.branch}</p>
            <p className="student-subtext text-muted">{applicant.profile.year}</p>
          </div>

          <div className="profile-details-list">
            <h4 className="card-subheading">Contact Information</h4>
            <div className="contact-item">
              <Mail className="contact-icon" />
              <span className="contact-text" title={applicant.profile.email}>
                {applicant.profile.email}
              </span>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <span className="contact-text">{applicant.profile.phone}</span>
            </div>
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <span className="contact-text">{applicant.profile.location}</span>
            </div>
          </div>

          <div className="skills-container">
            <h4 className="card-subheading">Technical Skills</h4>
            <div className="skills-tags">
              {applicant.profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="resume-section">
            <h4 className="card-subheading">Resume & Attachments</h4>
            <div className="resume-card">
              <div className="resume-card-left">
                <div className="pdf-icon-wrapper">
                  <FileText className="pdf-icon" />
                </div>
                <div className="resume-file-info">
                  <span className="file-name" title={`Resume_${applicant.profile.name.replace(/\s+/g, '_')}.pdf`}>
                    Resume_{applicant.profile.name.split(' ')[0]}.pdf
                  </span>
                  <span className="file-size">1.2 MB • PDF Document</span>
                </div>
              </div>
              <a 
                href={applicant.profile.resumeUrl || "#"} 
                className="download-resume-btn" 
                download
                onClick={(e) => e.preventDefault()} // In mock mode, prevent actual download navigation
              >
                <Download className="download-icon" />
                <span>Download</span>
              </a>
            </div>
          </div>

          <div className="portfolio-section">
            <h4 className="card-subheading">Portfolio & Profiles</h4>
            <div className="portfolio-links">
              {applicant.portfolio.github && (
                <a href={applicant.portfolio.github} target="_blank" rel="noopener noreferrer" className="portfolio-link-item">
                  <Github className="link-icon" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="link-arrow" />
                </a>
              )}
              {applicant.portfolio.linkedin && (
                <a href={applicant.portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="portfolio-link-item">
                  <Linkedin className="link-icon" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="link-arrow" />
                </a>
              )}
              {applicant.portfolio.portfolio && (
                <a href={applicant.portfolio.portfolio} target="_blank" rel="noopener noreferrer" className="portfolio-link-item">
                  <ExternalLink className="link-icon" />
                  <span>Personal Portfolio</span>
                  <ExternalLink className="link-arrow" />
                </a>
              )}
            </div>
          </div>
        </aside>

        {/* CENTER SECTION: Application details, cover letter, experience */}
        <main className="center-section-wrapper">
          <div className="review-card center-section">
            <h3 className="section-card-title">Application Details</h3>
            
            <div className="details-grid">
              <div className="details-block">
                <span className="block-label">Applied Project</span>
                <span className="block-value project-title-highlight">{project.name}</span>
              </div>
              <div className="details-grid-row">
                <div className="details-block">
                  <span className="block-label">Application Date</span>
                  <span className="block-value">{applicant.appliedOn}</span>
                </div>
                <div className="details-block">
                  <span className="block-label">Preferred Role</span>
                  <span className="block-value role-badge">{applicant.preferredRole || 'Technical Consultant'}</span>
                </div>
              </div>
            </div>

            <div className="letter-block">
              <h4 className="letter-heading">Cover Letter</h4>
              <div className="letter-content">
                {applicant.coverLetter}
              </div>
            </div>

            <div className="experience-block">
              <h4 className="experience-heading">Previous Experience</h4>
              <div className="experience-content">
                {applicant.experience}
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT SECTION: Academic information, repeating portfolio links */}
        <aside className="review-card right-section">
          <h3 className="section-card-title">Academic Profile</h3>
          
          <div className="academic-overview">
            <div className="cgpa-gauge-card">
              <div className="cgpa-gauge-circle">
                <span className="cgpa-value">{applicant.academic.cgpa}</span>
                <span className="cgpa-label">CGPA</span>
              </div>
              <div className="cgpa-text-meta">
                <span className="cgpa-status-badge">Outstanding Academic Record</span>
              </div>
            </div>

            <div className="academic-details-list">
              <div className="academic-detail-item">
                <GraduationCap className="academic-icon" />
                <div className="academic-meta">
                  <span className="acad-label">College</span>
                  <span className="acad-value">{applicant.academic.college}</span>
                </div>
              </div>
              <div className="academic-detail-item">
                <BookOpen className="academic-icon" />
                <div className="academic-meta">
                  <span className="acad-label">Branch & Program</span>
                  <span className="acad-value">{applicant.academic.branch}</span>
                </div>
              </div>
              <div className="academic-detail-item">
                <Award className="academic-icon" />
                <div className="academic-meta">
                  <span className="acad-label">Current Academic Year</span>
                  <span className="acad-value">{applicant.academic.year}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="other-links-section">
            <h3 className="section-card-title-sm">Quick Reference Links</h3>
            <div className="portfolio-links">
              {applicant.academic.links?.github && (
                <a href={applicant.academic.links.github} target="_blank" rel="noopener noreferrer" className="portfolio-link-item">
                  <Github className="link-icon" />
                  <span>Student GitHub</span>
                  <ExternalLink className="link-arrow" />
                </a>
              )}
              {applicant.academic.links?.linkedin && (
                <a href={applicant.academic.links.linkedin} target="_blank" rel="noopener noreferrer" className="portfolio-link-item">
                  <Linkedin className="link-icon" />
                  <span>Student LinkedIn</span>
                  <ExternalLink className="link-arrow" />
                </a>
              )}
              {applicant.academic.links?.portfolio && (
                <a href={applicant.academic.links.portfolio} target="_blank" rel="noopener noreferrer" className="portfolio-link-item">
                  <ExternalLink className="link-icon" />
                  <span>Student Portfolio</span>
                  <ExternalLink className="link-arrow" />
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="review-action-bar-sticky">
        <div className="action-bar-content">
          <div className="action-bar-left-meta">
            <span className="applicant-action-name">{applicant.profile.name}</span>
            <span className="applicant-action-status">• {applicant.status}</span>
          </div>

          <div className="action-bar-buttons">
            {applicant.status === 'Applied' && (
              <>
                <button 
                  className="action-btn-secondary reject-btn"
                  onClick={() => onReject(project.id, applicant.id)}
                >
                  Reject Application
                </button>
                <button 
                  className="action-btn-primary shortlist-btn"
                  onClick={() => onShortlist(project.id, applicant.id)}
                >
                  Shortlist Applicant
                </button>
              </>
            )}

            {applicant.status === 'Shortlisted' && (
              <button 
                className="action-btn-primary proceed-btn"
                onClick={handleProceedToEvaluation}
              >
                Proceed to Evaluation
              </button>
            )}

            {applicant.status === 'Rejected' && (
              <div className="rejected-state-notice">
                <span className="rejected-badge">Application Rejected</span>
                <button
                  className="reconsider-btn"
                  onClick={() => onShortlist(project.id, applicant.id)}
                >
                  Reconsider & Shortlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
