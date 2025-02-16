export async function getSupabaseConfig() {
    try {
      const response = await fetch('/.netlify/functions/config');
      if (!response.ok) {
        console.error('Failed to fetch config:', response.status, response.statusText);
        return {};
      }
      const config = await response.json();
      console.log('Supabase Config:', config); // デバッグ用
      return config;
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  }
  
  export async function createSupabaseClient() {
    const { supabaseUrl, supabaseKey } = await getSupabaseConfig();
    if (!supabaseUrl || !supabaseKey) {
      console.log('Supabase URL:', supabaseUrl); // デバッグ用
      console.log('Supabase Key:', supabaseKey); // デバッグ用
      console.error('Supabase URL or Key is missing');
      return null;
    }
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase Client:', supabase); // デバッグ用
    return  supabase;
  }
  