import express from 'express';
import { z } from 'zod';
import { supabase } from '../services/supabase.js';

const router = express.Router();

const restrictionSchema = z.object({
  examId: z.string(),
  apps: z.array(z.string()),
  startDays: z.number().min(1).max(30),
  allowOverride: z.boolean()
});

// Get user's restriction settings
router.get('/', async (req, res) => {
    try {
      const userId = req.user?.sub || "11111111-1111-1111-1111-111111111111";
      console.log(`🔍 Fetching restrictions for user: ${userId}`);
  
      const { data, error } = await supabase
        .from('restrictions')
        .select('*')
        .eq('user_id', userId);
  
      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }
  
      console.log(`✅ Restrictions fetched:`, data);
      res.json(data);
    } catch (error) {
      console.error('❌ Failed to fetch restrictions:', error.message);
      res.status(500).json({ error: 'Failed to fetch restrictions', details: error.message });
    }
  });
  
// Set restriction preferences for an exam
router.post('/', async (req, res) => {
    try {
      const userId = req.user?.sub || "11111111-1111-1111-1111-111111111111"; 
      console.log(`🔍 Creating restriction for user: ${userId}`);
      console.log("📥 Request Body:", req.body);
  
      const validation = restrictionSchema.safeParse(req.body);
      if (!validation.success) {
        console.error("❌ Validation Error:", validation.error);
        return res.status(400).json({ error: validation.error });
      }
  
      const { examId, apps, startDays, allowOverride } = validation.data;
  
      const { data, error } = await supabase
        .from('restrictions')
        .insert({
          user_id: userId,
          exam_id: examId,
          apps,
          start_days: startDays,
          allow_override: allowOverride
        })
        .select();
  
      if (error) {
        console.error("❌ Supabase Insert Error:", error);
        throw error;
      }
  
      console.log("✅ Restriction created:", data[0]);
      res.status(201).json(data[0]);
    } catch (error) {
      console.error("❌ Failed to create restriction:", error.message);
      res.status(500).json({ error: "Failed to create restriction", details: error.message });
    }
  });
  
// Override restrictions temporarily
router.post('/override', async (req, res) => {
    try {
      const userId = req.user?.sub || "11111111-1111-1111-1111-111111111111";
      console.log(`🔍 Checking override for user: ${userId}`);
      console.log("📥 Request Body:", req.body);
  
      const { examId, duration } = req.body;
  
      // Fetch the most recent restriction for this exam
      const { data: restrictions, error: fetchError } = await supabase
        .from('restrictions')
        .select('*')
        .eq('exam_id', examId)
        .eq('user_id', userId)
        .order('created_at', { ascending: false }) // Get latest restriction
        .limit(1);
  
      console.log("🔎 Fetched Restrictions:", restrictions);
  
      if (fetchError || !restrictions || restrictions.length === 0) {
        console.error("❌ Restriction not found or fetch error:", fetchError);
        return res.status(404).json({ error: "Restriction not found", details: fetchError });
      }
  
      const restriction = restrictions[0];
  
      if (!restriction.allow_override) {
        console.error("❌ Override not allowed for this restriction");
        return res.status(403).json({ error: "Override not allowed for this restriction" });
      }
  
      // Insert override
      const { data, error } = await supabase
        .from('overrides')
        .insert({
          restriction_id: restriction.id,
          duration,
          expires_at: new Date(Date.now() + duration * 60000).toISOString()
        })
        .select();
  
      if (error) {
        console.error("❌ Supabase Insert Error:", error);
        throw error;
      }
  
      console.log("✅ Override created:", data[0]);
      res.json(data[0]);
    } catch (error) {
      console.error("❌ Failed to create override:", error.message);
      res.status(500).json({ error: "Failed to create override", details: error.message });
    }
  });
  
export const restrictionRoutes = router;