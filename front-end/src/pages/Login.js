// Login.jsx
import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { encryptCredentials } from '../utils/encrypt';
import SnackbarAlert from '../components/SnackbarAlert'; // Import your reusable SnackbarAlert

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on input change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const encrypted = await encryptCredentials(formData);
      const response = await authService.login(encrypted);

      if (response.token) {
        setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });

        // Wait so user can see snackbar before redirect
        setTimeout(() => {
          localStorage.setItem('userToken', response.token);
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/job-board/select-role');
        }, 1000);
      } else if (response.status === "invalid") {
        setSnackbar({ open: true, message: 'Invalid email or password', severity: 'error' });
      } else {
        setSnackbar({ open: true, message: 'An error occurred during login', severity: 'error' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setSnackbar({ open: true, message: 'An error occurred during login.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8',
      }}
    >
      <Paper sx={{ p: 4, width: 300, borderRadius: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, textTransform: 'none', backgroundColor: 'darkblue' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Paper>

      {/* Use reusable SnackbarAlert component */}
      <SnackbarAlert
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
}
