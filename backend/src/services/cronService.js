import cron from 'node-cron';
import { supabase } from './supabase.js';
import { google } from 'googleapis';
import { getGoogleAuthClient } from './googleAuth.js';

// Check for upcoming exams daily at midnight
export const setupCronJobs = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      // Get all users
      const { data: users, error: userError } = await supabase
        .from('profiles')
        .select('id, google_refresh_token');

      if (userError) throw userError;

      for (const user of users) {
        try {
          const auth = await getGoogleAuthClient(user.id);
          const calendar = google.calendar({ version: 'v3', auth });

          // Get upcoming events
          const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            timeMax: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ahead
            q: 'exam',
            singleEvents: true
          });

          // Process each exam
          for (const event of response.data.items) {
            const examDate = new Date(event.start.dateTime || event.start.date);
            const daysUntilExam = Math.ceil((examDate - new Date()) / (1000 * 60 * 60 * 24));

            // Get user's restrictions for this exam
            const { data: restrictions } = await supabase
              .from('restrictions')
              .select('*')
              .eq('user_id', user.id)
              .eq('exam_id', event.id)
              .single();

            if (restrictions && daysUntilExam <= restrictions.start_days) {
              // Trigger app restrictions
              await supabase.from('active_restrictions').insert({
                restriction_id: restrictions.id,
                start_date: new Date().toISOString(),
                end_date: examDate.toISOString()
              });
            }
          }
        } catch (error) {
          console.error(`Failed to process user ${user.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Cron job failed:', error);
    }
  });
};