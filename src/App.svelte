<script>
  import ParticipantForm from './components/ParticipantForm.svelte';
  import ParticipantList from './components/ParticipantList.svelte';
  import WinnerCountSelector from './components/WinnerCountSelector.svelte';
  import DrawButton from './components/DrawButton.svelte';
  import DrawError from './components/DrawError.svelte';
  import WinnerCard from './components/WinnerCard.svelte';
  import Podium from './components/Podium.svelte';
  import { addParticipant, removeParticipant } from './lib/participants.js';
  import { drawResult } from './lib/draw.js';

  let { random = Math.random } = $props();

  let participants = $state([]);
  let winnerCount = $state(1);
  // null | { type: 'error', message } | { type: 'winners', winners }
  let result = $state(null);

  function handleAdd(name) {
    participants = addParticipant(participants, name);
    result = null;
  }

  function handleRemove(index) {
    participants = removeParticipant(participants, index);
    result = null;
  }

  function handleWinnerCountChange(count) {
    winnerCount = count;
    result = null;
  }

  function handleDraw() {
    result = drawResult(participants, winnerCount, random);
  }
</script>

<main>
  <h1>🎲 Selector de ganadores</h1>

  <ParticipantForm onadd={handleAdd} />
  <ParticipantList {participants} onremove={handleRemove} />
  <WinnerCountSelector value={winnerCount} onchange={handleWinnerCountChange} />
  <DrawButton ondraw={handleDraw} />

  {#if result?.type === 'error'}
    <DrawError message={result.message} />
  {:else if result?.type === 'winners' && result.winners.length === 1}
    <WinnerCard winner={result.winners[0]} />
  {:else if result?.type === 'winners'}
    <Podium winners={result.winners} />
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
