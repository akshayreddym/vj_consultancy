import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProjectsHeader from '../../components/Projects/ProjectsHeader/ProjectsHeader';
import ProjectsSearchBar from '../../components/Projects/ProjectsSearchBar/ProjectsSearchBar';
import ProjectsTabs from '../../components/Projects/ProjectsTabs/ProjectsTabs';
import ProjectsTable from '../../components/Projects/ProjectsTable/ProjectsTable';
import './Projects.css';

const MOCK_PROJECTS = [
  {
    id: 1,
    name: 'College ERP Portal',
    client: 'VJ Consultancy',
    domain: 'Web Development',
    status: 'In Progress',
    progress: 60,
    deadline: 'Jul 15, 2026',
    iconName: 'Code'
  },
  {
    id: 2,
    name: 'Student Feedback System',
    client: 'VJ Consultancy',
    domain: 'Mobile Development',
    status: 'In Progress',
    progress: 65,
    deadline: 'Aug 10, 2026',
    iconName: 'Smartphone'
  },
  {
    id: 3,
    name: 'E-Commerce Analytics Engine',
    client: 'VJ Consultancy',
    domain: 'Data Science',
    status: 'Completed',
    progress: 100,
    deadline: 'May 01, 2026',
    iconName: 'TrendingUp'
  },
  {
    id: 4,
    name: 'Alumni Connect Platform',
    client: 'VJ Consultancy',
    domain: 'Cloud Computing',
    status: 'Completed',
    progress: 100,
    deadline: 'Apr 20, 2026',
    iconName: 'Globe'
  },
  {
    id: 5,
    name: 'Hospital Management Suite',
    client: 'VJ Consultancy',
    domain: 'Web Development',
    status: 'On Hold',
    progress: null,
    deadline: 'Sep 30, 2026',
    iconName: 'Database'
  }
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? '' : prev));
    }, 4000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOpenProject = (id, status) => {
    if (status === 'In Progress') {
      navigate(`/projects-workspace/${id}`);
    } else if (status === 'Completed') {
      navigate(`/project-summary/${id}`);
    } else if (status === 'On Hold') {
      // do nothing
    }
  };

  // Calculate filter counts based on total mock projects
  const counts = {
    all: MOCK_PROJECTS.length,
    inProgress: MOCK_PROJECTS.filter((p) => p.status === 'In Progress').length,
    completed: MOCK_PROJECTS.filter((p) => p.status === 'Completed').length,
    onHold: MOCK_PROJECTS.filter((p) => p.status === 'On Hold').length,
  };

  // Filter projects based on tab and search query
  const filteredProjects = MOCK_PROJECTS.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === 'All' || project.status === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="student-projects-layout">
      {/* Existing Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="student-projects-main">
        {/* Existing Top Navbar component for Mobile viewport toggle */}
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
        <ProjectsHeader />

        {/* Dashboard White Card */}
        <section className="student-projects-card">
          {/* Search bar and Filters toolbar */}
          <div className="student-projects-toolbar">
            <ProjectsSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Filter tabs */}
          <ProjectsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            counts={counts}
          />

          <ProjectsTable
            projects={filteredProjects}
            onOpenProject={handleOpenProject}
          />
        </section>
      </div>
      {toastMessage && (
        <div className="toast-notification-student">
          <div className="toast-content-student">
            <span className="toast-text-student">{toastMessage}</span>
            <button 
              className="toast-close-btn-student" 
              onClick={() => setToastMessage('')}
              type="button"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
