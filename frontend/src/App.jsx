import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";

// Sourcer Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import MyProjects from "./pages/MyProjects/MyProjects";
import AddProject from "./pages/AddProject/AddProject";
import Projects from "./pages/Projects/Projects";
import ProjectsWorkspace from "./pages/ProjectsWorkspace/ProjectsWorkspace";
import CompletedProjectSummary from "./pages/CompletedProjectSummary/CompletedProjectSummary";
import MyProfile from "./pages/MyProfile/MyProfile";

// Student Pages
import BrowseProjects from "./pages/BrowseProject/BrowseProject";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import MyApplications from "./pages/MyApplications/MyApplications";

//coordinator pages
import CoordinatorDashboard from "./pages/CoordinatorDashboard/CoordinatorDashboard";
import ApplicationManagement from "./pages/ApplicationManagement/ApplicationManagement";
import StudentEvaluation from "./pages/StudentEvaluation/StudentEvaluation";
import ProjectLifeCycle from "./pages/ProjectLifeCycle/ProjectLifeCycle";
import ProjectWorkspace from "./pages/ProjectWorkspace/ProjectWorkspace";
function App() {
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/my-projects" element={<MyProjects />} />

              <Route path="/add-project" element={<AddProject />} />

              <Route
                path="/browse-projects"
                element={<BrowseProjects />}
              />

              <Route
                path="/student-dashboard"
                element={<StudentDashboard />}
              />

              <Route path="/projects" element={<Projects />} />

              <Route
                path="/projects-workspace/:id"
                element={<ProjectsWorkspace />}
              />

              <Route
                path="/projects-workspace"
                element={<ProjectsWorkspace />}
              />

              <Route
                path="/my-applications"
                element={<MyApplications />}
              />

              <Route
                path="/project-summary/:id"
                element={<CompletedProjectSummary />}
              />

              <Route
                path="/project-summary"
                element={<CompletedProjectSummary />}
              />

              <Route path="/profile" element={<MyProfile />} />

              <Route path="/my-profile" element={<MyProfile />} />

              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              />
              <Route
                 path="/coordinator/dashboard"
                 element={<CoordinatorDashboard />}
                />  
                <Route
                path="/coordinator/application-management"
                   element={<ApplicationManagement />}
                  />
                <Route
                   path="/coordinator/applications"
                   element={<Navigate to="/coordinator/application-management" replace />}
                 />
                  <Route
                    path="/coordinator/evaluation"
                    element={<StudentEvaluation />}
                  />
                  <Route
                    path="/coordinator/lifecycle"
                    element={<ProjectLifeCycle />}
                  />
                  <Route
                    path="/coordinator/project-workspace"
                    element={<ProjectWorkspace />}
                  />
              

              <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
              />

            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;