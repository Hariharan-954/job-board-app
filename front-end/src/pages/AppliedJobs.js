import React, { useMemo } from 'react';
import { Typography, Button, Box, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import JobList from './JobList';
import { useNavigate } from 'react-router-dom';

const AppliedJobs = () => {
  const jobList = useSelector((state) => state.jobSeeker.jobList);
  const navigate = useNavigate();

  const appliedJobs = useMemo(() => {
    return jobList.filter((job) => job.isApplied === true)
  }
    , [jobList]);

  return (
    <Box >
      {appliedJobs.length > 0 ? (
        <JobList jobs={appliedJobs} pageName="appliedJobs" />
      ) : (
        <Stack spacing={3} alignItems="center" justifyContent="center" sx={{ minHeight: '60vh' }}>
          <Typography variant="h5" color="text.secondary">
            You haven't applied to any jobs yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/job-board/jobList')}
            sx={{
              backgroundColor: 'darkblue',
              color: 'white',
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#002b80',
              },
              textTransform: 'none'
            }}
          >
            Browse Jobs
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default AppliedJobs;
