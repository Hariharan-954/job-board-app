import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Modal,
  CircularProgress,
} from '@mui/material';
import SnackbarAlert from '../components/SnackbarAlert';
import { jobService } from '../services/jobServices';
import { getFromLocalStorage } from '../utils/localStorageHelper';
import { useDispatch } from 'react-redux';
import { postJob } from '../redux/actions/recruiterActions';

export default function PostJobForm({ open, editJob, openAndClosePopup, refreshPostedJobs }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Internship'];
  const dispatch = useDispatch();

  useEffect(() => {
    if (editJob) {
      setFormData({ ...editJob });
    } else {
      setFormData({
        title: '',
        company: '',
        location: '',
        jobType: '',
        description: '',
      });
    }
  }, [editJob]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.jobType) newErrors.jobType = 'Job type is required';
    if (!formData.description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAfterJobChange = async (successMessage) => {
    const updatedJobs = await refreshPostedJobs();
    dispatch(postJob(updatedJobs));
    setSnackbar({ open: true, message: successMessage, severity: 'success' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const token = getFromLocalStorage('userToken');

      if (editJob) {
        await jobService.updateJob(formData, token);
        await handleAfterJobChange('Job edited successfully');
      } else {
        await jobService.postNewJob(formData, token);
        await handleAfterJobChange('Job posted successfully');
      }
      setLoading(false);

      openAndClosePopup();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Something went wrong. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={openAndClosePopup}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            padding: 3,
            width: { xs: '70%', sm: '75%', md: '30%' },
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: 24,
            position: 'relative',
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            {editJob ? 'Edit Job' : 'Post a Job'}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Job Title"
              name="title"
              fullWidth
              margin="normal"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="Company"
              name="company"
              fullWidth
              margin="normal"
              value={formData.company}
              onChange={handleChange}
              error={!!errors.company}
              helperText={errors.company}
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
            />
            <TextField
              select
              label="Job Type"
              name="jobType"
              fullWidth
              margin="normal"
              value={formData.jobType}
              onChange={handleChange}
              error={!!errors.jobType}
              helperText={errors.jobType}
            >
              {jobTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
              sx={{ mt: 2, backgroundColor: 'darkblue', textTransform: 'none' }}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? (editJob ? 'Saving...' : 'Posting...') : editJob ? 'Save Changes' : 'Post Job'}
            </Button>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: 'darkblue', textTransform: 'none' }}
              onClick={openAndClosePopup}
              disabled={loading}
            >
              {editJob ? 'Undo Changes' : 'Cancel'}
            </Button>
          </form>
        </Box>
      </Modal>

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        handleClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}
