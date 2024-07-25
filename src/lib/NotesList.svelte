<script>
import { onMount } from 'svelte';
import { supabase } from '$lib/supabaseClient';

let notes = [];

onMount(fetchNotes);

async function fetchNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) alert(error.message);
  else notes = data;
}

async function deleteNote(id) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .match({ id });

  if (error) alert(error.message);
  else fetchNotes();
}
</script>

<div class='notes-list'>
  {#each notes as note}
    <div class='note-item'>
      <h3>{note.title}</h3>
      <p>{note.content.substring(0, 100)}...</p>
      <button on:click={() => deleteNote(note.id)}>Delete</button>
    </div>
  {/each}
</div>

<style>
  .notes-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  .note-item {
    background-color: var(--surface-color);
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .note-item h3 {
    margin-top: 0;
  }
  .note-item p {
    color: var(--on-surface);
  }
</style>
