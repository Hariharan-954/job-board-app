import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Stack,
  IconButton, Menu, MenuItem, CircularProgress
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import PostJobForm from '../pages/PostJob';
import ConfirmDialog from './ConfirmDialog';
import { fetchPostedJobs } from '../pages/PostedJobs';


const Header = ({refreshPostedJobs}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    description: '',
    onConfirm: () => { },
  });

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const role = localStorage.getItem('role');

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setConfirmDialog({
      open: true,
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      onConfirm: () => {
        handleClose();
        setLoggingOut(true);
        setConfirmDialog((prev) => ({ ...prev, open: false }));
        setTimeout(() => {
          localStorage.clear();
          navigate('/job-board/login', { replace: true });
          window.location.reload();
        }, 1000);
      },
    });
  };

  const handleLogin = () => navigate('/job-board/login');

  const NavButton = ({ to, label }) => {
    const isActive = location.pathname === to;
    return (
      <Button
        component={Link}
        to={to}
        disabled={isActive}
        color="inherit"
        sx={{
          fontWeight: 600,
          color: isActive ? '#fff' : 'inherit',
          opacity: isActive ? 0.7 : 1,
          textTransform: 'none',
          '&:hover': {
            color: '#90caf9',
            backgroundColor: 'transparent',
          },
        }}
      >
        {label}
      </Button>
    );
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(90deg, #9C27B0 0%, #00BCD4 100%)',
          px: 2,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <WorkOutlineIcon sx={{ color: 'white', fontSize: 32 }} />
            <Typography
              variant="h6"
              sx={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 700,
                letterSpacing: 1.2,
                fontSize: { xs: '1.5rem', sm: '1.8rem' },
              }}
            >
              JobBoard
            </Typography>
          </Stack>

          <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {isAuthenticated && role === 'jobSeeker' && (
              <>
                <NavButton to="/job-board/jobList" label="Job List" />
                <NavButton to="/job-board/appliedJobs" label="Applied Jobs" />
                <NavButton to="/job-board/savedJobs" label="Saved Jobs" />
              </>
            )}

            {isAuthenticated && role === 'recruiter' && (
              <>
                <Button
                  color="inherit"
                  onClick={() => setOpenPostModal(true)}
                  sx={{ fontWeight: 600, '&:hover': { color: '#90caf9' }, textTransform: 'none' }}
                >
                  Post Job
                </Button>
                <NavButton to="/job-board/postedJobs" label="Posted Jobs" />
              </>
            )}

            {isAuthenticated && (
              loggingOut ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ fontWeight: 600, textTransform: 'none' }}
                >
                  Logout
                </Button>
              )
            ) 
            // : 
            // (
            //   <Button
            //     variant="outlined"
            //     color="inherit"
            //     onClick={handleLogin}
            //     sx={{ fontWeight: 600, textTransform: 'none' }}
            //   >
            //     Login
            //   </Button>
            // )
            }
          </Stack>

          <IconButton edge="end" color="inherit" onClick={handleMenuClick} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {isAuthenticated && role === 'jobSeeker' && [
              <MenuItem
                key="jobList"
                disabled={location.pathname === '/job-board/jobList'}
                onClick={() => { navigate('/job-board/jobList'); handleClose(); }}
              >
                Job List
              </MenuItem>,
              <MenuItem
                key="appliedJobs"
                disabled={location.pathname === '/job-board/appliedJobs'}
                onClick={() => { navigate('/job-board/appliedJobs'); handleClose(); }}
              >
                Applied Jobs
              </MenuItem>,
              <MenuItem
                key="savedJobs"
                disabled={location.pathname === '/job-board/savedJobs'}
                onClick={() => { navigate('/job-board/savedJobs'); handleClose(); }}
              >
                Saved Jobs
              </MenuItem>,
            ]}
            {isAuthenticated && role === 'recruiter' && [
              <MenuItem key="postJob" onClick={() => { setOpenPostModal(true); handleClose(); }}>
                Post Job
              </MenuItem>,
              <MenuItem
                key="postedJobs"
                disabled={location.pathname === '/job-board/postedJobs'}
                onClick={() => { navigate('/job-board/postedJobs'); handleClose(); }}
              >
                Posted Jobs
              </MenuItem>,
            ]}
            {!isAuthenticated && (
              <MenuItem onClick={handleLogin}>Login</MenuItem>
            )}
            {isAuthenticated && (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      {isAuthenticated && role === 'recruiter' && (
        <PostJobForm open={openPostModal} openAndClosePopup={() => setOpenPostModal(false)} refreshPostedJobs={fetchPostedJobs}
        />
      )}

      <Outlet />

      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        description={confirmDialog.description}
        onClose={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
        onConfirm={confirmDialog.onConfirm}
      />
    </>
  );
};

export default Header;
