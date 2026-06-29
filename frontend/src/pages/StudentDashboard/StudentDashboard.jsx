import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dashboardheader from '../../components/Dashboard/Dashboardheader/Dashboardheader';
import StatsCard from '../../components/Dashboard/StatsCard/StatsCard';
import RecentNotifications from '../../components/Dashboard/RecentNotifications/RecentNotifications';
import QuickLinks from '../../components/Dashboard/QuickLinks/QuickLinks';
import RecentApplications from '../../components/Dashboard/RecentApplications/RecentApplications';
import AssignedProjects from '../../components/Dashboard/AssignedProjects/AssignedProjects';
import './StudentDashboard.css';

const DELIVERABLES_DATA = [
  {
    id: 1,
    date: 'Today',
    task: 'Upload UI Wireframes',
    project: 'College ERP Portal',
    icon: 'Clock',
    colorClass: 'timeline-today'
  },
  {
    id: 2,
    date: 'Tomorrow',
    task: 'Project Review Meeting',
    project: 'Student Feedback System',
    icon: 'Users',
    colorClass: 'timeline-tomorrow'
  },
  {
    id: 3,
    date: '24 May',
    task: 'Submit Progress Report',
    project: 'Event Management System',
    icon: 'FileText',
    colorClass: 'timeline-upcoming'
  },
  {
    id: 4,
    date: '28 May',
    task: 'Upload Final Documentation',
    project: 'College ERP Portal',
    icon: 'UploadCloud',
    colorClass: 'timeline-last'
  }
];

export default function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="student-dashboard-layout">
      {/* Sidebar Integration */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="student-dashboard-main">
        {/* Top Navbar for Mobile/Tablet Toggling */}
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

        {/* Main Content Area */}
        <div className="dashboard-content-container">
          
          {/* 1. Dashboard Header */}
          <Dashboardheader />

          {/* 2. Statistics Cards Grid */}
          <section className="stats-section-grid" aria-label="Student Consultancy Statistics">
            <StatsCard 
              title="Active Applications" 
              value={4} 
              icon="Clipboard" 
              accent="blue" 
            />
            <StatsCard 
              title="Assigned Projects" 
              value={2} 
              icon="Briefcase" 
              accent="green" 
            />
            <StatsCard 
              title="Completed Projects" 
              value={5} 
              icon="CheckCircle" 
              accent="purple" 
            />
            <StatsCard 
              title="Payments Overview" 
              isPayment={true} 
              received="₹18,500" 
              pending="₹4,000" 
              icon="CreditCard" 
              accent="orange" 
            />
          </section>

          {/* 3. Recent Notifications & Quick Links Grid */}
          <section className="dashboard-middle-grid" aria-label="Notifications and Action Links">
            <div className="grid-col-equal">
              <RecentNotifications />
            </div>
            <div className="grid-col-equal">
              <QuickLinks />
            </div>
          </section>

          {/* 4. Recent Applications & Assigned Projects Grid */}
          <section className="dashboard-bottom-grid" aria-label="Applications and Project Details">
            <div className="grid-col-equal">
              <RecentApplications />
            </div>
            <div className="grid-col-equal">
              <AssignedProjects />
            </div>
          </section>

          {/* 5. Upcoming Deliverables Section */}
          <section className="upcoming-deliverables-section" aria-label="Upcoming Project Deliverables">
            <h2 className="deliverables-section-title">Upcoming Deliverables</h2>
            <div className="timeline-container">
              <div className="timeline-track-line"></div>
              <div className="timeline-items-wrapper">
                {DELIVERABLES_DATA.map((item) => {
                  const IconComponent = Icons[item.icon] || Icons.Calendar;
                  return (
                    <div key={item.id} className="timeline-item-col">
                      <div className={`timeline-node ${item.colorClass}`}>
                        <IconComponent size={18} className="timeline-node-icon" />
                      </div>
                      <div className="timeline-card">
                        <span className="timeline-date">{item.date}</span>
                        <h4 className="timeline-task">{item.task}</h4>
                        <span className="timeline-project">{item.project}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
