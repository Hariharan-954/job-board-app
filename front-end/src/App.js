import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import JobList from './pages/JobList';
import AppliedJobs from './pages/AppliedJobs';
import Header from './components/Header';
import PostedJobs from './pages/PostedJobs';
import SavedJobs from './pages/SavedJobs';
import SelectRole from './pages/SelectRole';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const role = localStorage.getItem('role'); // 'jobSeeker' or 'recruiter'

  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />

          <Route
            path="/job-board/login"
            element={
              isAuthenticated ? (
                role === 'jobSeeker' ? <Navigate to="/job-board/jobList" /> : <Navigate to="/job-board/postedJobs" />
              ) : (
                <Login />
              )
            }
          />

          <Route path="/job-board/select-role" element={<SelectRole />} />
          <Route path="/job-board/unauthorized" element={<Unauthorized />} />

          {/* Job Seeker Routes */}
          <Route
            path="/job-board/jobList"
            element={
              <ProtectedRoute allowedRoles={['jobSeeker']}>
                <JobList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-board/appliedJobs"
            element={
              <ProtectedRoute allowedRoles={['jobSeeker']}>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-board/savedJobs"
            element={
              <ProtectedRoute allowedRoles={['jobSeeker']}>
                <SavedJobs />
              </ProtectedRoute>
            }
          />

          {/* Recruiter Routes */}
          <Route
            path="/job-board/postedJobs"
            element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <PostedJobs />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
