<script lang="ts">
  export let percentage: number;
</script>

<div class="percentage-view">
    <div class="bar" style={ `background: linear-gradient(to left, #403D39 ${ 100-percentage }%, #EB5E28 ${ 100-percentage }%)` }>
        <span>{ Math.round(percentage) }%</span>
    </div>
    <span class="text">win%</span>
</div>

<style lang="scss">
    @import "../style/colors";
div.percentage-view {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    flex-direction: column;

    .bar {
        width: 100%;
        height: 35px;
        border-radius: 10px;

        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: $text-color;
    }

    span.text {
        font-size: 16px;
        color: $grey;
    }
}
</style>
