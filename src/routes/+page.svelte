<script>
import { onMount } from "svelte";
import { user } from '$lib/stores';
import { goto } from "$app/navigation";
import Nav from '$lib/Nav.svelte';
import NotesList from '$lib/NotesList.svelte';
import NotesEditor from '$lib/NotesEditor.svelte';

let selectedNoteId = null;

onMount(() => {
  user.subscribe(value => {
    if (!value) goto('/login');
  });
});

function handleNoteSelect(event) {
  selectedNoteId = event.detail.id;
}
</script>

<Nav />

{#if $user}
  <h1>My Notes</h1>
  <NotesList on:noteSelect={handleNoteSelect}/>
  <NotesEditor noteId={selectedNoteId}/>
{:else}
  <p>Loading...</p>
{/if}
