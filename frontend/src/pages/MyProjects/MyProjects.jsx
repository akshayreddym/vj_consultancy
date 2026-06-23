import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProjectsTable from '../../components/ProjectsTable/ProjectsTable';
import './MyProjects.css';

// Realistic mock data as per requirements
const initialProjects = [
  {
    id: 'proj-101',
    title: 'E-Commerce Website Development',
    budget: 150000,
    status: 'Published',
    addedOn: '2026-06-01',
    deadline: '2026-07-15'
  },
  {
    id: 'proj-102',
    title: 'Hospital Management System',
    budget: 320000,
    status: 'Active',
    addedOn: '2026-05-15',
    deadline: '2026-08-30'
  },
  {
    id: 'proj-103',
    title: 'Restaurant Management System',
    budget: 85000,
    status: 'Completed',
    addedOn: '2026-04-10',
    deadline: '2026-06-10'
  },
  {
    id: 'proj-104',
    title: 'Student Performance Analytics',
    budget: 120000,
    status: 'Active',
    addedOn: '2026-05-20',
    deadline: '2026-09-15'
  },
  {
    id: 'proj-105',
    title: 'Real Estate Listing Platform',
    budget: 210000,
    status: 'Closed',
    addedOn: '2026-03-01',
    deadline: '2026-05-01'
  },
  {
    id: 'proj-106',
    title: 'Inventory Management System',
    budget: 180000,
    status: 'Published',
    addedOn: '2026-06-12',
    deadline: '2026-08-01'
  },
  {
    id: 'proj-107',
    title: 'Online Examination System',
    budget: 160000,
    status: 'Active',
    addedOn: '2026-05-05',
    deadline: '2026-07-31'
  }
];

export default function MyProjects() {
  const [projects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  // Sidebar toggle handlers (for mobile views)
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Filter projects by Title and Status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' ||
      project.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Action handlers
  const handleViewDetails = (id) => {
    console.log(`View Details Clicked for Project ID: ${id}`);
  };

  const handleEditProject = (id) => {
    console.log(`Edit Project Clicked for Project ID: ${id}`);
  };

  const handleAddNewProjectClick = () => {
    navigate('/add-project');
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

        {/* Page Header */}
        <div className="dashboard-header-section">
          <h1 className="dashboard-title">My Projects</h1>
          <p className="dashboard-subtitle">
            View and manage all the projects you have added. You can edit project details even after a project becomes active.
          </p>
        </div>

        {/* Content Section: White Card layout */}
        <section className="projects-container-card">
          {/* Top Section: Search, Filters, Add Button */}
          <div className="projects-toolbar">
            <div className="toolbar-search-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="search-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="project-search-input"
                type="text"
                className="search-input"
                placeholder="Search by project title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search projects by title"
              />
            </div>

            <div className="toolbar-filters-group">
              <div className="filter-dropdown-wrapper">
                <select
                  id="project-status-filter"
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  aria-label="Filter projects by status"
                >
                  <option value="All">All Statuses</option>
                  <option value="Published">Published</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button
                id="add-project-btn"
                className="add-new-btn"
                onClick={handleAddNewProjectClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="add-icon"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Add New Project</span>
              </button>
            </div>
          </div>

          {/* Table Component */}
          <ProjectsTable
            projects={filteredProjects}
            onViewDetails={handleViewDetails}
            onEditProject={handleEditProject}
          />

          {/* Bottom Section: Total Projects count */}
          <div className="projects-summary-footer">
            <span className="total-projects-text">
              Total Projects: <strong id="total-projects-count">{filteredProjects.length}</strong>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
