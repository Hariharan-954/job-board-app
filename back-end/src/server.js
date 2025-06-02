// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { router as jobRoutes } from './routes/job-routes.js';
import { router as loginRoute } from './routes/authorization-routes.js';


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Log Node.js version
console.log('Node.js version:', process.version);

// JSON parsing
app.use(express.json());

// ✅ Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is healthy 🚀' });
});

// Connect to DB and start server
connectDB().then(() => {
  app.use('/api/jobs', jobRoutes);
  app.use('/api/auth', loginRoute);

  // Listen on all interfaces (0.0.0.0) to allow access via network IP
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
