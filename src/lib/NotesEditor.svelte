<script>
import { supabase } from '$lib/supabaseClient';
import { user } from '$lib/stores';

export let noteId = null;
let title = '';
let content = '';

async function saveNote() {
  const noteData = {
    title,
    content,
    user_id: $user.id
  };

  let result;
  if (noteId) {
    // If noteId exists, update the existing note
    result = await supabase
      .from('notes')
      .update(noteData)
      .match({ id: noteId });
  } else {
    // If noteId doesn't exist, insert a new note
    result = await supabase
      .from('notes')
      .insert(noteData);
  }

  const { data, error } = result;

  if (error) alert(error.message);
  else {
    alert('Note saved successfully!');
    noteId = data[0].id;
  }
}
</script>

<div class='note-editor'>
  <h2>{noteId ? 'Edit Note' : 'New Note'}</h2>
  <form on:submit|preventDefault={saveNote}>
    <input bind:value={title} placeholder='Title' required>
    <textarea bind:value={content} placeholder='content' required></textarea>
    <button type='submit'>Save Note</button>
  </form>
</div>

<style>
.note-editor {
  background-color: var(--surface-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  margin-top: 20px;
}
</style>
