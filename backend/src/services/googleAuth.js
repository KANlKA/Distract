import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { supabase } from './supabase.js';
import dotenv from 'dotenv';

dotenv.config();

// Create OAuth2 Client
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Function to refresh access token
export const refreshAccessToken = async (userId) => {
  try {
    console.log(`🔍 Fetching refresh token for user: ${userId}`);

    const { data, error } = await supabase
      .from('profiles')
      .select('google_refresh_token')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      throw new Error("❌ Error fetching refresh token from Supabase.");
    }

    if (!data || !data.google_refresh_token) {
      throw new Error("❌ Refresh token missing or NULL for user.");
    }

    console.log(`✅ Refresh token retrieved: ${data.google_refresh_token}`);

    // Set refresh token and request a new access token
    oauth2Client.setCredentials({ refresh_token: data.google_refresh_token });

    const { token } = await oauth2Client.getAccessToken();
    
    if (!token) {
      throw new Error("❌ Failed to refresh access token.");
    }

    console.log('✅ Access token refreshed successfully.');
    return token;
  } catch (error) {
    console.error('❌ Error refreshing access token:', error.message);
    throw error;
  }
};

// Function to get Google OAuth client
export const getGoogleAuthClient = async (userId) => {
  try {
    const accessToken = await refreshAccessToken(userId);

    oauth2Client.setCredentials({ access_token: accessToken });

    return oauth2Client;
  } catch (error) {
    console.error('❌ Failed to get Google auth client:', error.message);
    throw error;
  }
};
