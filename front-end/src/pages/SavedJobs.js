import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box, Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import JobList from './JobList';

const SavedJobs = () => {

    const jobList = useSelector((state) => state.jobSeeker.jobList)
    const navigate = useNavigate();

    const savedJobs = useMemo(() => {
        return jobList.filter((job) => job.isSaved === true)
    }, [jobList]);


    return (

        <Box >
            {savedJobs.length > 0 ? (
                <JobList pageName='savedJobs' jobs={savedJobs} />
            ) : (
                <Stack spacing={3} alignItems="center" justifyContent="center" sx={{ minHeight: '60vh' }}>
                    <Typography variant="h5" color="text.secondary">
                        You haven't saved any jobs yet.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/jobList')}
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

export default SavedJobs;