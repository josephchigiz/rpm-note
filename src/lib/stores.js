import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';

export const user = writable(null);

supabase.auth.onAuthStateChange((_, session) => {
	user.set(session?.user ?? null);
});
