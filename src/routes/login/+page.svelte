<script>
import { supabase } from '$lib/supabaseClient';
import { goto } from '$app/navigation';

let email = '';
let password = '';
let isLogin = true;

async function handleAuth() {
  if (isLogin) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else goto('/');
  } else {
    const { error } = await supabase.auth.signUp({ email, password});
    if (error) alert(error.message);
    else alert('Check your email for the confirmation link!');
  }
}
</script>

<h1>{isLogin ? 'Login' : 'Register'}</h1>
<form on:submit|preventDefault={handleAuth}>
  <input type='email' bind:value={email} placeholder='Email' required>
  <input type='password' bind:value={password} placeholder='Password' required>
  <button type='submit'>{isLogin ? 'Login' : 'Register'}</button>
</form>
<button on:click={() => isLogin = !isLogin}>
  {isLogin ? 'Need to create and account?' : 'Already have an account?'}
</button>
