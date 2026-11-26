<script>
  let { count } = $props();
</script>

<div class="countdown" role="status" aria-live="assertive" aria-label="Cuenta regresiva">
  {#key count}
    <span>{count}</span>
  {/key}
</div>

<style>
  .countdown {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 9rem;
  }

  span {
    font-size: 7rem;
    font-weight: 800;
    line-height: 1;
    color: var(--color-base);
    text-shadow: 0 6px 18px var(--color-shadow);
    animation: beat 1s ease-out;
  }

  @keyframes beat {
    from {
      transform: scale(1.4);
      opacity: 0;
    }
    30% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
