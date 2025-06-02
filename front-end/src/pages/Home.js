import React from 'react';
import { Box, Typography, Button, Stack, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); // 'jobSeeker' | 'recruiter' | null

  const features = [
    { title: 'Explore Jobs', description: 'Find jobs that match your skills and goals.' },
    { title: 'Post Openings', description: 'Recruiters can post jobs and manage applicants.' },
    { title: 'Save Listings', description: 'Bookmark jobs to revisit later.' },
    { title: 'Track Applications', description: 'Easily monitor the status of your applications.' },
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        background: 'linear-gradient(90deg, #9C27B0 0%, #00BCD4 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2.2rem', md: '3.5rem' }
          }}
        >
          Find Your Dream Job
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontSize: { xs: '1rem', md: '1.5rem' }
          }}
        >
          Explore thousands of job opportunities or post your own openings easily!
        </Typography>

        {/* Role-Based Actions */}
        {userRole === 'jobSeeker' && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/job-board/jobList')}
              sx={{ backgroundColor: 'white', color: '#2575fc', fontWeight: 600 }}
            >
              Explore Jobs
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/job-board/appliedJobs')}
              sx={{ borderColor: 'white', color: 'white', fontWeight: 600 }}
            >
              Applied Jobs
            </Button>
          </Stack>
        )}

        {userRole === 'recruiter' && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/postJob')}
              sx={{ backgroundColor: 'white', color: '#2575fc', fontWeight: 600 }}
            >
              Post a Job
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/job-board/postedJobs')}
              sx={{ borderColor: 'white', color: 'white', fontWeight: 600 }}
            >
              Manage Jobs
            </Button>
          </Stack>
        )}

        {!userRole && (
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/job-board/login')}
              sx={{ backgroundColor: 'white', color: '#2575fc', fontWeight: 600 }}
            >
              Get Started
            </Button>

          </Stack>
        )}
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Grid container spacing={{ xs: 2, sm: 4, md: 6 }}>
  {features.map((feature, index) => (
    <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          height: '100%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          color: 'white',
          textAlign: 'center',
          width: '100%', // Take full width of the grid cell
          maxWidth: 320, // Max width for bigger screens
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {feature.title}
        </Typography>
        <Typography variant="body2">{feature.description}</Typography>
      </Paper>
    </Grid>
  ))}
</Grid>
      </Container>
    </Box>
  );
}
