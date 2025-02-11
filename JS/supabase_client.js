export async function getSupabaseConfig() {
    try {
      const response = await fetch('/.netlify/functions/config');
      if (!response.ok) {
        console.error('Failed to fetch config:', response.status, response.statusText);
        return {};
      }
      const config = await response.json();
      return config;
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  }
  
  export async function createSupabaseClient() {
    const { supabaseUrl, supabaseKey } = await getSupabaseConfig();
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase URL or Key is missing');
      return null;
    }
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
    return createClient(supabaseUrl, supabaseKey);
  }
  