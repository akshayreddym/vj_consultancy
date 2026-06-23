import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddProjectForm from '../../components/AddProjectForm/AddProjectForm';
import './AddProject.css';

function AddProject() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
          <h1 className="dashboard-title">Add New Project</h1>
          <p className="dashboard-subtitle">
            Log a confirmed client project — it goes live for students immediately.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="add-project-container-card">
          <AddProjectForm />
        </div>
      </div>
    </div>
  );
}

export default AddProject;
