import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import ActivityList from '../../components/ActivityList/ActivityList';
import QuickActionsList from '../../components/QuickActionsList/QuickActionsList';
import { dashboardStats, recentActivities } from '../../data/dashboardData';
import './Dashboard.css';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Navbar for Mobile/Tablet Viewports */}
        <header className="dashboard-navbar">
          <button className="navbar-toggle-btn" onClick={toggleSidebar} aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="navbar-brand">VJ Consultancy</span>
        </header>

        {/* Dashboard Header */}
        <div className="dashboard-header-section">
          <h1 className="dashboard-title">Project Sourcing Dashboard</h1>
          <p className="dashboard-subtitle">
            Overview of all projects you have added, grouped by their current status.
          </p>
        </div>

        {/* Summary Stats Grid */}
        <section className="summary-grid" aria-label="Project Statistics">
          <SummaryCard
            title="Published Projects"
            count={dashboardStats.published}
            icon="published"
          />
          <SummaryCard
            title="Active Projects"
            count={dashboardStats.active}
            icon="active"
          />
          <SummaryCard
            title="Completed Projects"
            count={dashboardStats.completed}
            icon="completed"
          />
          <SummaryCard
            title="Delivered Projects"
            count={dashboardStats.delivered}
            icon="delivered"
          />
        </section>

        {/* Bottom Details Grid (Activities & Quick Actions) */}
        <div className="details-grid">
          <section className="details-activities" aria-label="Recent Activities Log">
            <ActivityList activities={recentActivities} />
          </section>
          
          <section className="details-actions" aria-label="Quick Sourcing Actions">
            <QuickActionsList />
          </section>
        </div>
      </div>
    </div>
  );
}
