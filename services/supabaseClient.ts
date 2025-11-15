import { createClient } from '@supabase/supabase-js';

// IMPORTANT: These variables should be populated from your environment.
// For local development, you might use a .env file.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Supabase URL or Key is missing. Please check your environment variables."
  );
}

export const supabase = createClient(supabaseUrl!, supabaseKey!);
