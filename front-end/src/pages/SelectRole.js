import React, { useState } from 'react';
import { Box, Button, Typography, CircularProgress, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SelectRole() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('role', role);
      localStorage.setItem('isAuthenticated', 'true'); // Ensure user is marked as authenticated

      // Navigate to the appropriate page based on the selected role
      if (role === 'jobSeeker') {
        navigate('/jobList'); // Navigate to the job list page for jobseekers
      } else if (role === 'recruiter') {
        navigate('/postedJobs'); // Navigate to posted jobs for recruiters
      }
    }, 1000); // Simulate a delay before redirect
  };

  return (
    <Box sx={{
      height: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 2
    }}>
      <Paper sx={{
        p: 4,
        borderRadius: 4,
        width: 300,
        textAlign: 'center',
        boxShadow: 3,
      }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Select Your Role
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Please choose your role to get started:
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ my: 2, fontSize: '1.1rem', textTransform: 'none' }}
              onClick={() => handleSelectRole('jobSeeker')}
            >
              Job Seeker
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ fontSize: '1.1rem', textTransform: 'none' }}
              onClick={() => handleSelectRole('recruiter')}
            >
              Recruiter
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}
