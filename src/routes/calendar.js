import express from 'express';
import { google } from 'googleapis';
import { getGoogleAuthClient } from '../services/googleAuth.js';

const router = express.Router();

// Get upcoming exams
router.get('/exams', async (req, res) => {
  try {
    const userId = req.user?.sub || "11111111-1111-1111-1111-111111111111";  

    const oauth2Client = await getGoogleAuthClient(userId);
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    });

    if (!response.data.items || response.data.items.length === 0) {
      return res.json({ message: "No upcoming exams found." });
    }

    // Filter events with "exam" in the title (case insensitive)
    const exams = response.data.items
      .filter(event => event.summary && event.summary.toLowerCase().includes('exam'))
      .map(event => ({
        id: event.id,
        summary: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        description: event.description || ''
      }));

    res.json(exams.length > 0 ? exams : { message: "No upcoming exams found." });
  } catch (error) {
    console.error('❌ Failed to fetch exams:', error);
    res.status(500).json({ error: 'Failed to fetch exams', details: error.message });
  }
});

export const calendarRoutes = router;
