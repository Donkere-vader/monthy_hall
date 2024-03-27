<script lang="ts">
  export let games_played: number;
  export let games_won: number;

  let size = 40;

  if (games_played >= 1_000_000_000) {
    size = 10;
  } else if (games_played >= 100_000) {
    size = 20;
  } else if (games_played >= 10_000) {
    size = 30;
  }
</script>

<div class="game-info">
  <div class="grid">
    <span class="header">played</span>
    <span class="header">won</span>
    <span class="header">lost</span>
    <span class="value" style={ `font-size: ${size}px;` }>{games_played}</span>
    <span class="value" style={ `font-size: ${size}px;` }>{games_won}</span>
    <span class="value" style={ `font-size: ${size}px;` }>{games_played - games_won}</span>
  </div>
</div>

<style lang="scss">
  @import "../style/colors";

  div.game-info {
    display: flex;
    align-items: center;
    justify-content: center;

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5px;
      align-items: center;
      justify-items: center;
      color: $text-color;
      width: 100%;

      .header {
        font-size: 14px;
      }

      .value {
        font-weight: bold;
      }
    }
  }
</style>
