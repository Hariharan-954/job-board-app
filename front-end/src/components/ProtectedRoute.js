import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isValid, setIsValid] = useState(null);
  const userRole = localStorage.getItem('role'); // 'jobSeeker' or 'recruiter'

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        await authService.verifyToken(token);
        if (allowedRoles && !allowedRoles.includes(userRole)) {
          setIsValid('unauthorized');
        } else {
          setIsValid(true);
        }
      } catch (error) {
        localStorage.removeItem('userToken');
        localStorage.setItem('isAuthenticated', 'false');
        setIsValid(false);
      }
    };

    verify();
  }, [allowedRoles, userRole]);

  if (isValid === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isValid === 'unauthorized') return <Navigate to="/unauthorized" replace />;
  if (isValid === false) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
