<script>
  import ParticipantForm from './components/ParticipantForm.svelte';
  import ParticipantList from './components/ParticipantList.svelte';
  import DrawButton from './components/DrawButton.svelte';
  import WinnerCard from './components/WinnerCard.svelte';
  import { addParticipant, removeParticipant } from './lib/participants.js';
  import { drawWinner } from './lib/draw.js';

  let { random = Math.random } = $props();

  let participants = $state([]);
  let winner = $state(null);

  function handleAdd(name) {
    participants = addParticipant(participants, name);
    winner = null;
  }

  function handleRemove(index) {
    participants = removeParticipant(participants, index);
    winner = null;
  }

  function handleDraw() {
    winner = drawWinner(participants, random);
  }
</script>

<main>
  <h1>🎲 Selector de ganadores</h1>

  <ParticipantForm onadd={handleAdd} />
  <ParticipantList {participants} onremove={handleRemove} />
  <DrawButton disabled={participants.length === 0} ondraw={handleDraw} />

  {#if winner}
    <WinnerCard {winner} />
  {/if}
</main>

<style>
  main {
    width: 100%;
    max-width: 480px;
    background: var(--color-surface);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 10px 30px var(--color-shadow);
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  h1 {
    margin: 0;
    text-align: center;
    color: var(--color-base-dark);
  }
</style>
