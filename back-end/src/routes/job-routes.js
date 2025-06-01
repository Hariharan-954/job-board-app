// routes/jobRoutes.js
import express from 'express';
import { dbFunctions } from '../functions/db-functions.js';
import { verifyToken } from '../authentication/verify-token.js';
import { wrappedConsole } from '../functions/logger.js';

export const router = express.Router();

const { findAll, insertOne, updateOneById, deleteOneById } = dbFunctions;


// Middleware to verify token for all routes
router.use(verifyToken);

// === JOB LIST ROUTES ===

// GET all jobs
router.get('/jobList', async (req, res) => {
  try {
    wrappedConsole('/jobList', 'GET', 'start');
    const jobList = await findAll('jobList');
    res.json(jobList);
    wrappedConsole('/jobList', 'GET', 'success');
  } catch (err) {
    wrappedConsole('/jobList', 'GET', 'failed');
    res.status(500).json({ error: err.message });
  }
});

// GET saved jobs
router.get('/savedJobs', async (req, res) => {
  try {
    wrappedConsole('/savedJobs', 'GET', 'start');
    const savedJobs = await findAll('jobList', { isSaved: true });
    res.json(savedJobs);
    wrappedConsole('/savedJobs', 'GET', 'success');
  } catch (err) {
    wrappedConsole('/savedJobs', 'GET', 'failed');
    res.status(500).json({ error: err.message });
  }
});

// GET applied jobs
router.get('/appliedJobs', async (req, res) => {
  try {
    wrappedConsole('/appliedJobs', 'GET', 'start');
    const appliedJobs = await findAll('jobList', { isApplied: true });
    res.json(appliedJobs);
    wrappedConsole('/appliedJobs', 'GET', 'success');
  } catch (err) {
    wrappedConsole('/appliedJobs', 'GET', 'failed');
    res.status(500).json({ error: err.message });
  }
});

// === POSTED JOB ROUTES ===

// GET all posted jobs
router.get('/postedJobs', async (req, res) => {
  try {
    wrappedConsole('/postedJobs', 'GET', 'start');
    const postedJobs = await findAll('postedJobs');
    res.json(postedJobs);
    wrappedConsole('/postedJobs', 'GET', 'success');
  } catch (err) {
    wrappedConsole('/postedJobs', 'GET', 'failed');
    res.status(500).json({ error: err.message });
  }
});

// POST a new posted job
router.post('/postJob', async (req, res) => {
  try {
    wrappedConsole('/postJob', 'POST', 'start');
    const result = await insertOne('postedJobs', req.body);
    res.status(201).json(result);
    wrappedConsole('/postJob', 'POST', 'success');
  } catch (err) {
    wrappedConsole('/postJob', 'POST', 'failed');
    res.status(500).json({ error: err.message });
  }
});

// PUT update posted job
router.put('/updateJob', async (req, res) => {
  try {
    wrappedConsole('/updateJob', 'PUT', 'start');
    const { _id, ...rest } = req.body;
    const result = await updateOneById('postedJobs', _id, rest);
    res.status(200).json(result);
    wrappedConsole('/updateJob', 'PUT', 'success');
  } catch (err) {
    wrappedConsole('/updateJob', 'PUT', 'failed');
    res.status(500).json({ error: err.message });
  }
});

// DELETE posted job
router.delete('/deleteJob', async (req, res) => {
  try {
    wrappedConsole('/deleteJob', 'DELETE', 'start');
    const { _id } = req.body;
    const result = await deleteOneById('postedJobs', _id);
    res.status(200).json(result);
    wrappedConsole('/deleteJob', 'DELETE', 'success');
  } catch (err) {
    wrappedConsole('/deleteJob', 'DELETE', 'failed');
    res.status(500).json({ error: err.message });
  }
});

// === JOB ACTION ROUTES ===

// PUT toggle apply status
router.put('/applyJob', async (req, res) => {
  try {
    wrappedConsole('/applyJob', 'PUT', 'start');
    const { _id, isApplied } = req.body;
    const result = await updateOneById('jobList', _id, { isApplied });
    res.status(200).json({ message: 'Apply status updated', result });
    wrappedConsole('/applyJob', 'PUT', 'success');
  } catch (err) {
    wrappedConsole('/applyJob', 'PUT', 'failed');
    res.status(500).json({ error: err.message });
  }
});

// PUT toggle save status
router.put('/saveJob', async (req, res) => {
  try {
    wrappedConsole('/saveJob', 'PUT', 'start');
    const { _id, isSaved } = req.body;
    const result = await updateOneById('jobList', _id, { isSaved });
    res.status(200).json({ message: 'Save status updated', result });
    wrappedConsole('/saveJob', 'PUT', 'success');
  } catch (err) {
    wrappedConsole('/saveJob', 'PUT', 'failed');
    res.status(500).json({ error: err.message });
  }
});

// DELETE applied job (withdraw)
router.put('/withdrawJob', async (req, res) => {
  try {
    wrappedConsole('/withdrawJob', 'PUT', 'start');
    const { _id, isApplied } = req.body;
    const result = await updateOneById('jobList', _id, { isApplied });
    res.status(200).json({ message: 'job withdrawn successfully', result });
    wrappedConsole('/withdrawJob', 'PUT', 'success');
  } catch (err) {
    wrappedConsole('/withdrawJob', 'PUT', 'failed');
    res.status(500).json({ error: err.message });
  }
});




