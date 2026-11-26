<script>
  let { disabled, ondraw } = $props();
</script>

<button type="button" {disabled} onclick={ondraw}>Sortear ganador</button>

<style>
  button {
    cursor: pointer;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    padding: 1rem;
    font-size: 1.15rem;
    background: var(--color-base);
    color: var(--color-on-base);
  }

  button:hover:not(:disabled) {
    background: var(--color-base-dark);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
