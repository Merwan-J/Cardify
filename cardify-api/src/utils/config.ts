import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 8000,
    geminiApiKey: process.env.GOOGLE_GEMINI_API_KEY || '',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseKey: process.env.SUPABASE_KEY || '',
};
