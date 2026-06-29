import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import WorkspaceHeader from '../../components/ProjectsWorkspace/WorkspaceHeader/WorkspaceHeader';
import WorkspaceTabs from '../../components/ProjectsWorkspace/WorkspaceTabs/WorkspaceTabs';
import RecentTasks from '../../components/ProjectsWorkspace/RecentTasks/RecentTasks';
import RecentUploads from '../../components/ProjectsWorkspace/RecentUploads/RecentUploads';
import ActivityFeed from '../../components/ProjectsWorkspace/ActivityFeed/ActivityFeed';
import ProjectNotes from '../../components/ProjectsWorkspace/ProjectNotes/ProjectNotes';
import EmptyWorkspace from '../../components/ProjectsWorkspace/EmptyWorkspace/EmptyWorkspace';
import { CheckSquare, Folder, Calendar, Activity, Info, Users, Cpu, Layers } from 'lucide-react';
import './ProjectsWorkspace.css';

const MOCK_PROJECTS = [
  {
    id: 1,
    name: 'College ERP Portal',
    client: 'VJ Consultancy',
    domain: 'Web Development',
    status: 'In Progress',
    progress: 60,
    deadline: '30 June 2025',
    iconName: 'Code',
    description: 'Web application for managing college operations.',
    coordinator: 'Dr. V. J. Prasad',
    duration: '3 Months',
    techStack: 'React, CSS Grid, Flexbox, Lucide React'
  },
  {
    id: 2,
    name: 'Student Feedback System',
    client: 'VJ Consultancy',
    domain: 'Mobile Development',
    status: 'In Progress',
    progress: 65,
    deadline: '10 August 2026',
    iconName: 'Smartphone',
    description: 'Mobile application for student feedback collection.',
    coordinator: 'Prof. A. K. Rao',
    duration: '2.5 Months',
    techStack: 'React Native, Expo, Redux, Node.js'
  }
];

export default function ProjectsWorkspace() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Resolve active project by ID (default to first active project if no ID parameter is specified)
  const projectId = id ? parseInt(id, 10) : 1;
  const project = MOCK_PROJECTS.find((p) => p.id === projectId && p.status === 'In Progress');

  return (
    <div className="workspace-layout">
      {/* Sidebar Integration */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="workspace-main">
        {/* Top Navbar for Mobile/Tablet viewport toggle */}
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

        {!project ? (
          <EmptyWorkspace />
        ) : (
          <div className="workspace-content">
            {/* Header section */}
            <WorkspaceHeader project={project} />

            {/* Tab Navigation */}
            <WorkspaceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Overview tab content */}
            {activeTab === 'overview' && (
              <div className="tab-view-overview">
                {/* Four Overview Cards */}
                <div className="overview-cards-grid">
                  {/* Card 1: Task Overview */}
                  <div className="overview-card">
                    <div className="card-header-row">
                      <span className="card-title">Task Overview</span>
                      <div className="card-icon-box bg-purple-light">
                        <CheckSquare className="card-icon" size={20} />
                      </div>
                    </div>
                    <div className="card-main-val">12 Tasks</div>
                    <div className="card-sub-grid">
                      <span className="card-sub-item completed-val">7 Completed</span>
                      <span className="card-sub-item progress-val">3 In Progress</span>
                      <span className="card-sub-item pending-val">2 Pending</span>
                    </div>
                  </div>

                  {/* Card 2: Files Uploaded */}
                  <div className="overview-card">
                    <div className="card-header-row">
                      <span className="card-title">Files Uploaded</span>
                      <div className="card-icon-box bg-blue-light">
                        <Folder className="card-icon" size={20} />
                      </div>
                    </div>
                    <div className="card-main-val">18 Files</div>
                    <span className="card-sub-text">Total Size: 2.4 GB</span>
                  </div>

                  {/* Card 3: Upcoming Milestone */}
                  <div className="overview-card">
                    <div className="card-header-row">
                      <span className="card-title">Upcoming Milestone</span>
                      <div className="card-icon-box bg-orange-light">
                        <Calendar className="card-icon" size={20} />
                      </div>
                    </div>
                    <div className="card-main-val text-truncate">Phase 2 Submission</div>
                    <span className="card-sub-text text-orange font-semibold">Due in 8 Days</span>
                  </div>

                  {/* Card 4: Last Activity */}
                  <div className="overview-card">
                    <div className="card-header-row">
                      <span className="card-title">Last Activity</span>
                      <div className="card-icon-box bg-green-light">
                        <Activity className="card-icon" size={20} />
                      </div>
                    </div>
                    <div className="card-main-val text-truncate">UI Module Documentation</div>
                    <span className="card-sub-text">Updated 2 Hours Ago</span>
                  </div>
                </div>

                {/* Project notes stacked below overview cards on overview tab */}
                <div className="overview-notes-wrapper">
                  <ProjectNotes />
                </div>
              </div>
            )}

            {/* Tasks Tab View */}
            {activeTab === 'tasks' && (
              <div className="tab-view-single">
                <RecentTasks />
              </div>
            )}

            {/* Uploads Tab View */}
            {activeTab === 'uploads' && (
              <div className="tab-view-single">
                <RecentUploads showDragDrop={true} />
              </div>
            )}

            {/* Progress Tab View */}
            {activeTab === 'progress' && (
              <div className="tab-view-progress">
                <div className="progress-details-card">
                  <h3 className="progress-card-title">Progress Report</h3>
                  
                  <div className="progress-metric-row">
                    <div className="metric-item">
                      <span className="metric-label">Overall Progress</span>
                      <span className="metric-value">{project.progress}%</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Current Sprint</span>
                      <span className="metric-value">Sprint 3: Core Features</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Estimated Completion</span>
                      <span className="metric-value">15 August 2026</span>
                    </div>
                  </div>

                  <div className="milestones-tracker-section">
                    <h4 className="tracker-subtitle">Milestones Progress</h4>
                    <div className="milestone-items-stack">
                      {/* Milestone 1 */}
                      <div className="milestone-progress-row">
                        <div className="milestone-text-info">
                          <span className="milestone-name">Phase 1: Research & Wireframing</span>
                          <span className="milestone-pct">100%</span>
                        </div>
                        <div className="milestone-bar-track">
                          <div className="milestone-bar-fill completed" style={{ width: '100%' }}></div>
                        </div>
                      </div>

                      {/* Milestone 2 */}
                      <div className="milestone-progress-row">
                        <div className="milestone-text-info">
                          <span className="milestone-name">Phase 2: Database Schema & Authentication</span>
                          <span className="milestone-pct">30%</span>
                        </div>
                        <div className="milestone-bar-track">
                          <div className="milestone-bar-fill in-progress" style={{ width: '30%' }}></div>
                        </div>
                      </div>

                      {/* Milestone 3 */}
                      <div className="milestone-progress-row">
                        <div className="milestone-text-info">
                          <span className="milestone-name">Phase 3: Module Integration & API testing</span>
                          <span className="milestone-pct">0%</span>
                        </div>
                        <div className="milestone-bar-track">
                          <div className="milestone-bar-fill pending" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="upcoming-deliverables-box">
                    <h4 className="tracker-subtitle">Upcoming Deliverables</h4>
                    <div className="deliverable-alert-item">
                      <Calendar size={18} className="deliverable-alert-icon" />
                      <div className="deliverable-alert-details">
                        <span className="deliverable-alert-name">Phase 2 Submission</span>
                        <span className="deliverable-alert-date">Due in 8 days (07 July 2026)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team & Info Tab View */}
            {activeTab === 'team' && (
              <div className="tab-view-team">
                <div className="team-info-card">
                  <div className="card-title-with-icon">
                    <Users size={18} className="card-section-icon text-purple" />
                    <h3 className="team-card-title">Project Team</h3>
                  </div>
                  
                  <div className="team-list">
                    <div className="team-member-item">
                      <div className="member-avatar bg-blue">AS</div>
                      <div className="member-info">
                        <span className="member-name">Anita Sharma</span>
                        <span className="member-role">Team Lead & Frontend Developer</span>
                      </div>
                    </div>
                    <div className="team-member-item">
                      <div className="member-avatar bg-purple">RI</div>
                      <div className="member-info">
                        <span className="member-name">Rahul Iyer</span>
                        <span className="member-role">Backend Developer</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="team-info-card">
                  <div className="card-title-with-icon">
                    <Info size={18} className="card-section-icon text-blue" />
                    <h3 className="team-card-title">Project Information</h3>
                  </div>
                  
                  <div className="consultancy-details">
                    <div className="detail-row">
                      <span className="detail-label">Client</span>
                      <span className="detail-value">{project.client}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Project Coordinator</span>
                      <span className="detail-value">{project.coordinator}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Domain</span>
                      <span className="detail-value">{project.domain}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Duration</span>
                      <span className="detail-value">{project.duration}</span>
                    </div>
                    <div className="detail-row flex-column">
                      <span className="detail-label">Technology Stack</span>
                      <span className="detail-value text-stack-box">
                        <Cpu size={14} style={{ marginRight: '6px' }} />
                        {project.techStack}
                      </span>
                    </div>
                    <div className="detail-row flex-column" style={{ borderBottom: 'none' }}>
                      <span className="detail-label">Project Description</span>
                      <span className="detail-value text-desc-box">
                        <Layers size={14} style={{ marginRight: '6px', flexShrink: 0 }} />
                        {project.description}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab View */}
            {activeTab === 'notifications' && (
              <div className="tab-view-single">
                <ActivityFeed />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
