<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "./button.svelte";

  export let running: boolean;
  export let playing: boolean;
  export let speed: number;
  export let n_doors: number;
  export let switch_doors: boolean;

  const dispatch = createEventDispatcher();

  const toggleRunning = () => {
    dispatch("toggle_running", !running);
  };

  const toggleSwitchDoors = () => {
    dispatch("switch_door", !switch_doors);
  };

  const onReset = () => {
    dispatch("reset");
  };

  const changeSpeed = () => {
    dispatch("change_speed");
  }

  const onSetDoors = () => {
    dispatch("set_doors");
  }
</script>

<div class="button-box">
  <Button type="secondary" disabled={playing} on:click={ onSetDoors }>
    <span class="material-icons-round">door_front</span>
    <div class="text">{ n_doors }</div>
  </Button>
  <Button on:click={ changeSpeed }>
    <span class="material-icons-round">speed</span>
    <div class="text">{speed}x</div>
  </Button>
  <Button
    type={switch_doors ? "primary" : "secondary"}
    disabled={playing}
    on:click={toggleSwitchDoors}
  >
    <span class="material-icons-round">sync_alt</span>
  </Button>
  <Button on:click={onReset}>
    <span class="material-icons-round">restart_alt</span>
  </Button>
  <Button type="primary" class="play-button" on:click={toggleRunning}>
    <span class="material-icons-round">{running ? "pause" : "play_arrow"}</span>
  </Button>
</div>

<style lang="scss">
  @import "../style/colors";

  div.button-box {
    height: 25%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;

    .material-icons-round {
      font-size: 35px;
      color: $text-color;
    }

    .text {
      font-size: 20px;
      color: $text-color;
    }

    :not(.disabled).primary .material-icons-round {
      color: $background-color;
    }

    :global(.play-button) {
      grid-column: span 2;
    }
  }
</style>
