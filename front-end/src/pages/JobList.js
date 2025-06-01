// JobList.js
import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Grid,
  Box,
  TextField,
  MenuItem,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import JobCard from '../components/JobCard';
import { CircularProgress } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { applyJob, getJobList } from '../redux/actions/jobSeekerActions';
import { jobService } from '../services/jobServices';
import { getFromLocalStorage } from '../utils/localStorageHelper';


const jobTypes = ['All', 'Full-time', 'Part-time', 'Remote', 'Internship'];

export default function JobList(props) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [isApplyJobsPage, setIsApplyJobsPage] = useState(true);
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [loading, setLoading] = useState(false);
  const jobsPerPage = 6;
  const dispatch = useDispatch();
  const dynamicJobs = props.jobs
  const jobList = useSelector((state) => state.jobSeeker.jobList);


  const heading = {
    'appliedJobs': '🔍 Explore Applied Jobs',
    'postedJobs': '🔍 Explore Posted Jobs',
    'savedJobs': '🔍 Explore Saved Jobs'
  }

  const sourceJobs = props.jobs ? dynamicJobs : jobList;

  useEffect(() => {

    const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('userToken');
        const data = await jobService.getAllJobs(token);
        dispatch(getJobList(data));
      } catch (err) {
        console.error('Failed to fetch job list:', err);
      } finally {
        setLoading(false);
      }
    };
    if (!props.jobs) {
      fetchJobs();
    } else {
      setIsApplyJobsPage(false);
    }
  }, [props.jobs, dispatch]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])


  const { paginatedJobs, totalPages } = useMemo(() => {

    const filteredJobs = sourceJobs?.filter((job) => {

      const matchesSearch =
        job.title?.toLowerCase()?.includes(debouncedSearch?.toLowerCase()) ||
        job.company?.toLowerCase()?.includes(debouncedSearch?.toLowerCase());

      const matchesFilter = filter === 'All' || job.jobType === filter;

      return matchesSearch && matchesFilter;
    });

    const paginated = filteredJobs?.slice(
      (page - 1) * jobsPerPage,
      page * jobsPerPage
    );

    const total = Math?.ceil(filteredJobs.length / jobsPerPage);

    return {
      paginatedJobs: paginated,
      totalPages: total,
    }

  }, [debouncedSearch, page, filter, sourceJobs])


  const handleApply = async (job) => {
    const token = getFromLocalStorage('userToken')
    const updatedJob = { _id: job._id, isApplied: true };
    try {
      await jobService.applyJob(updatedJob, token);
      dispatch(applyJob(updatedJob));
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };


  return (

    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '80vh', py: 3, overflowY: 'auto' }}>
      <Container>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          {heading[props?.pageName] || '🔍 Explore Jobs'}
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          mb={4}
        >
          <TextField
            label="Search by title or company"
            variant="outlined"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <TextField
            select
            label="Filter by Job Type"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            sx={{ minWidth: 200 }}

          >
            {jobTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        {loading ? (
          <Stack alignItems="center" mt={20}>
            <CircularProgress size={48} />
          </Stack>
        ) : (
          <Grid container spacing={4}>
            {paginatedJobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job._id}>
                <JobCard job={job} onApply={handleApply} isApplyJobsPage={isApplyJobsPage} pageName={props.pageName} onEditJob={props.onEditJob} refreshPostedJobs={props.refreshPostedJobs} />
              </Grid>
            ))}
          </Grid>
        )}

        {totalPages > 1 && (
          <Stack alignItems="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
}
