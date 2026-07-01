import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import EvaluationQueue from '../../components/StudentEvaluation/EvaluationQueue/EvaluationQueue';
import CandidateEvaluation from '../../components/StudentEvaluation/CandidateEvaluation/CandidateEvaluation';
import './StudentEvaluation.css';

// Shortlisted Candidates Mock Data
const initialCandidates = [
  {
    id: 'cand-1',
    evaluationStatus: 'Pending',
    interviewStatus: 'Awaiting Interview',
    appliedProject: 'AI-Powered Customer Support Chatbot',
    shortlistedOn: 'June 25, 2026',
    profile: {
      name: 'Srinivas Rao',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      branch: 'Computer Engineering',
      year: '4th Year',
      email: 'srinivas.rao@vjti.ac.in',
      phone: '+91 98201 12345',
      location: 'Mumbai, Maharashtra',
      skills: ['Python', 'React', 'LangChain', 'FastAPI', 'PyTorch'],
      resumeUrl: '#'
    },
    academic: {
      college: 'Veermata Jijabai Technological Institute (VJTI)',
      branch: 'Computer Engineering',
      year: '4th Year',
      cgpa: '9.4'
    },
    portfolio: {
      github: 'https://github.com/srinivasrao',
      linkedin: 'https://linkedin.com/in/srinivasrao',
      portfolio: 'https://srinivas.dev'
    },
    interview: {
      platform: 'Google Meet',
      link: '',
      date: '',
      time: ''
    },
    scores: {
      technicalKnowledge: 0,
      communicationSkills: 0,
      problemSolving: 0,
      confidence: 0,
      portfolioQuality: 0
    },
    remarks: ''
  },
  {
    id: 'cand-2',
    evaluationStatus: 'Pending',
    interviewStatus: 'Interview Scheduled',
    appliedProject: 'Blockchain-Based Supply Chain Tracker',
    shortlistedOn: 'June 26, 2026',
    profile: {
      name: 'Meera Nair',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      branch: 'Information Technology',
      year: '4th Year',
      email: 'meera.nair@vjti.ac.in',
      phone: '+91 98112 34567',
      location: 'Kalyan, Maharashtra',
      skills: ['Solidity', 'Hardhat', 'Ether.js', 'React', 'Go'],
      resumeUrl: '#'
    },
    academic: {
      college: 'Veermata Jijabai Technological Institute (VJTI)',
      branch: 'Information Technology',
      year: '4th Year',
      cgpa: '9.1'
    },
    portfolio: {
      github: 'https://github.com/meeranair',
      linkedin: 'https://linkedin.com/in/meeranair',
      portfolio: 'https://meera.blockchain'
    },
    interview: {
      platform: 'Google Meet',
      link: 'https://meet.google.com/vjc-abc-defg',
      date: '2026-07-02',
      time: '14:30'
    },
    scores: {
      technicalKnowledge: 0,
      communicationSkills: 0,
      problemSolving: 0,
      confidence: 0,
      portfolioQuality: 0
    },
    remarks: ''
  },
  {
    id: 'cand-3',
    evaluationStatus: 'Passed',
    interviewStatus: 'Interview Completed',
    appliedProject: 'IoT Smart Agriculture System',
    shortlistedOn: 'June 24, 2026',
    profile: {
      name: 'Aditya Deshmukh',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      branch: 'Electronics Engineering',
      year: '4th Year',
      email: 'aditya.d@vjti.ac.in',
      phone: '+91 98200 44556',
      location: 'Pune, Maharashtra',
      skills: ['C++', 'Arduino', 'ESP32', 'MQTT', 'LoRaWAN'],
      resumeUrl: '#'
    },
    academic: {
      college: 'Veermata Jijabai Technological Institute (VJTI)',
      branch: 'Electronics Engineering',
      year: '4th Year',
      cgpa: '8.6'
    },
    portfolio: {
      github: 'https://github.com/adityadeshmukh',
      linkedin: 'https://linkedin.com/in/adityadeshmukh',
      portfolio: 'https://aditya.dev'
    },
    interview: {
      platform: 'Google Meet',
      link: 'https://meet.google.com/vjc-karan-patil',
      date: '2026-06-29',
      time: '11:00'
    },
    scores: {
      technicalKnowledge: 8,
      communicationSkills: 9,
      problemSolving: 8,
      confidence: 8,
      portfolioQuality: 9
    },
    remarks: 'Strong understanding of embedded systems and firmware optimization. Good communication skills and solid demonstration of past PCB layouts.'
  },
  {
    id: 'cand-4',
    evaluationStatus: 'Pending',
    interviewStatus: 'Awaiting Interview',
    appliedProject: 'Mental Health Companion Mobile App',
    shortlistedOn: 'June 28, 2026',
    profile: {
      name: 'Pooja Hegde',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      branch: 'Information Technology',
      year: '4th Year',
      email: 'pooja.h@vjti.ac.in',
      phone: '+91 99308 11223',
      location: 'Mumbai, Maharashtra',
      skills: ['Figma', 'UI Design', 'React Native', 'Expo', 'Prototyping'],
      resumeUrl: '#'
    },
    academic: {
      college: 'Veermata Jijabai Technological Institute (VJTI)',
      branch: 'Information Technology',
      year: '4th Year',
      cgpa: '9.3'
    },
    portfolio: {
      github: 'https://github.com/poojahegde',
      linkedin: 'https://linkedin.com/in/poojahegde',
      portfolio: 'https://pooja.design'
    },
    interview: {
      platform: 'Google Meet',
      link: '',
      date: '',
      time: ''
    },
    scores: {
      technicalKnowledge: 0,
      communicationSkills: 0,
      problemSolving: 0,
      confidence: 0,
      portfolioQuality: 0
    },
    remarks: ''
  },
  {
    id: 'cand-5',
    evaluationStatus: 'Pending',
    interviewStatus: 'Awaiting Interview',
    appliedProject: 'E-Commerce Analytics Platform',
    shortlistedOn: 'June 27, 2026',
    profile: {
      name: 'Karan Patil',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
      branch: 'Computer Engineering',
      year: '4th Year',
      email: 'karan.patil@vjti.ac.in',
      phone: '+91 97022 44556',
      location: 'Thane, Maharashtra',
      skills: ['Python', 'SQL', 'Apache Spark', 'Tableau', 'Kafka'],
      resumeUrl: '#'
    },
    academic: {
      college: 'Veermata Jijabai Technological Institute (VJTI)',
      branch: 'Computer Engineering',
      year: '4th Year',
      cgpa: '9.2'
    },
    portfolio: {
      github: 'https://github.com/karanpatil',
      linkedin: 'https://linkedin.com/in/karanpatil',
      portfolio: 'https://karan.codes'
    },
    interview: {
      platform: 'Google Meet',
      link: '',
      date: '',
      time: ''
    },
    scores: {
      technicalKnowledge: 0,
      communicationSkills: 0,
      problemSolving: 0,
      confidence: 0,
      portfolioQuality: 0
    },
    remarks: ''
  },
  {
    id: 'cand-6',
    evaluationStatus: 'Failed',
    interviewStatus: 'Interview Completed',
    appliedProject: 'Cloud-Native Kubernetes Operator',
    shortlistedOn: 'June 25, 2026',
    profile: {
      name: 'Ananya Sen',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
      branch: 'Computer Engineering',
      year: '4th Year',
      email: 'ananya.sen@vjti.ac.in',
      phone: '+91 99672 55667',
      location: 'Mumbai, Maharashtra',
      skills: ['Go', 'Docker', 'Kubernetes', 'CI/CD', 'Bash'],
      resumeUrl: '#'
    },
    academic: {
      college: 'Veermata Jijabai Technological Institute (VJTI)',
      branch: 'Computer Engineering',
      year: '4th Year',
      cgpa: '9.5'
    },
    portfolio: {
      github: 'https://github.com/ananyasen',
      linkedin: 'https://linkedin.com/in/ananyasen',
      portfolio: 'https://ananyasen.cloud'
    },
    interview: {
      platform: 'Google Meet',
      link: 'https://meet.google.com/vjc-ananya-sen',
      date: '2026-06-28',
      time: '15:00'
    },
    scores: {
      technicalKnowledge: 4,
      communicationSkills: 5,
      problemSolving: 4,
      confidence: 5,
      portfolioQuality: 4
    },
    remarks: 'Candidate struggled with standard Go channels and concurrency concepts. Showed basic Docker setup but lacks depth in Kubernetes API resource controllers.'
  }
];

export default function StudentEvaluation() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [view, setView] = useState('queue'); // 'queue' | 'evaluate'
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  
  // Filtering and searching states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Sidebar toggles
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Read Router state on mount/change
  useEffect(() => {
    if (location.state?.applicant) {
      const applicant = location.state.applicant;
      // Match candidate by ID or email
      const matchedCand = candidates.find(
        c => c.id === applicant.id || c.profile?.email === applicant.profile?.email
      );
      if (matchedCand && selectedCandidateId !== matchedCand.id) {
        setSelectedCandidateId(matchedCand.id);
        setView('evaluate');
      }
    }
  }, [location.state, candidates, selectedCandidateId]);

  // Queue actions
  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setView('evaluate');
  };

  const handleBackToQueue = () => {
    if (location.state?.from === 'application-management') {
      navigate('/coordinator/application-management');
    } else {
      setSelectedCandidateId(null);
      setView('queue');
    }
  };

  // State mutations
  const handleScheduleInterview = (candidateId, meetingDetails) => {
    setCandidates(prev => 
      prev.map(cand => {
        if (cand.id === candidateId) {
          return {
            ...cand,
            interviewStatus: 'Interview Scheduled',
            interview: {
              ...cand.interview,
              ...meetingDetails
            }
          };
        }
        return cand;
      })
    );
  };

  const handleCommitEvaluation = (candidateId, scores, remarks, decision) => {
    setCandidates(prev => 
      prev.map(cand => {
        if (cand.id === candidateId) {
          return {
            ...cand,
            evaluationStatus: decision,
            interviewStatus: 'Interview Completed',
            scores,
            remarks
          };
        }
        return cand;
      })
    );
    // Return back to queue list
    setView('queue');
    setSelectedCandidateId(null);
  };



  const activeCandidate = candidates.find(c => c.id === selectedCandidateId);

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

        {/* Dashboard Title Header */}
        <div className="eval-header-row">
          <div className="header-text-group">
            <h1 className="eval-page-title">Student Evaluation</h1>
            <p className="eval-page-subtitle">
              Review shortlisted students, schedule interviews and record evaluation results.
            </p>
          </div>
        </div>

        {/* Dynamic content rendering */}
        <div className="eval-content-body">
          {view === 'queue' ? (
            <EvaluationQueue
              candidates={candidates}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onSelectCandidate={handleSelectCandidate}
            />
          ) : (
            <CandidateEvaluation
              candidate={activeCandidate}
              onSchedule={handleScheduleInterview}
              onCommit={handleCommitEvaluation}
              onBack={handleBackToQueue}
            />
          )}
        </div>
      </div>
    </div>
  );
}
