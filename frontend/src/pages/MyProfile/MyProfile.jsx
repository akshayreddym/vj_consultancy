import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfileHeader from '../../components/MyProfile/ProfileHeader/ProfileHeader';
import ProfileCompletion from '../../components/MyProfile/ProfileCompletion/ProfileCompletion';
import PersonalInformation from '../../components/MyProfile/PersonalInformation/PersonalInformation';
import AcademicInformation from '../../components/MyProfile/AcademicInformation/AcademicInformation';
import SkillsSection from '../../components/MyProfile/SkillsSection/SkillsSection';
import ProfessionalLinks from '../../components/MyProfile/ProfessionalLinks/ProfessionalLinks';
import ResumeSection from '../../components/MyProfile/ResumeSection/ResumeSection';
import EmptyProfile from '../../components/MyProfile/EmptyProfile/EmptyProfile';
import './MyProfile.css';

const INITIAL_MOCK_DATA = {
  fullName: "Srija B",
  role: "Full Stack Web Developer",
  email: "srija.b@vnr.edu.in",
  phone: "+91 98765 43210",
  dob: "2003-08-18",
  gender: "Female",
  location: "Hyderabad, India",
  address: "Pragathi Nagar, Kukatpally, Hyderabad - 500090",
  aboutMe: "Passionate Full Stack Developer and pre-final year B.Tech student at VNR VJIET. Experienced in MERN Stack, UI/UX Design, and cloud deployment. Actively looking for challenging software development internship roles.",
  educationSummary: "B.Tech in Computer Science and Engineering",
  profilePhoto: "/student_profile_photo.png",
  skills: [
    "HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", 
    "MongoDB", "Git", "GitHub", "Python", "SQL", "Tailwind CSS"
  ],
  resume: {
    resumeName: "Srija_B_Resume.pdf",
    uploadedDate: "18 May 2024"
  },
  links: {
    portfolio: "https://srija-dev.pages.dev",
    github: "https://github.com/srija-b",
    linkedin: "https://linkedin.com/in/srija-b-developer",
    leetcode: "https://leetcode.com/srija_b_codes",
    codechef: "https://codechef.com/users/srija_b_18"
  },
  academic: {
    college: "VNR Vignana Jyothi Institute of Engineering and Technology",
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science and Engineering",
    year: "4th Year",
    batch: "2021 - 2025",
    cgpa: "8.92",
    isVerified: false // Verifies Academic Info. Kept false by default to show 80% completion
  }
};

export default function MyProfile() {
  const [profile, setProfile] = useState(INITIAL_MOCK_DATA);
  const [editableProfile, setEditableProfile] = useState(INITIAL_MOCK_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDeleted, setIsProfileDeleted] = useState(false); // For empty state preview

  const InfoIcon = Icons.Info;
  const RefreshCwIcon = Icons.RefreshCw;
  const ShieldAlertIcon = Icons.ShieldAlert;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // 1. Enter Edit Mode: Copy profile to editableProfile
  const handleEditClick = () => {
    setEditableProfile(JSON.parse(JSON.stringify(profile)));
    setIsEditing(true);
  };

  // 2. Field Change: updates editableProfile fields
  const handleFieldChange = (field, value) => {
    setEditableProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 3. Link Change: updates editableProfile links
  const handleLinkChange = (key, value) => {
    setEditableProfile(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [key]: value
      }
    }));
  };

  // 4. Skills updates: updates editableProfile skills
  const handleAddSkill = (skill) => {
    setEditableProfile(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills : [...prev.skills, skill]
    }));
  };

  const handleRemoveSkill = (skill) => {
    setEditableProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  // 5. Resume update: updates editableProfile resume
  const handleResumeReplace = (fileName, uploadDate) => {
    setEditableProfile(prev => ({
      ...prev,
      resume: {
        resumeName: fileName,
        uploadedDate: uploadDate
      }
    }));
  };

  // 6. Save Changes: commits editableProfile to profile and exits Edit Mode
  const handleSave = () => {
    setProfile(editableProfile);
    setIsEditing(false);
  };

  // 7. Cancel: discards editableProfile, restores profile, exits Edit Mode
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Utilities for testing Empty State
  const handleClearProfile = () => {
    setIsProfileDeleted(true);
    setIsEditing(false);
  };

  const handleRecreateProfile = () => {
    setProfile(INITIAL_MOCK_DATA);
    setEditableProfile(INITIAL_MOCK_DATA);
    setIsProfileDeleted(false);
  };

  // Dynamic percentage & checklist calculations
  // Recalculates from editableProfile in edit mode so checklist/percentage update dynamically
  const activeProfile = isEditing ? editableProfile : profile;

  const checklist = {
    personalInfo: !!(
      activeProfile &&
      activeProfile.fullName &&
      activeProfile.email &&
      activeProfile.phone &&
      activeProfile.dob &&
      activeProfile.gender &&
      activeProfile.location &&
      activeProfile.address &&
      activeProfile.aboutMe
    ),
    skills: !!(activeProfile && activeProfile.skills && activeProfile.skills.length > 0),
    resume: !!(activeProfile && activeProfile.resume && activeProfile.resume.resumeName),
    links: !!(activeProfile && activeProfile.links && Object.values(activeProfile.links).some(val => val !== "")),
    academic: !!(activeProfile && activeProfile.academic && activeProfile.academic.isVerified)
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const percentage = completedCount * 20;

  return (
    <div className="my-profile-layout">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="my-profile-main">
        {/* Mobile Navbar Header */}
        <header className="dashboard-navbar">
          <button
            className="navbar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Open menu"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="navbar-brand">VJ Consultancy</span>
        </header>

        {/* Top Header Toolbar */}
        <div className="profile-utility-toolbar">
          <div className="toolbar-left">
            <h1 className="profile-page-title">My Profile</h1>
            <p className="profile-page-subtitle">
              Manage your personal and professional information.
            </p>
          </div>
          <div className="toolbar-right">
            {!isProfileDeleted ? (
              <button
                type="button"
                className="utility-action-btn delete-test-btn"
                onClick={handleClearProfile}
                title="Test how the page looks with no profile data"
              >
                <ShieldAlertIcon size={14} />
                <span>Simulate Empty State</span>
              </button>
            ) : (
              <button
                type="button"
                className="utility-action-btn restore-test-btn"
                onClick={handleRecreateProfile}
              >
                <RefreshCwIcon size={14} />
                <span>Restore Student Profile</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        {isProfileDeleted ? (
          <EmptyProfile onRecreate={handleRecreateProfile} />
        ) : (
          <div className={`profile-sections-wrapper ${isEditing ? 'is-editing-mode' : ''}`}>
            
            {/* 1. Profile Header Card */}
            <ProfileHeader
              profile={isEditing ? editableProfile : profile}
              isEditing={isEditing}
              onChange={handleFieldChange}
              onEditClick={handleEditClick}
              onSave={handleSave}
              onCancel={handleCancel}
            />

            {/* 2. Circular completion indicator */}
            <ProfileCompletion percentage={percentage} checklist={checklist} />

            {/* 3. Personal & Academic cards */}
            <div className="profile-split-grid">
              <PersonalInformation
                profile={isEditing ? editableProfile : profile}
                isEditing={isEditing}
                onChange={handleFieldChange}
                onSave={handleSave}
                onCancel={handleCancel}
              />

              <AcademicInformation academic={profile.academic} />
            </div>

            {/* 4. Skills & Links cards */}
            <div className="profile-split-grid">
              <SkillsSection
                skills={isEditing ? editableProfile.skills : profile.skills}
                isEditing={isEditing}
                onAddSkill={handleAddSkill}
                onRemoveSkill={handleRemoveSkill}
              />

              <ProfessionalLinks
                links={isEditing ? editableProfile.links : profile.links}
                isEditing={isEditing}
                onChange={handleLinkChange}
              />
            </div>

            {/* 5. Resume card */}
            <ResumeSection
              resume={isEditing ? editableProfile.resume : profile.resume}
              isEditing={isEditing}
              onUploadSimulate={handleResumeReplace}
            />

            {/* Bottom info banner */}
            <div className="profile-bottom-info-banner">
              <div className="info-banner-content">
                <InfoIcon size={18} className="banner-info-icon" />
                <span className="banner-info-text">
                  Keep your profile updated to get better project recommendations and opportunities.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
