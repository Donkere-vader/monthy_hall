<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let type: "primary" | "secondary" | "disabled" = "secondary";
  export let disabled = false;

  let clazz: string = "";
  export {clazz as class};

const dispatch = createEventDispatcher();

const onClick = () => {
    if (disabled) { return; }
    dispatch("click");
}
</script>

<button on:click={ onClick } class={ `${ type } ${ clazz } ${ disabled ? "disabled" : ""}` }>
    <div class="button-content">
        <slot />
    </div>
</button>

<style lang="scss">
    @import "../style/colors";
button {
    border: none;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;

    .button-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    &.primary {
        background-color: $accent;
    }

    &.secondary {
        background-color: $dark-grey;
    }

    &.secondary.disabled {
        background-color: mix($dark-grey, $background-color, 30%);
    }
    
    &.primary.disabled {
        background-color: mix($accent, $background-color, 30%);
    }
}
</style>
