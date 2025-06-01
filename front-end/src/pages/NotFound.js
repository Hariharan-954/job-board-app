// src/pages/NotFound.js
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
        The page you are looking for might have been removed or doesn't exist.
      </Typography>
      <Button
        variant="contained"
        sx={{ textTransform: 'none', background: 'linear-gradient(90deg, #9C27B0 0%, #00BCD4 100%)' }}
        onClick={() => navigate('/')}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
