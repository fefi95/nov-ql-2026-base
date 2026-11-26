<script>
  import { podiumPlaces } from '../lib/podium.js';

  let { winners } = $props();

  const places = $derived(podiumPlaces(winners));
</script>

<section aria-live="polite">
  <h2>¡Tenemos un podio!</h2>
  <ul>
    {#each places as { place, medal, label, name } (place)}
      <li class="place-{place}" aria-label="{label}: {name}">
        <span class="name">{name}</span>
        <span class="step"><span class="medal">{medal}</span></span>
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    text-align: center;
    padding: 1.5rem 1rem 0;
    border-radius: 0.75rem;
    background: var(--color-base-light);
    color: var(--color-base-dark);
    animation: pop 0.4s ease-out;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: 'second first third';
    align-items: end;
    gap: 0.5rem;
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
  }

  .name {
    max-width: 100%;
    overflow-wrap: anywhere;
    font-weight: 800;
    font-size: 1.1rem;
  }

  .step {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 0.5rem;
    border-radius: 0.5rem 0.5rem 0 0;
    background: var(--color-base);
    color: var(--color-on-base);
  }

  .medal {
    font-size: 1.8rem;
  }

  .place-1 {
    grid-area: first;
  }

  .place-1 .step {
    height: 7rem;
    background: var(--color-base-dark);
  }

  .place-1 .name {
    font-size: 1.4rem;
  }

  .place-2 {
    grid-area: second;
  }

  .place-2 .step {
    height: 5rem;
  }

  .place-3 {
    grid-area: third;
  }

  .place-3 .step {
    height: 3.5rem;
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
