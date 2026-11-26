<script>
  import ParticipantForm from './components/ParticipantForm.svelte';
  import ParticipantList from './components/ParticipantList.svelte';
  import WinnerCountSelector from './components/WinnerCountSelector.svelte';
  import DrawButton from './components/DrawButton.svelte';
  import Countdown from './components/Countdown.svelte';
  import DrawError from './components/DrawError.svelte';
  import WinnerCard from './components/WinnerCard.svelte';
  import Podium from './components/Podium.svelte';
  import { addParticipant, removeParticipant } from './lib/participants.js';
  import { drawWinners, validateDraw } from './lib/draw.js';
  import { COUNTDOWN_STEP_MS } from './lib/countdown.js';
  import { IDLE, isCounting, startDraw, tickDraw, visibleResult } from './lib/drawPhase.js';
  import { intervalScheduler } from './lib/scheduler.js';

  let { random = Math.random, scheduler = intervalScheduler } = $props();

  let participants = $state([]);
  let winnerCount = $state(1);
  let draw = $state(IDLE);

  const locked = $derived(isCounting(draw));
  const result = $derived(visibleResult(draw));

  // Depends only on `locked`, so the timer starts once per countdown and is
  // cancelled when the countdown ends or the component is destroyed.
  $effect(() => {
    if (!locked) return;
    const id = scheduler.setInterval(() => {
      draw = tickDraw(draw);
    }, COUNTDOWN_STEP_MS);
    return () => scheduler.clearInterval(id);
  });

  function handleAdd(name) {
    participants = addParticipant(participants, name);
    draw = IDLE;
  }

  function handleRemove(index) {
    participants = removeParticipant(participants, index);
    draw = IDLE;
  }

  function handleWinnerCount(count) {
    winnerCount = count;
    draw = IDLE;
  }

  function handleDraw() {
    draw = startDraw({ participants, winnerCount, random, validateDraw, drawWinners });
  }
</script>

<main>
  <h1>🎲 Selector de ganadores</h1>

  <ParticipantForm onadd={handleAdd} {locked} />
  <ParticipantList {participants} onremove={handleRemove} {locked} />
  <WinnerCountSelector value={winnerCount} onchange={handleWinnerCount} {locked} />
  <DrawButton ondraw={handleDraw} {locked} />

  {#if draw.phase === 'counting'}
    <Countdown count={draw.count} />
  {:else if result?.type === 'error'}
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
