<script>
  let { value = 1, onchange } = $props();

  const options = [1, 2, 3];
</script>

<fieldset>
  <legend>Cantidad de ganadores</legend>
  {#each options as option}
    <label>
      <input
        type="radio"
        name="winner-count"
        value={option}
        checked={value === option}
        onchange={() => onchange(option)}
      />
      <span>{option}</span>
    </label>
  {/each}
</fieldset>

<style>
  fieldset {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    border: none;
  }

  legend {
    float: left;
    margin-right: auto;
    font-weight: 600;
    color: var(--color-base-dark);
  }

  label {
    cursor: pointer;
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  span {
    display: inline-block;
    min-width: 2.5rem;
    padding: 0.5rem 0.8rem;
    text-align: center;
    border-radius: 0.5rem;
    font-weight: 600;
    background: var(--color-base-light);
    color: var(--color-base-dark);
  }

  label:hover span {
    background: var(--color-base-lighter-hover);
  }

  input:checked + span {
    background: var(--color-base);
    color: var(--color-on-base);
  }

  input:focus-visible + span {
    outline: 2px solid var(--color-base-dark);
    outline-offset: 2px;
  }
</style>
