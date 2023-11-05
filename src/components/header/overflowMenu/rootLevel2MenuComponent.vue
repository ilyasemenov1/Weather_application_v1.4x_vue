<script setup>
    
</script>

<template>
    <section class="level2-menu">
        <div class="level2-menu__label--conteiner">
            <h2 class="level2-menu__label">
                <slot name="labelText"></slot>
            </h2>
        </div>
        <div class="level2-menu__content">
            <slot name="content"></slot>
        </div>
    </section>
</template>

<style scoped>
    .level2-menu {
        position: fixed;
        left: calc(100% - 500px);
        display: grid;
        grid-template-rows: min-content calc(100% - 53px);
        max-width: 500px;
        height: 100vh;
        width: 100%;
        padding: 0 !important;
        box-shadow: 0px 0px 18px #00000021;
        background: var(--bg-color-1);
        transition: transform .3s ease, opacity .3s ease;
        box-sizing: border-box;
        z-index: 200;

        transform: translateX(200px);
        opacity: 0;
        pointer-events: all;
        visibility: hidden;

    }
    .level2-menu.active {
        transform: translateX(0);
        opacity: 1;
        pointer-events: all;
        visibility: visible;
    }
    .level2-menu__label--conteiner {
        display: flex;
        justify-content: left;
        align-items: center;
        min-height: 70px;
        width: 100%;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: var(--text-color-1);
        transition: .2s ease;
        z-index: 10;
    }
    .level2-menu__label {
        font-size: 27px;
        margin: 0 0 0 58px;
        white-space: nowrap;
        max-width: calc(100% - 24px);
    }
</style>