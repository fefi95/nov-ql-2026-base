<script>
  let { onadd } = $props();
  let name = $state('');

  function submit(event) {
    event.preventDefault();
    onadd(name);
    name = '';
  }
</script>

<form onsubmit={submit}>
  <input
    type="text"
    placeholder="Nombre del participante"
    aria-label="Nombre del participante"
    bind:value={name}
  />
  <button type="submit" class="secondary">Agregar</button>
</form>

<style>
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

  .secondary {
    padding: 0.7rem 1rem;
    cursor: pointer;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    background: var(--color-base-light);
    color: var(--color-base-dark);
  }

  .secondary:hover {
    background: var(--color-base-lighter-hover);
  }
</style>
