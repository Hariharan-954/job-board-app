import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobList from './JobList';
import { Button, CircularProgress } from '@mui/material';
import PostJobForm from './PostJob';
import { jobService } from '../services/jobServices';
import { getFromLocalStorage } from '../utils/localStorageHelper';
import { postJob } from '../redux/actions/recruiterActions';


export const fetchPostedJobs = async ()=> {
  try {
    const token = getFromLocalStorage('userToken');
    const jobs = await jobService.getPostedJobs(token);
    return jobs;
  } catch (error) {
    console.error("Failed to fetch jobs", error);
  }
};

const PostedJobs = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editJob, setEditJob] = useState(null); // track job to edit
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePostJob = () => {
    setEditJob(null); 
    setOpenModal(true);
  };

  const handleEditJob = (job) => {
    setEditJob(job); 
    setOpenModal(true);
  };


  useEffect(() => {
    const getPostedJobs = async () => {
      setLoading(true);
      try {
        const jobs = await fetchPostedJobs();
        dispatch(postJob(jobs));
      } catch (error) {
        console.error("Failed to fetch posted jobs", error);
      } finally {
        setLoading(false);
      }
    }
    getPostedJobs();

  }, [dispatch]); 

  const postedJobs = useSelector((state) => state.recruiter.postedJobs);

  return (
    <div>
      {loading ? (
        <div style={{ padding: '18rem', textAlign: 'center' }}>
          <CircularProgress size={48} />
        </div>
      ) : postedJobs.length > 0 ? (
        <JobList
          jobs={postedJobs}
          pageName="postedJobs"
          onEditJob={handleEditJob}
          refreshPostedJobs={fetchPostedJobs}
        />
      ) : (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>No posted jobs yet.</h2>
          <Button
            variant="contained"
            sx={{ backgroundColor: "darkblue", color: "white", textTransform: 'none' }}
            onClick={handlePostJob}
          >
            Post a Job
          </Button>
        </div>
      )}

      <PostJobForm
        open={openModal}
        openAndClosePopup={() => {
          setOpenModal(false);
          setEditJob(null);
        }}
        refreshPostedJobs={fetchPostedJobs }
        editJob={editJob}
      />
    </div>
  );
};

export default PostedJobs;
