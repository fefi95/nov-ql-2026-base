<script>
  let { participants, onremove } = $props();
</script>

{#if participants.length > 0}
  <ul>
    {#each participants as participant, index}
      <li>
        <span>{participant}</span>
        <button
          type="button"
          class="remove"
          aria-label="Quitar {participant}"
          onclick={() => onremove(index)}>✕</button
        >
      </li>
    {/each}
  </ul>
{:else}
  <p class="empty">Aún no hay participantes. ¡Agrega el primero!</p>
{/if}

<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.9rem;
    background: var(--color-base-light);
    border-radius: 0.5rem;
  }

  .remove {
    cursor: pointer;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    background: none;
    color: var(--color-base-dark);
    padding: 0.2rem 0.5rem;
  }

  .empty {
    margin: 0;
    text-align: center;
    color: var(--color-muted);
  }
</style>
