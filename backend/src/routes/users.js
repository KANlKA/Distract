import express from 'express';
import { supabase } from '../services/supabase.js';

const router = express.Router();

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const userId = req.user?.sub || "11111111-1111-1111-1111-111111111111";

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('❌ Failed to fetch profile:', error.message);
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
});

// Update user preferences
router.put('/preferences', async (req, res) => {
  try {
    const userId = req.user?.sub || "11111111-1111-1111-1111-111111111111";
    const { defaultApps, defaultStartDays, defaultAllowOverride } = req.body;

    const { data, error } = await supabase
      .from('profiles')
      .update({
        default_apps: defaultApps,
        default_start_days: defaultStartDays,
        default_allow_override: defaultAllowOverride,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select();

    if (error) throw error;

    res.json(data[0]);
  } catch (error) {
    console.error('❌ Failed to update preferences:', error.message);
    res.status(500).json({ error: 'Failed to update preferences', details: error.message });
  }
});

export const userRoutes = router;
