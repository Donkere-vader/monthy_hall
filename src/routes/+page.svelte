<script lang="ts">
  import { Game, type GamesReport } from "$lib/game";
  import ButtonBox from "../components/button_box.svelte";
  import DoorSelectionModal from "../components/door_selection_modal.svelte";
  import GameInfo from "../components/game_info.svelte";
  import PercentageView from "../components/percentage_view.svelte";

  let showing_door_selection_modal = false;

  const toggleShowingModal = () => {
    showing_door_selection_modal = !showing_door_selection_modal;
  };

  const setNDoors = (e: { detail: number }) => {
    n_doors = e.detail;
    showing_door_selection_modal = false;
  };

  let running = false;
  let playing = false;
  let switch_doors = true;
  let n_doors = 3;

  const MAX_SPEED = 1024;
  let speed: number = 1;

  let percentage = 0;

  let game: Game;
  let latest_report: GamesReport = {
    games_played: 0,
    games_won: 0,
  };

  let interval_runs = 0;
  setInterval(() => {
    if (!running) {
      return;
    }

    if (interval_runs + 1 != MAX_SPEED / speed) {
      interval_runs = (interval_runs + 1) % MAX_SPEED;
      return;
    }
    interval_runs = 0;

    latest_report = game.playOneGame();
    percentage = (latest_report.games_won / latest_report.games_played) * 100;
  }, 1000 / MAX_SPEED);

  const reset = () => {
    running = false;
    playing = false;
    latest_report = {
      games_played: 0,
      games_won: 0,
    };
    percentage = 0;
  };

  const setRunningState = (e: { detail: boolean }) => {
    running = e.detail;
    if (!playing && e.detail) {
      game = new Game(switch_doors, n_doors);
      playing = true;
    }
  };

  const setSwitchDoors = (e: { detail: boolean }) => {
    switch_doors = e.detail;
  };

  const changeSpeed = () => {
    speed = speed * 2;
    if (speed > MAX_SPEED) {
      speed = 1;
    }
    interval_runs = 0;
  };
</script>

<main>
  <div class="game">
    <div class="results">
      <PercentageView {percentage} />
      <GameInfo
        games_played={latest_report.games_played}
        games_won={latest_report.games_won}
      />
    </div>
    <ButtonBox
      {running}
      {playing}
      {switch_doors}
      {n_doors}
      {speed}
      on:reset={reset}
      on:toggle_running={setRunningState}
      on:switch_door={setSwitchDoors}
      on:change_speed={changeSpeed}
      on:set_doors={toggleShowingModal}
    />
  </div>
</main>
{#if showing_door_selection_modal}
  <DoorSelectionModal
    {n_doors}
    on:close={toggleShowingModal}
    on:confirm={setNDoors}
  />
{/if}

<style lang="scss">
  @import "../style/colors";

  main {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;

    .game {
      flex: 1 0 auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      height: 100%;
      max-width: 600px;

      .results {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 50px;
      }
    }
  }

  :global(*) {
    font-family: "Roboto", sans-serif, Arial, Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  :global(html, body) {
    height: 100%;
    background-color: $background-color;
  }
</style>
