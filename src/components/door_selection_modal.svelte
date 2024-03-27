<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ModalContainer from "./modal_container.svelte";
  import Button from "./button.svelte";

  export let n_doors: number;

  let input_text: string = n_doors.toString();

  const dispatch = createEventDispatcher();

  let error: undefined | string = undefined;

  let NUMBER_PATTERN = new RegExp("^[0-9]+$");
  const confirm = () => {
    if (NUMBER_PATTERN.exec(input_text) === null) {
        error = "Please fill in an integer.";
        return;
    }

    let doors = Number(input_text);
    if (doors < 3) {
        error = "You must at least have 3 doors."
        return;
    }
    n_doors = doors;

    dispatch("confirm", n_doors);
  };

  const cancel = () => {
    dispatch("close");
  };

  const init = (el: HTMLInputElement) => {
    el.focus();
  }
</script>

<ModalContainer>
  <div class="modal">
    <span>How many doors do you want to run the simulation with (min 3)?</span>
    {#if error != undefined}
      <span class="error">{error}</span>
    {/if}
    <input
      type="text"
      name="doors_input"
      id="doors_input"
      bind:value={input_text}
      use:init
    />
    <div class="buttons">
      <Button type="secondary" on:click={cancel}>
        <span class="button-text">cancel</span>
      </Button>
      <Button type="primary" on:click={confirm}>
        <span class="button-text">confirm</span>
      </Button>
    </div>
  </div>
</ModalContainer>

<style lang="scss">
  @import "../style/colors";

  .modal {
    display: flex;
    gap: 30px;
    color: $text-color;
    text-align: center;
    flex-direction: column;

    .error {
        background-color: $red;
        border-radius: 5px;
        padding: 10px;
        font-weight: bold;
    }

    input {
      font-size: 40px;
      font-weight: bold;
      background: none;
      border: none;
      text-align: center;
      color: $text-color;
      outline: none;
    }

    .buttons {
      display: flex;
      gap: 10px;

      :global(button) {
        flex: 1 0 auto;
      }

      span.button-text {
        font-weight: bold;
        font-size: 16px;
        color: $text-color;
      }
    }
  }
</style>
