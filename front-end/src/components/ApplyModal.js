import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Divider,
  IconButton,
  CircularProgress,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import CloseIcon from '@mui/icons-material/Close';

const ApplyModal = ({ open, onClose, job, isDetailsModal, onApplyNow, onFinalApply, isApplyJobsPage, pageName }) => {
  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [applyLoading, setApplyLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const validate = () => {

    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validate()) return;
    setApplyLoading(true);

    await onFinalApply(job);
    setApplyLoading(false);

    setFormData({
      name: '',
      email: '',
      resume: null,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          padding: 3,
          width: {
            xs: '70%',
            sm: '75%',
            md: '30%',
          },
          height: {
            xs: '60%',
            sm: '65%',
            md: '70%',
          },
          boxShadow: 24,
          position: 'relative',

        }}
      >
        {isDetailsModal ? (
          <>
            <Typography variant="h5" gutterBottom >

              Job Details
            </Typography>
            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">{job.title}</Typography>
            <Typography variant="body1" color="text.secondary">
              {job.company}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Location: {job.location}
            </Typography>
            <Box sx={{ mb: 1, display: 'inline-flex', width: 'fit-content', color: 'darkblue' }}>
              <Chip
                icon={<WorkIcon sx={{ color: 'darkblue' }} />}
                label={job.jobType}
                variant="outlined"
                sx={{
                  px: 1,
                  color: 'darkblue',           // text color
                  borderColor: 'darkblue',     // border color for outlined chip
                  '& .MuiChip-icon': {
                    color: 'darkblue',         // icon color inside chip
                  }
                }}
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            {(isApplyJobsPage || pageName === 'savedJobs') &&
              <Button variant="contained" fullWidth onClick={onApplyNow} sx={{ backgroundColor: "darkblue", textTransform: 'none' }} >
                Apply Now
              </Button>
            }

            {/* New Section - What You Will Do */}
            <Typography
              variant="h6"
              mt={3}
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1.25rem',
                  md: '1.5rem'
                }
              }}
            >
              About the Job
            </Typography>
            {job.description && job.description.split('\n').map((point, index) => (
              <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                • {point.trim()}
              </Typography>
            ))}
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Apply for {job.title}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                value={formData.name}
                error={!!errors.name}
                helperText={errors.name}
                onChange={handleInputChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                error={!!errors.email}
                helperText={errors.email}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                fullWidth
                component="label"
                sx={{ marginTop: 2, backgroundColor: "darkblue", textTransform: 'none' }}
              >
                Upload Resume
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  // error={!!errors.resume}
                  // helperText={errors.resume}
                />
              </Button>
              {errors.resume && (
                <Typography variant="caption" color="error">
                  {errors.resume}
                </Typography>
              )}
              {formData.resume && <Typography>{formData.resume.name}</Typography>}

              <Stack direction="row" spacing={2} mt={2}>
                  <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ backgroundColor: "darkblue", textTransform: 'none' }}
                >
                    {applyLoading ? (
                      <CircularProgress  color="inherit"  size={30}/>

                    ) : "Submit Application"}
                  </Button>
                
                <Button variant="outlined" fullWidth onClick={onClose} sx={{ color: "darkblue", borderColor: "darkblue", textTransform: 'none' }} >
                  Cancel
                </Button>
              </Stack>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ApplyModal;
