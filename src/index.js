import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { calendarRoutes } from './routes/calendar.js';
import { restrictionRoutes } from './routes/restrictions.js';
import { userRoutes } from './routes/users.js';
import { setupCronJobs } from './services/cronService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/calendar', calendarRoutes);
app.use('/api/restrictions', restrictionRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Welcome endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Google OAuth App');
});

// Initialize cron jobs for exam detection with error handling
try {
  setupCronJobs();
  console.log('✅ Cron jobs initialized.');
} catch (error) {
  console.error('❌ Failed to initialize cron jobs:', error);
}

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
