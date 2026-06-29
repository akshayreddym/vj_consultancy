import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import MyProjects from './pages/MyProjects/MyProjects';
import AddProject from './pages/AddProject/AddProject';
import BrowseProjects from './pages/BrowseProject/BrowseProject';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import Projects from './pages/Projects/Projects';
import ProjectsWorkspace from './pages/ProjectsWorkspace/ProjectsWorkspace';
import MyApplications from './pages/MyApplications/MyApplications';
import CompletedProjectSummary from './pages/CompletedProjectSummary/CompletedProjectSummary';
import MyProfile from './pages/MyProfile/MyProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-projects" element={<MyProjects />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/browse-projects" element={<BrowseProjects />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects-workspace/:id" element={<ProjectsWorkspace />} />
        <Route path="/projects-workspace" element={<ProjectsWorkspace />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/project-summary/:id" element={<CompletedProjectSummary />} />
        <Route path="/project-summary" element={<CompletedProjectSummary />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
