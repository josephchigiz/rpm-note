<script>
export let message = '';
</script>

{#if message}
  <div class='error'>{message}</div>
{/if}

<style>
  .error {
  color: red;
  background-color: #ffeeee;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
