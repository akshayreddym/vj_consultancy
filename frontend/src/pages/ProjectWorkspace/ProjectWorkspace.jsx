import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import WorkspaceHeader from '../../components/ProjectWorkspace/WorkspaceHeader/WorkspaceHeader';
import Overview from '../../components/ProjectWorkspace/Overview/Overview';
import Students from '../../components/ProjectWorkspace/Students/Students';
import MileStones from '../../components/ProjectWorkspace/MileStones/MileStones';
import Documents from '../../components/ProjectWorkspace/Documents/Documents';
import Reviews from '../../components/ProjectWorkspace/Reviews/Reviews';
import ProgressTrack from '../../components/ProjectWorkspace/ProgressTrack/ProgressTrack';
import ActivityLog from '../../components/ProjectWorkspace/ActivityLog/ActivityLog';
import './ProjectWorkspace.css';

// Default Fallback Project in case workspace is opened directly
const defaultFallbackProject = {
  id: 'proj-1',
  name: 'AI-Powered Customer Support Chatbot',
  client: 'TechCorp Inc.',
  description: 'Developing a generative AI-based chatbot integrated with enterprise knowledge base APIs to resolve customer query workflows in real-time.',
  techStack: ['React', 'Python', 'FastAPI', 'LangChain', 'PyTorch'],
  owner: 'Dr. Rajesh Patel (Associate Professor, CSE)',
  progress: 65,
  status: 'On Track',
  deadline: 'August 15, 2026',
  students: [
    { id: 'stud-1', name: 'Srinivas Rao', role: 'AI Integration', progress: 70, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop' },
    { id: 'stud-2', name: 'Karan Patil', role: 'Backend API Developer', progress: 60, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=128&h=128&fit=crop' }
  ],
  milestones: [
    { name: 'Requirements', status: 'Completed', progress: 100 },
    { name: 'UI Design', status: 'Completed', progress: 100 },
    { name: 'Frontend', status: 'In Progress', progress: 60 },
    { name: 'Backend', status: 'In Progress', progress: 50 },
    { name: 'Testing', status: 'Not Started', progress: 0 },
    { name: 'Deployment', status: 'Not Started', progress: 0 }
  ],
  documents: [
    { id: 'doc-1', name: 'API_Contract_v1.pdf', uploadedBy: 'Karan Patil', uploadDate: 'June 22, 2026', milestone: 'Backend', status: 'Approved', comments: 'Looks clean and fully covers specifications.' },
    { id: 'doc-2', name: 'Chatbot_UI_Wireframes.pdf', uploadedBy: 'Srinivas Rao', uploadDate: 'June 24, 2026', milestone: 'UI Design', status: 'Approved', comments: 'Interface meets client brand guidelines.' },
    { id: 'doc-3', name: 'Knowledge_Base_RAG_Flow.pdf', uploadedBy: 'Srinivas Rao', uploadDate: 'June 28, 2026', milestone: 'Requirements', status: 'Pending Review', comments: '' }
  ],
  activityLog: [
    { id: 'act-1', message: 'Srinivas Rao uploaded Knowledge_Base_RAG_Flow.pdf', timestamp: '2 hours ago' },
    { id: 'act-2', message: 'Chatbot_UI_Wireframes.pdf approved by coordinator', timestamp: '2 days ago' },
    { id: 'act-3', message: 'Karan Patil completed Backend milestone APIs setup', timestamp: '4 days ago' }
  ]
};

const mockProjects = [defaultFallbackProject];

export default function ProjectWorkspace() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [project, setProject] = useState(() => {
    return location.state?.project || mockProjects[0];
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewingDocId, setReviewingDocId] = useState(null);

  // Load project from router location state, fallback if direct access
  useEffect(() => {
    setProject(location.state?.project || mockProjects[0]);
  }, [location.state]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleBackToLifecycle = () => {
    navigate('/coordinator/lifecycle');
  };

  // Switch to review tab and select the clicked document
  const handleReviewDocFromTable = (docId) => {
    setReviewingDocId(docId);
    setActiveTab('reviews');
  };

  // Toggle milestone completion and recalculate overall progress
  const handleToggleMilestone = (milestoneName) => {
    setProject((prevProject) => {
      if (!prevProject) return prevProject;

      const updatedMilestones = prevProject.milestones.map((m) => {
        if (m.name === milestoneName) {
          const isCompleted = m.status === 'Completed';
          return {
            ...m,
            status: isCompleted ? 'In Progress' : 'Completed',
            progress: isCompleted ? 50 : 100
          };
        }
        return m;
      });

      // Recalculate overall progress
      const totalProgress = updatedMilestones.reduce((sum, m) => sum + m.progress, 0);
      const overallProgress = Math.round(totalProgress / updatedMilestones.length);

      // Determine status based on progress
      let overallStatus = prevProject.status;
      if (overallProgress === 100) {
        overallStatus = 'Completed';
      } else if (prevProject.status === 'Completed') {
        overallStatus = 'On Track';
      }

      // Add to timeline log
      const targetMilestone = prevProject.milestones.find(m => m.name === milestoneName);
      const newStatus = targetMilestone?.status === 'Completed' ? 'In Progress' : 'Completed';
      const logMessage = `Coordinator updated milestone "${milestoneName}" to ${newStatus}`;
      
      const newLog = {
        id: `act-new-${Date.now()}`,
        message: logMessage,
        timestamp: 'Just now'
      };

      return {
        ...prevProject,
        milestones: updatedMilestones,
        progress: overallProgress,
        status: overallStatus,
        activityLog: [newLog, ...prevProject.activityLog]
      };
    });
  };

  // Commit document review evaluation
  const handleCommitReview = (docId, comments, status) => {
    setProject((prevProject) => {
      if (!prevProject) return prevProject;

      const targetDoc = prevProject.documents.find(d => d.id === docId);
      if (!targetDoc) return prevProject;

      const updatedDocs = prevProject.documents.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            comments,
            status
          };
        }
        return doc;
      });

      const logMessage = `Coordinator reviewed "${targetDoc.name}": marked as ${status}`;
      const newLog = {
        id: `act-new-${Date.now()}`,
        message: logMessage,
        timestamp: 'Just now'
      };

      return {
        ...prevProject,
        documents: updatedDocs,
        activityLog: [newLog, ...prevProject.activityLog]
      };
    });

    // Reset selection
    setReviewingDocId(null);
    // Move back to documents view
    setActiveTab('documents');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview project={project} />;
      case 'students':
        return <Students students={project.students} />;
      case 'milestones':
        return (
          <MileStones 
            milestones={project.milestones} 
            onToggleMilestone={handleToggleMilestone} 
          />
        );
      case 'documents':
        return (
          <Documents 
            documents={project.documents} 
            onReview={handleReviewDocFromTable} 
          />
        );
      case 'reviews':
        return (
          <Reviews 
            project={project} 
            reviewingDocId={reviewingDocId} 
            onSelectDoc={setReviewingDocId} 
            onCommitReview={handleCommitReview} 
          />
        );
      case 'progress':
        return <ProgressTrack project={project} />;
      case 'activity':
        return <ActivityLog activityLog={project.activityLog} />;
      default:
        return <Overview project={project} />;
    }
  };

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'students', label: 'Students' },
    { key: 'milestones', label: 'Milestones & Phases' },
    { key: 'documents', label: 'Documents & Submissions' },
    { key: 'reviews', label: 'Reviews Workspace' },
    { key: 'progress', label: 'Progress Tracker' },
    { key: 'activity', label: 'Activity Log' }
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="dashboard-main">
        {/* Mobile Navbar */}
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

        {/* Header navigation and titles */}
        <WorkspaceHeader project={project} onBack={handleBackToLifecycle} />

        {/* Tab Buttons Row */}
        <div className="workspace-tabs-nav-bar">
          <div className="workspace-tabs-row">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`workspace-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Renders Tab Panels */}
        <div className="workspace-tab-content-panel">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
