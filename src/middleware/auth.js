import { auth as requireAuth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';

dotenv.config();

// Auth0 configuration
export const auth = requireAuth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});