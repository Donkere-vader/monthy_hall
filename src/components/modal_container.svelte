<div class="modal-container">
    <div class="card">
        <slot />
    </div>
</div>

<style lang="scss">
@import "../style/colors";

.modal-container {
    top: 0;
    left: 0;
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);

    .card {
        background-color: $background-color;
        border-radius: 15px;
        padding: 20px;
        max-width: 80%;
    }
}
</style>
