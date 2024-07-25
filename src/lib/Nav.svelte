<script>
import { supabase } from '$lib/supabaseClient';
import { goto } from '$app/navigation';
import { user } from '$lib/stores';

async function handleLogout() {
  const { error } = await supabase.auth.signOut();
  if (error) alert(error.message);
  else goto('/login');
}
</script>

<nav>
  <div class='brand'>NoteApp</div>
  {#if $user}
  <button on:click={handleLogout}>Logout</button>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--on-surface);
  }
  .brand {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-color);
  }
</style>
