import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ApplicationsHeader from '../../components/MyApplications/ApplicationsHeader/ApplicationsHeader';
import StatusSummary from '../../components/MyApplications/StatusSummary/StatusSummary';
import StatusChips from '../../components/MyApplications/StatusChips/StatusChips';
import ApplicationsTable from '../../components/MyApplications/ApplicationsTable/ApplicationsTable';
import ApplicationDetailsDrawer from '../../components/MyApplications/ApplicationDetailsDrawer/ApplicationDetailsDrawer';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import './MyApplications.css';

const MOCK_APPLICATIONS = [
  {
    id: 1,
    projectName: 'College ERP Portal',
    description: 'Web application for managing college operations',
    projectIcon: 'Code',
    appliedDate: '24 May 2026',
    relativeDate: '5 days ago',
    status: 'Applied',
    lastUpdated: '24 May 2026',
    resumeFile: 'Resume_Medha.pdf',
    coverLetter: 'Dear Hiring Manager, I am extremely interested in the College ERP Portal project. As a Web Developer with experience in React and Node.js, I believe I can contribute significantly. I have previously worked on building student portals and administrative interfaces.',
    remarks: 'Your application has been received successfully.',
    nextStep: 'Initial Screening',
    timeline: [
      { stage: 'Applied', date: '24 May 2026', description: 'Application submitted successfully.' },
      { stage: 'Under Review', date: '--', description: 'Initial screening by coordinator pending.' },
      { stage: 'Shortlisted', date: '--', description: 'Shortlist review pending.' },
      { stage: 'Interview', date: '--', description: 'Technical interview round pending.' },
      { stage: 'Selected', date: '--', description: 'Final selection decision pending.' }
    ]
  },
  {
    id: 2,
    projectName: 'Student Feedback System',
    description: 'Mobile application for student feedback collection',
    projectIcon: 'Smartphone',
    appliedDate: '20 May 2026',
    relativeDate: '9 days ago',
    status: 'Under Review',
    lastUpdated: '22 May 2026',
    resumeFile: 'Resume_Medha.pdf',
    coverLetter: 'I would like to apply for the Student Feedback System project. I have extensive experience in React Native development and mobile database integration. I would love to discuss how I can help bring this mobile system to life.',
    remarks: 'Undergoing coordinator review. We are currently verifying coding credentials.',
    nextStep: 'Coordinator Feedback',
    timeline: [
      { stage: 'Applied', date: '20 May 2026', description: 'Application submitted successfully.' },
      { stage: 'Under Review', date: '22 May 2026', description: 'Coordinator is reviewing your profile and credentials.' },
      { stage: 'Shortlisted', date: '--', description: 'Shortlist review pending.' },
      { stage: 'Interview', date: '--', description: 'Technical interview round pending.' },
      { stage: 'Selected', date: '--', description: 'Final selection decision pending.' }
    ]
  },
  {
    id: 3,
    projectName: 'E-Commerce Analytics Engine',
    description: 'Data science platform for retail purchase insights',
    projectIcon: 'TrendingUp',
    appliedDate: '15 May 2026',
    relativeDate: '14 days ago',
    status: 'Shortlisted',
    lastUpdated: '18 May 2026',
    resumeFile: 'Resume_Medha_Data.pdf',
    coverLetter: 'Dear Team, I am submitting my resume for the Analytics Engine project. My background in python data modeling and visualization makes me a great fit. I have built similar retail dashboards before.',
    remarks: 'Excellent academic scores and relevant dataset projects. Shortlisted for technical round.',
    nextStep: 'Schedule Technical Interview',
    timeline: [
      { stage: 'Applied', date: '15 May 2026', description: 'Application submitted successfully.' },
      { stage: 'Under Review', date: '17 May 2026', description: 'Coordinator reviewed dataset profiles.' },
      { stage: 'Shortlisted', date: '18 May 2026', description: 'Profile shortlisted for technical evaluation.' },
      { stage: 'Interview', date: '--', description: 'Waiting for coordinator to schedule interview date.' },
      { stage: 'Selected', date: '--', description: 'Final selection decision pending.' }
    ]
  },
  {
    id: 4,
    projectName: 'Alumni Connect Platform',
    description: 'Cloud computing based alumni networking portal',
    projectIcon: 'Globe',
    appliedDate: '10 May 2026',
    relativeDate: '19 days ago',
    status: 'Interview Scheduled',
    lastUpdated: '14 May 2026',
    resumeFile: 'Resume_Medha.pdf',
    coverLetter: 'I am writing to express my interest in the Alumni Connect Platform. I specialize in cloud deployments and building web portals. I am confident in my skills.',
    remarks: 'Technical profile matches the requirement. Interview scheduled with project lead.',
    nextStep: 'Technical Interview',
    timeline: [
      { stage: 'Applied', date: '10 May 2026', description: 'Application submitted successfully.' },
      { stage: 'Under Review', date: '12 May 2026', description: 'Undergoing portfolio verification.' },
      { stage: 'Shortlisted', date: '13 May 2026', description: 'Shortlisted based on web portfolio.' },
      { stage: 'Interview', date: '14 May 2026', description: 'Technical interview scheduled for 02 June 2026.' },
      { stage: 'Selected', date: '--', description: 'Final selection decision pending.' }
    ]
  },
  {
    id: 5,
    projectName: 'Hospital Management Suite',
    description: 'Web database system for tracking patient records',
    projectIcon: 'Database',
    appliedDate: '05 May 2026',
    relativeDate: '24 days ago',
    status: 'Selected',
    lastUpdated: '12 May 2026',
    resumeFile: 'Resume_Medha.pdf',
    coverLetter: 'I would love to work on the Hospital Management Suite. I have built secure database systems with SQL and React in the past. Patient records safety is a top priority.',
    remarks: 'Outstanding performance in technical interview. Selected for fellowship program.',
    nextStep: 'Fellowship Onboarding',
    timeline: [
      { stage: 'Applied', date: '05 May 2026', description: 'Application submitted successfully.' },
      { stage: 'Under Review', date: '08 May 2026', description: 'Reviewed by database leads.' },
      { stage: 'Shortlisted', date: '09 May 2026', description: 'Profile shortlisted.' },
      { stage: 'Interview', date: '11 May 2026', description: 'Completed Technical interview and HR review.' },
      { stage: 'Selected', date: '12 May 2026', description: 'Congratulations! Selected for this project.' }
    ]
  },
  {
    id: 6,
    projectName: 'Smart Irrigation IoT System',
    description: 'IoT based sensor system for agriculture water savings',
    projectIcon: 'Cpu',
    appliedDate: '01 May 2026',
    relativeDate: '28 days ago',
    status: 'Rejected',
    lastUpdated: '04 May 2026',
    resumeFile: 'Resume_Medha.pdf',
    coverLetter: 'I am applying for the Smart Irrigation project. I have some knowledge of microcontrollers and sensors. I want to build green energy systems.',
    remarks: 'Lack of specific hardware experience in Arduino/Raspberry Pi. We encourage you to apply for web tasks.',
    nextStep: 'Explore Web Projects',
    timeline: [
      { stage: 'Applied', date: '01 May 2026', description: 'Application submitted successfully.' },
      { stage: 'Under Review', date: '04 May 2026', description: 'Rejected due to hardware mismatch.' },
      { stage: 'Shortlisted', date: '--', description: 'N/A' },
      { stage: 'Interview', date: '--', description: 'N/A' },
      { stage: 'Selected', date: '--', description: 'N/A' }
    ]
  },
  {
    id: 7,
    projectName: 'Online Exam Platform',
    description: 'Proctored online exam web portal with security logs',
    projectIcon: 'BookOpen',
    appliedDate: '18 May 2026',
    relativeDate: '11 days ago',
    status: 'Under Review',
    lastUpdated: '21 May 2026',
    resumeFile: 'Resume_Medha.pdf',
    coverLetter: 'Dear team, I would like to apply for the Online Exam Platform. I have experience in security controls, web sockets, and camera feeds.',
    remarks: 'Academic record checked. Reviewing frontend skillsets.',
    nextStep: 'Skillset Verification',
    timeline: [
      { stage: 'Applied', date: '18 May 2026', description: 'Application submitted successfully.' },
      { stage: 'Under Review', date: '21 May 2026', description: 'Reviewing proctoring and logging details.' },
      { stage: 'Shortlisted', date: '--', description: 'Shortlist review pending.' },
      { stage: 'Interview', date: '--', description: 'Technical interview round pending.' },
      { stage: 'Selected', date: '--', description: 'Final selection decision pending.' }
    ]
  },
  {
    id: 8,
    projectName: 'Fitness Tracker App',
    description: 'Mobile layout dashboard tracking workout schedules',
    projectIcon: 'Activity',
    appliedDate: '12 May 2026',
    relativeDate: '17 days ago',
    status: 'Interview Scheduled',
    lastUpdated: '16 May 2026',
    resumeFile: 'Resume_Medha.pdf',
    coverLetter: 'Dear Hiring Team, I am very excited to apply for the Fitness Tracker App project. I have built mobile dashboard wireframes and integrated maps services.',
    remarks: 'Slick UI/UX prototypes. Shortlisted for portfolio review discussion.',
    nextStep: 'Portfolio Interview',
    timeline: [
      { stage: 'Applied', date: '12 May 2026', description: 'Application submitted successfully.' },
      { stage: 'Under Review', date: '14 May 2026', description: 'Verifying dashboard layout prototypes.' },
      { stage: 'Shortlisted', date: '15 May 2026', description: 'Profile shortlisted for dashboard prototypes.' },
      { stage: 'Interview', date: '16 May 2026', description: 'Portfolio interview scheduled for 04 June 2026.' },
      { stage: 'Selected', date: '--', description: 'Final selection decision pending.' }
    ]
  }
];

export default function MyApplications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const itemsPerPage = 5;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Calculate status summary metrics based on ALL mock data
  const counts = {
    total: MOCK_APPLICATIONS.length,
    applied: MOCK_APPLICATIONS.filter(a => a.status === 'Applied').length,
    underReview: MOCK_APPLICATIONS.filter(a => a.status === 'Under Review').length,
    shortlisted: MOCK_APPLICATIONS.filter(a => a.status === 'Shortlisted').length,
    interview: MOCK_APPLICATIONS.filter(a => a.status === 'Interview Scheduled').length,
    selected: MOCK_APPLICATIONS.filter(a => a.status === 'Selected').length,
    rejected: MOCK_APPLICATIONS.filter(a => a.status === 'Rejected').length,
  };

  // Filter application list based on search and active chip tab
  const filteredApps = MOCK_APPLICATIONS.filter((app) => {
    const matchesSearch = app.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = true;
    if (activeFilter !== 'All') {
      if (activeFilter === 'Interview') {
        matchesStatus = app.status === 'Interview Scheduled';
      } else {
        matchesStatus = app.status === activeFilter;
      }
    }

    return matchesSearch && matchesStatus;
  });

  // Reset page pagination if search/filter results change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter]);

  // Drawer handlers
  const handleViewDetails = (application) => {
    setSelectedApp(application);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApps = filteredApps.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="my-applications-layout">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="my-applications-main">
        {/* Mobile Navbar */}
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

        {/* Page Header */}
        <ApplicationsHeader />

        {/* Summary Card Grid */}
        <StatusSummary counts={counts} />

        {/* Search, Status Chips & Table Wrapper */}
        <section className="applications-container-card">
          <div className="applications-toolbar-row">
            {/* Search Input Box */}
            <div className="search-bar-wrapper">
              <Search className="search-icon-app" size={18} />
              <input
                type="text"
                className="search-input-app"
                placeholder="Search applications by project title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search applications"
              />
            </div>
          </div>

          {/* Filter Chips list */}
          <StatusChips
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          <ApplicationsTable
                applications={paginatedApps}
                onViewDetails={handleViewDetails}
              />
              
              {/* Pagination Controls Footer */}
              {totalPages > 1 && (
                <div className="pagination-footer-row">
                  <span className="pagination-info-text">
                    Showing <strong className="font-medium">{startIndex + 1}</strong> to <strong className="font-medium">{Math.min(startIndex + itemsPerPage, filteredApps.length)}</strong> of <strong className="font-medium">{filteredApps.length}</strong> applications
                  </span>
                  <div className="pagination-btn-group">
                    <button
                      className="pagination-arrow-btn"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      type="button"
                    >
                      <ChevronLeft size={16} />
                      <span>Previous</span>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`pagination-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                        type="button"
                      >
                        {pageNum}
                      </button>
                    ))}
                    <button
                      className="pagination-arrow-btn"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      type="button"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
        </section>
      </div>

      {/* Sliding Details Drawer overlay */}
      <ApplicationDetailsDrawer
        application={selectedApp}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
