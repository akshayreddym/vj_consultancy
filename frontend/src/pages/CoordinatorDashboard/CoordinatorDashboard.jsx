import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardHeader from '../../components/CoordinatorDashboard/DashboardHeader/DashboardHeader';
import OverviewCards from '../../components/CoordinatorDashboard/OverviewCards/OverviewCards';
import RecruitmentPipeline from '../../components/CoordinatorDashboard/RecruitmentPipeline/RecruitmentPipeline';
import MyTasks from '../../components/CoordinatorDashboard/MyTasks/MyTasks';
import PendingReviews from '../../components/CoordinatorDashboard/PendingReviews/PendingReviews';
import QuickAccess from '../../components/CoordinatorDashboard/QuickAccess/QuickAccess';
import './CoordinatorDashboard.css';

export default function CoordinatorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hardcoded mock data arrays in parent component state
  const initialStats = [
    { id: 1, title: 'Pending Applications', value: 24, subtitle: 'Require initial screening', type: 'applications' },
    { id: 2, title: 'Scheduled Evaluations', value: 8, subtitle: 'Assigned to this week', type: 'evaluations' },
    { id: 3, title: 'Active Assignments', value: 12, subtitle: 'Currently in progress', type: 'assignments' },
    { id: 4, title: 'Completed Projects', value: 5, subtitle: 'Waiting for client delivery', type: 'completed' }
  ];

  const initialPipeline = [
    { id: 'apps', name: 'Applications', count: 24, color: 'indigo' },
    { id: 'short', name: 'Shortlisted', count: 12, color: 'amber' },
    { id: 'eval', name: 'Evaluation', count: 8, color: 'blue' },
    { id: 'assign', name: 'Assigned', count: 5, color: 'emerald' }
  ];

  const initialTasks = [
    { id: 1, name: 'Review pending applications', projectName: 'VJ Consultancy Platform', dueDate: 'June 30, 2026', priority: 'High' },
    { id: 2, name: 'Conduct technical interview', projectName: 'VJ Consultancy Platform', dueDate: 'July 2, 2026', priority: 'High' },
    { id: 3, name: 'Review practical assessment', projectName: 'VJ Consultancy Platform', dueDate: 'July 5, 2026', priority: 'Medium' },
    { id: 4, name: 'Assign student to project', projectName: 'VJ Consultancy Platform', dueDate: 'July 10, 2026', priority: 'Low' }
  ];

  const initialReviews = [
    { id: 1, filename: 'Dashboard_UI.pdf', uploadedBy: 'Alex Johnson', time: '2 hours ago' },
    { id: 2, filename: 'Module_Design.docx', uploadedBy: 'Sarah Connor', time: '5 hours ago' },
    { id: 3, filename: 'Test_Cases.xlsx', uploadedBy: 'Michael Scott', time: 'Yesterday' }
  ];

  const quickLinks = [
    { id: 'applications', title: 'Application Management', description: 'Manage, review, and filter incoming student applications.', path: '/coordinator/applications' },
    { id: 'evaluation', title: 'Student Evaluation', description: 'Conduct interviews and view practical assessment grades.', path: '/coordinator/evaluation' },
    { id: 'lifecycle', title: 'Project Lifecycle', description: 'Track and update project assignments and student progress.', path: '/coordinator/lifecycle' }
  ];

  const stats = initialStats;
  const pipeline = initialPipeline;
  const tasks = initialTasks;
  const reviews = initialReviews;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="dashboard-main">
        {/* Mobile top navbar */}
        <header className="dashboard-navbar">
          <button
            className="navbar-toggle-btn"
            onClick={toggleSidebar}
            aria-label="Open menu"
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

        {/* Dashboard Header */}
        <div className="coordinator-header-row">
          <DashboardHeader
            title="Coordinator Dashboard"
            subtitle="Manage applications, evaluations and active project assignments."
          />
        </div>

        {/* Main Content */}
        <div className="coordinator-content-grid">
          {/* Overview Summary Cards */}
          <section className="coordinator-section" aria-label="Overview Stats">
            <OverviewCards stats={stats} />
          </section>

          {/* Recruitment Pipeline */}
          <section className="coordinator-section" aria-label="Recruitment Pipeline">
            <RecruitmentPipeline stages={pipeline} />
          </section>

          {/* Bottom Details Layout (Tasks, Reviews & Quick Access) */}
          <div className="coordinator-details-layout">
            {/* Left Column: Tasks and Reviews */}
            <div className="details-left-column">
              <section className="coordinator-section" aria-label="Tasks Checklist">
                <MyTasks tasks={tasks} />
              </section>
              <section className="coordinator-section" aria-label="Pending Document Reviews">
                <PendingReviews reviews={reviews} />
              </section>
            </div>

            {/* Right Column: Quick Access Links */}
            <div className="details-right-column">
              <section className="coordinator-section" aria-label="Quick Access Links">
                <QuickAccess links={quickLinks} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
