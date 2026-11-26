<script>
  let { message } = $props();
</script>

<p role="alert">{message}</p>

<style>
  p {
    margin: 0;
    padding: 1rem;
    text-align: center;
    font-weight: 600;
    border-radius: 0.75rem;
    border: 2px solid var(--color-base);
    background: var(--color-base-light);
    color: var(--color-base-dark);
  }
</style>
