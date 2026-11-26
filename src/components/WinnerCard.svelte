<script>
  let { winner } = $props();
</script>

<section aria-live="polite">
  <h2>¡Tenemos un ganador!</h2>
  <p>{winner}</p>
</section>

<style>
  section {
    text-align: center;
    padding: 1.5rem;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, var(--color-base), var(--color-base-dark));
    color: var(--color-on-base);
    animation: pop 0.4s ease-out;
  }

  h2 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  p {
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
