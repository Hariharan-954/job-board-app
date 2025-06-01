// JobCard.js
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  CardActions,
  Button,
  Box,
  IconButton,
  CircularProgress
} from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TurnedIn from '@mui/icons-material/TurnedIn';
import TurnedInNot from '@mui/icons-material/TurnedInNot';

import ApplyModal from './ApplyModal';
import SnackbarAlert from './SnackbarAlert';
import ConfirmDialog from './ConfirmDialog';

import { useDispatch } from 'react-redux';
import { saveJob, withdrawJob } from '../redux/actions/jobSeekerActions';

import { jobService } from '../services/jobServices';
import { getFromLocalStorage } from '../utils/localStorageHelper';
import { postJob } from '../redux/actions/recruiterActions';

const JobCard = ({ job, onApply, isApplyJobsPage, pageName = '', onEditJob, refreshPostedJobs }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('details');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dispatch = useDispatch();

  const showAlert = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleViewDetails = () => {
    setModalType('details');
    setOpenModal(true);
  };

  const handleApplyNow = () => {
    setModalType('apply');
  };

  const handleSaveClick = async () => {
    const token = getFromLocalStorage('userToken');
    const isCurrentlySaved = job.isSaved;
    const savedJob = { _id: job._id, isSaved: !isCurrentlySaved };
    setIsSaving(true);
    try {
      await jobService.saveJob(savedJob, token);
       dispatch(saveJob(savedJob));
      showAlert(isCurrentlySaved ? 'Job unsaved successfully' : 'Job saved successfully');
    } catch (error) {
      console.error('Error saving job:', error);
      showAlert('Failed to save job. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDeleteJob = (job) => {
    setConfirmDialog({
      open: true,
      title: 'Delete Job',
      description: 'Are you sure you want to delete this job?',
      confirmText: 'Delete',
      loading: deleteLoading,
      onConfirm: async () => {
        try {
          setDeleteLoading(true);
          await jobService.deleteJob({ _id: job._id }, getFromLocalStorage('userToken'));
          const jobs = await refreshPostedJobs();
          dispatch(postJob(jobs));
          showAlert('Job deleted successfully');
        } catch (error) {
          showAlert('Failed to delete job', 'error');
        } finally {
          setDeleteLoading(false);
          setConfirmDialog((prev) => ({ ...prev, open: false }));
        }
      },
    });
  };

  const confirmWithdrawJob = (job) => {
    setConfirmDialog({
      open: true,
      title: 'Withdraw Application?',
      description: 'Are you sure you want to withdraw from this job?',
      onConfirm: async () => {
        const token = getFromLocalStorage('userToken');
        let updatedJob = { _id: job._id, isApplied: false };
        await jobService.withdrawJob(updatedJob, token);
        dispatch(withdrawJob(updatedJob));
        showAlert('Job withdrawn successfully');
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const isJobApplied = job.isApplied && (isApplyJobsPage || pageName === 'savedJobs');

  return (
    <>
      <Card
        elevation={4}
        sx={{
          display: 'flex',
          width: '360px',
          height: '242px',
          flexDirection: 'column',
          transition: '0.3s',
          '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" noWrap>{job.title}</Typography>
            {pageName !== 'postedJobs' && (
              <IconButton onClick={handleSaveClick}>
                {isSaving ? (
                  <CircularProgress size={24} color="primary" />
                ) : job.isSaved ? (
                  <TurnedIn color="primary" />
                ) : (
                  <TurnedInNot />
                )}
              </IconButton>
            )}
          </Stack>

          <Typography variant="body2" color="text.secondary" mb={1} noWrap>
            {job.company}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">{job.location}</Typography>
          </Stack>

          <Box sx={{ mb: 2, display: 'inline-flex', width: 'fit-content', color: 'darkblue' }}>
            <Chip
              icon={<WorkIcon sx={{ color: 'darkblue' }} />}
              label={job.jobType}
              variant="outlined"
              sx={{
                px: 1,
                color: 'darkblue',
                borderColor: 'darkblue',
                '& .MuiChip-icon': {
                  color: 'darkblue',
                },
              }}
            />
          </Box>

          <Typography
            variant="body2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
            }}
          >
            {job.heading}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-around', pb: 2 }}>
          <Button
            size="small"
            variant={isJobApplied ? 'contained' : 'outlined'}
            onClick={handleViewDetails}
            disabled={isJobApplied}
            sx={{
              color: isJobApplied ? 'white' : 'darkblue',
              backgroundColor: isJobApplied ? 'darkblue' : 'transparent',
              textTransform: 'none',
              borderColor: 'darkblue',
              '&:hover': {
                backgroundColor: isJobApplied ? 'darkblue' : 'rgba(0, 0, 139, 0.1)',
              },
            }}
          >
            {isJobApplied ? 'Applied' : 'View Details'}
          </Button>

          {pageName === 'postedJobs' && (
            <>
              <Button
                size="small"
                variant="outlined"
                onClick={() => onEditJob(job)}
                sx={{ color: 'darkblue', borderColor: 'darkblue', textTransform: 'none' }}
              >
                Edit Job
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => confirmDeleteJob(job)}
                sx={{ color: 'darkblue', borderColor: 'darkblue', textTransform: 'none' }}
              >
                Delete Job
              </Button>
            </>
          )}

          {pageName === 'appliedJobs' && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => confirmWithdrawJob(job)}
              sx={{ color: 'darkblue', borderColor: 'darkblue', textTransform: 'none' }}
            >
              Withdraw
            </Button>
          )}
        </CardActions>
      </Card>

      <ApplyModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        job={job}
        isDetailsModal={modalType === 'details'}
        onApplyNow={handleApplyNow}
        onFinalApply={ async (job) => {
          await onApply(job);
          showAlert('Job applied successfully');
        }}
        isApplyJobsPage={isApplyJobsPage}
        pageName={pageName}
      />

      <SnackbarAlert
        open={snackbar.open}
        handleClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />

      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
        onConfirm={confirmDialog.onConfirm}
        loading={confirmDialog.loading}
        confirmText={confirmDialog.confirmText}
      />
    </>
  );
};

export default JobCard;
