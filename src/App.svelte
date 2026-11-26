<script>
  let name = $state('');
  let participants = $state([]);
  let winner = $state(null);

  function addParticipant(event) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    participants.push(trimmed);
    name = '';
    winner = null;
  }

  function removeParticipant(index) {
    participants.splice(index, 1);
    winner = null;
  }

  function drawWinner() {
    if (participants.length === 0) return;
    winner = participants[Math.floor(Math.random() * participants.length)];
  }
</script>

<main>
  <h1>🎲 Selector de ganadores</h1>

  <form onsubmit={addParticipant}>
    <input
      type="text"
      placeholder="Nombre del participante"
      aria-label="Nombre del participante"
      bind:value={name}
    />
    <button type="submit" class="secondary">Agregar</button>
  </form>

  {#if participants.length > 0}
    <ul>
      {#each participants as participant, index}
        <li>
          <span>{participant}</span>
          <button
            type="button"
            class="remove"
            aria-label="Quitar {participant}"
            onclick={() => removeParticipant(index)}>✕</button
          >
        </li>
      {/each}
    </ul>
  {:else}
    <p class="empty">Aún no hay participantes. ¡Agrega el primero!</p>
  {/if}

  <button
    type="button"
    class="primary"
    disabled={participants.length === 0}
    onclick={drawWinner}>Sortear ganador</button
  >

  {#if winner}
    <section class="winner" aria-live="polite">
      <h2>¡Tenemos un ganador!</h2>
      <p>{winner}</p>
    </section>
  {/if}
</main>

<style>
  main {
    width: 100%;
    max-width: 480px;
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgb(194 65 12 / 0.15);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  h1 {
    margin: 0;
    text-align: center;
    color: var(--color-base-dark);
  }

  form {
    display: flex;
    gap: 0.5rem;
  }

  input {
    flex: 1;
    padding: 0.7rem 0.9rem;
    border: 2px solid var(--color-base-light);
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: var(--color-base);
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .secondary {
    padding: 0.7rem 1rem;
    background: var(--color-base-light);
    color: var(--color-base-dark);
  }

  .secondary:hover {
    background: #fed7aa;
  }

  .primary {
    padding: 1rem;
    font-size: 1.15rem;
    background: var(--color-base);
    color: white;
  }

  .primary:hover:not(:disabled) {
    background: var(--color-base-dark);
  }

  .primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

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
    background: none;
    color: var(--color-base-dark);
    padding: 0.2rem 0.5rem;
  }

  .empty {
    margin: 0;
    text-align: center;
    color: var(--color-muted);
  }

  .winner {
    text-align: center;
    padding: 1.5rem;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, var(--color-base), var(--color-base-dark));
    color: white;
    animation: pop 0.4s ease-out;
  }

  .winner h2 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  .winner p {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 800;
  }

  @keyframes pop {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
