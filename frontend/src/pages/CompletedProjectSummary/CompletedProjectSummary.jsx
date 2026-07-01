import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import SummaryHeader from '../../components/CompletedProjectSummary/SummaryHeader/SummaryHeader';
import SummaryTabs from '../../components/CompletedProjectSummary/SummaryTabs/SummaryTabs';
import OverviewSection from '../../components/CompletedProjectSummary/OverviewSection/OverviewSection';
import DeliverablesSection from '../../components/CompletedProjectSummary/DeliverablesSection/DeliverablesSection';
import TimelineSection from '../../components/CompletedProjectSummary/TimelineSection/TimelineSection';
import FeedbackSection from '../../components/CompletedProjectSummary/FeedbackSection/FeedbackSection';
import ProjectStatistics from '../../components/CompletedProjectSummary/ProjectStatistics/ProjectStatistics';
import './CompletedProjectSummary.css';

const MOCK_COMPLETED_PROJECT = {
  id: 3,
  name: 'E-Commerce Analytics Engine',
  domain: 'Data Science',
  client: 'VJ Consultancy',
  completedDate: '15 May 2026',
  duration: '3 Months',
  teamSize: 3,
  progress: 100,
  iconName: 'TrendingUp',
  statistics: {
    filesSubmitted: 18,
    tasksCompleted: 24,
    completion: '100%',
    duration: '3 Months',
    completionDate: '15 May 2026'
  },
  overview: {
    description: 'A comprehensive data science and analytics platform designed to analyze retail customer purchase history, optimize product recommendations, and provide business intelligence reports. Built with high-performance visualization dashboards.',
    outcome: 'Successfully deployed analytics dashboard with 98% prediction accuracy for product recommendations, reducing manual report creation time by 80%.',
    finalScore: '9.5 / 10'
  },
  deliverables: [
    { name: 'Requirement_Analysis.pdf', type: 'pdf', size: '2.4 MB', submittedOn: '01 Mar 2026' },
    { name: 'ER_Diagram.png', type: 'png', size: '1.8 MB', submittedOn: '15 Mar 2026' },
    { name: 'Source_Code.zip', type: 'zip', size: '45.2 MB', submittedOn: '10 May 2026' },
    { name: 'Presentation.pptx', type: 'pptx', size: '8.5 MB', submittedOn: '12 May 2026' },
    { name: 'Final_Report.pdf', type: 'pdf', size: '3.1 MB', submittedOn: '15 May 2026' }
  ],
  timeline: [
    { stage: 'Project Assigned', date: '15 Feb 2026', description: 'Initial team assignment and kick-off meeting.' },
    { stage: 'Planning Completed', date: '01 Mar 2026', description: 'Submitted requirement document and wireframes.' },
    { stage: 'Development Completed', date: '20 Apr 2026', description: 'Finished core engines and model training.' },
    { stage: 'Testing Completed', date: '05 May 2026', description: 'Conducted user testing and bug fixes.' },
    { stage: 'Submitted', date: '10 May 2026', description: 'Uploaded final codebase and presentation files.' },
    { stage: 'Accepted', date: '14 May 2026', description: 'Verified by project coordinator.' },
    { stage: 'Completed', date: '15 May 2026', description: 'Deployed and archived project.' }
  ],
  feedback: {
    coordinatorName: 'Dr. V. J. Prasad',
    rating: 5,
    message: 'Excellent implementation. Clean UI. Good documentation. Delivered on time.'
  }
};

export default function CompletedProjectSummary() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Resolve matching completed project details
  let project = null;
  if (id === '3' || id === '4') {
    project = { ...MOCK_COMPLETED_PROJECT };
    if (id === '4') {
      project.id = 4;
      project.name = 'Alumni Connect Platform';
      project.domain = 'Cloud Computing';
      project.iconName = 'Globe';
      project.overview.description = 'A cloud-based networking portal for college alumni, enabling directory searches, job posting boards, mentoring connections, and event management. Fully containerized and deployed on AWS.';
      project.overview.outcome = 'Successfully registered over 5,000 alumni within the first week of deployment. Setup secure serverless architectures supporting real-time notifications.';
      project.deliverables[0].name = 'Architecture_Design.pdf';
      project.deliverables[2].name = 'Alumni_Portal_V1.zip';
    }
  } else if (!id) {
    // If accessed directly without ID, default to E-Commerce Analytics Engine
    project = MOCK_COMPLETED_PROJECT;
  }

  return (
    <div className="completed-summary-layout">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="completed-summary-main">
        {/* Mobile top navbar styling */}
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

            {/* Header info blocks */}
            <SummaryHeader project={project} />

            {/* Layout Grid */}
            <div className="completed-summary-grid">
              <div className="summary-left-column">
                <SummaryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="summary-tab-content">
                  {activeTab === 'overview' && <OverviewSection project={project} />}
                  {activeTab === 'deliverables' && <DeliverablesSection deliverables={project.deliverables} />}
                  {activeTab === 'timeline' && <TimelineSection timeline={project.timeline} />}
                  {activeTab === 'feedback' && <FeedbackSection feedback={project.feedback} />}
                </div>
              </div>

              <div className="summary-right-column">
                <ProjectStatistics statistics={project.statistics} />
              </div>
            </div>
      </div>
    </div>
  );
}
