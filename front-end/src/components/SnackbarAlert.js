// components/SnackbarAlert.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarAlert = ({ open, handleClose, severity = 'success', message }) => {
  return (
    <Snackbar open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
