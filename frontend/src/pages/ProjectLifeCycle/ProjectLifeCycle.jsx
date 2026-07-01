import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchBar from '../../components/ProjectLifeCycle/SearchBar/SearchBar';
import StatusFilter from '../../components/ProjectLifeCycle/StatusFilter/StatusFilter';
import ProjectCard from '../../components/ProjectLifeCycle/ProjectCard/ProjectCard';
import './ProjectLifeCycle.css';

// Rich Mock Data (6 Consultancy Projects)
const initialProjects = [
  {
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
  },
  {
    id: 'proj-2',
    name: 'Blockchain supply Chain tracker',
    client: 'LogiChain Global',
    description: 'An immutable tracking system leveraging Ethereum Smart Contracts to register logistics events, verifying food safety criteria across transit pipelines.',
    techStack: ['Solidity', 'Hardhat', 'Ether.js', 'React', 'Go'],
    owner: 'Prof. Smita Patil (Assistant Professor, IT)',
    progress: 40,
    status: 'At Risk',
    deadline: 'September 10, 2026',
    students: [
      { id: 'stud-3', name: 'Meera Nair', role: 'Smart Contract Dev', progress: 45, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop' }
    ],
    milestones: [
      { name: 'Requirements', status: 'Completed', progress: 100 },
      { name: 'UI Design', status: 'In Progress', progress: 50 },
      { name: 'Frontend', status: 'Not Started', progress: 0 },
      { name: 'Backend', status: 'In Progress', progress: 30 },
      { name: 'Testing', status: 'Not Started', progress: 0 },
      { name: 'Deployment', status: 'Not Started', progress: 0 }
    ],
    documents: [
      { id: 'doc-4', name: 'SmartContract_Audit.pdf', uploadedBy: 'Meera Nair', uploadDate: 'June 26, 2026', milestone: 'Backend', status: 'Changes Requested', comments: 'Re-entrancy vector detected in refund function. Fix immediately.' }
    ],
    activityLog: [
      { id: 'act-4', message: 'Meera Nair committed Solidity contract changes', timestamp: '1 day ago' },
      { id: 'act-5', message: 'Coordinator requested changes on SmartContract_Audit.pdf', timestamp: '3 days ago' }
    ]
  },
  {
    id: 'proj-3',
    name: 'IoT Smart Agriculture System',
    client: 'AgriGrow Ltd.',
    description: 'A hardware-software mesh grid that captures temperature, soil humidity, and NPK metrics to automate micro-sprinklers over cellular bands.',
    techStack: ['C++', 'Arduino', 'ESP32', 'MQTT', 'LoRaWAN'],
    owner: 'Dr. Anil Deshmukh (Head of Electronics Department)',
    progress: 100,
    status: 'Completed',
    deadline: 'June 20, 2026',
    students: [
      { id: 'stud-4', name: 'Aditya Deshmukh', role: 'Firmware Engineer', progress: 100, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop' }
    ],
    milestones: [
      { name: 'Requirements', status: 'Completed', progress: 100 },
      { name: 'UI Design', status: 'Completed', progress: 100 },
      { name: 'Frontend', status: 'Completed', progress: 100 },
      { name: 'Backend', status: 'Completed', progress: 100 },
      { name: 'Testing', status: 'Completed', progress: 100 },
      { name: 'Deployment', status: 'Completed', progress: 100 }
    ],
    documents: [
      { id: 'doc-5', name: 'PCB_Layout_v2.pdf', uploadedBy: 'Aditya Deshmukh', uploadDate: 'June 10, 2026', milestone: 'UI Design', status: 'Approved', comments: 'Layout validated and ready for printing.' },
      { id: 'doc-6', name: 'Field_Testing_Report.pdf', uploadedBy: 'Aditya Deshmukh', uploadDate: 'June 18, 2026', milestone: 'Testing', status: 'Approved', comments: 'Validated with 98.7% success metrics in field conditions.' }
    ],
    activityLog: [
      { id: 'act-6', message: 'AgriGrow Project marked Completed', timestamp: '1 week ago' },
      { id: 'act-7', message: 'Field_Testing_Report.pdf approved by coordinator', timestamp: '2 weeks ago' }
    ]
  },
  {
    id: 'proj-4',
    name: 'Mental Health Companion Mobile App',
    client: 'CareMind Org',
    description: 'React Native application integrating audio mood analysis and scheduled reflection calendars to support adolescent counseling groups.',
    techStack: ['React Native', 'Figma', 'Expo', 'Node.js', 'Express'],
    owner: 'Prof. Neha Sen (Assistant Professor, IT)',
    progress: 15,
    status: 'Delayed',
    deadline: 'October 05, 2026',
    students: [
      { id: 'stud-5', name: 'Pooja Hegde', role: 'UI/UX Designer', progress: 30, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop' }
    ],
    milestones: [
      { name: 'Requirements', status: 'In Progress', progress: 50 },
      { name: 'UI Design', status: 'Not Started', progress: 0 },
      { name: 'Frontend', status: 'Not Started', progress: 0 },
      { name: 'Backend', status: 'Not Started', progress: 0 },
      { name: 'Testing', status: 'Not Started', progress: 0 },
      { name: 'Deployment', status: 'Not Started', progress: 0 }
    ],
    documents: [
      { id: 'doc-7', name: 'Requirement_Specification_v1.pdf', uploadedBy: 'Pooja Hegde', uploadDate: 'June 27, 2026', milestone: 'Requirements', status: 'Pending Review', comments: '' }
    ],
    activityLog: [
      { id: 'act-8', message: 'Pooja Hegde uploaded Requirement_Specification_v1.pdf', timestamp: '3 days ago' }
    ]
  },
  {
    id: 'proj-5',
    name: 'E-Commerce Analytics Platform',
    client: 'RetailHub Solutions',
    description: 'A data pipeline tracking store conversions, catalog popularity, and user churn rates using big data batch analytics processors.',
    techStack: ['Python', 'SQL', 'Tableau', 'Apache Spark', 'Kafka'],
    owner: 'Dr. Sandeep Kulkarni (Associate Professor, CSE)',
    progress: 85,
    status: 'On Track',
    deadline: 'July 28, 2026',
    students: [
      { id: 'stud-6', name: 'Karan Patil', role: 'Data Engineer', progress: 90, photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=128&h=128&fit=crop' }
    ],
    milestones: [
      { name: 'Requirements', status: 'Completed', progress: 100 },
      { name: 'UI Design', status: 'Completed', progress: 100 },
      { name: 'Frontend', status: 'Completed', progress: 100 },
      { name: 'Backend', status: 'In Progress', progress: 80 },
      { name: 'Testing', status: 'In Progress', progress: 50 },
      { name: 'Deployment', status: 'Not Started', progress: 0 }
    ],
    documents: [
      { id: 'doc-8', name: 'Analytics_Pipeline_Dashboard.pdf', uploadedBy: 'Karan Patil', uploadDate: 'June 23, 2026', milestone: 'Frontend', status: 'Approved', comments: 'Tableau dashboard designs are validated.' },
      { id: 'doc-9', name: 'Kafka_Topic_Architecture.pdf', uploadedBy: 'Karan Patil', uploadDate: 'June 29, 2026', milestone: 'Backend', status: 'Pending Review', comments: '' }
    ],
    activityLog: [
      { id: 'act-9', message: 'Karan Patil uploaded Kafka_Topic_Architecture.pdf', timestamp: '1 day ago' },
      { id: 'act-10', message: 'Analytics_Pipeline_Dashboard.pdf approved', timestamp: '1 week ago' }
    ]
  },
  {
    id: 'proj-6',
    name: 'Cloud-Native Kubernetes Operator',
    client: 'DevopsCloud Corp',
    description: 'Custom Kubernetes Controller implementing automated failover, database backup, and schema migrations for distributed SQL pods.',
    techStack: ['Go', 'Docker', 'Kubernetes', 'Helm', 'CI/CD'],
    owner: 'Dr. Vivek Hegde (Professor, IT)',
    progress: 50,
    status: 'On Track',
    deadline: 'September 30, 2026',
    students: [
      { id: 'stud-7', name: 'Ananya Sen', role: 'Systems Engineer', progress: 55, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop' }
    ],
    milestones: [
      { name: 'Requirements', status: 'Completed', progress: 100 },
      { name: 'UI Design', status: 'Completed', progress: 100 },
      { name: 'Frontend', status: 'In Progress', progress: 40 },
      { name: 'Backend', status: 'In Progress', progress: 50 },
      { name: 'Testing', status: 'Not Started', progress: 0 },
      { name: 'Deployment', status: 'Not Started', progress: 0 }
    ],
    documents: [
      { id: 'doc-10', name: 'CRD_Manifests_v1.pdf', uploadedBy: 'Ananya Sen', uploadDate: 'June 25, 2026', milestone: 'Requirements', status: 'Approved', comments: 'Schema manifests verified.' }
    ],
    activityLog: [
      { id: 'act-11', message: 'Ananya Sen committed custom CRD manifest schemas', timestamp: '5 days ago' }
    ]
  }
];

export default function ProjectLifeCycle() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Sidebar actions
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Filters logic
  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      project.name.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'All' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate status counts
  const getCounts = () => {
    const counts = {
      All: projects.length,
      'On Track': 0,
      Completed: 0,
      'At Risk': 0,
      Delayed: 0
    };
    projects.forEach((p) => {
      if (counts[p.status] !== undefined) {
        counts[p.status]++;
      }
    });
    return counts;
  };

  const handleOpenProject = (project) => {
    navigate('/coordinator/project-workspace', {
      state: {
        project: project
      }
    });
  };



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

        {/* Header container */}
        <div className="lifecycle-header-row">
          <div className="header-text-group">
            <h1 className="lifecycle-page-title">Project Lifecycle</h1>
            <p className="lifecycle-page-subtitle">
              Monitor ongoing consultancy projects and manage project execution.
            </p>
          </div>
        </div>

        {/* Filters and Search toolbar */}
        <div className="lifecycle-toolbar">
          <StatusFilter
            activeFilter={statusFilter}
            onFilterChange={setStatusFilter}
            counts={getCounts()}
          />
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by project or client..."
          />
        </div>

        {/* Projects Cards Grid */}
        <div className="lifecycle-content">
          <div className="project-cards-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={handleOpenProject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
