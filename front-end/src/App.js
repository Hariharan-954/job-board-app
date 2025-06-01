// App.js
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
import Unauthorized from './pages/Unauthorized'; // Add this page

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const role = localStorage.getItem('role'); // 'jobSeeker' or 'recruiter'

  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />

          <Route
            path="/login"
            element={
              isAuthenticated ? (
                role === 'jobSeeker' ? <Navigate to="/jobList" /> : <Navigate to="/postedJobs" />
              ) : (
                <Login />
              )
            }
          />

          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Only job seekers */}
          <Route
            path="/jobList"
            element={
              <ProtectedRoute allowedRoles={['jobSeeker']}>
                <JobList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appliedJobs"
            element={
              <ProtectedRoute allowedRoles={['jobSeeker']}>
                <AppliedJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/savedJobs"
            element={
              <ProtectedRoute allowedRoles={['jobSeeker']}>
                <SavedJobs />
              </ProtectedRoute>
            }
          />

          {/* Only recruiters */}
          <Route
            path="/postedJobs"
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
