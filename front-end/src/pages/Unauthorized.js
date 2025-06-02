// pages/Unauthorized.js
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2, // responsive horizontal padding
        textAlign: 'center',
        
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" gutterBottom>
          You are not authorized to access this page.
        </Typography>
        <Button onClick={() => navigate('/')} variant="contained">
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Unauthorized;
