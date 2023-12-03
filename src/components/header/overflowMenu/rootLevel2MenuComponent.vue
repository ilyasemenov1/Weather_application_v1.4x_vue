<script setup>
    import { ref } from "vue";
    let isLabelShadow = ref(false);

    function contentScrollEvent(event) {
        let target = event.target;
        scroll = target.scrollTop;
        scroll > 0 ? isLabelShadow.value = true : isLabelShadow.value = false;
    }
</script>

<template>
    <section class="level2-menu">
        <header class="level2-menu__label--conteiner" :class="{ shadow: isLabelShadow }">
            <h2 class="level2-menu__label">
                <slot name="labelText"></slot>
            </h2>
        </header>
        <main class="level2-menu__content" @scroll="(event) => contentScrollEvent(event)">
            <slot name="content"></slot>
        </main>
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
        transition: .3s ease transform, .3s ease opacity;
        box-sizing: border-box;
        z-index: 200;

        transform: translateX(200px);
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
        @media (max-width: 768px) {
            left: 0;
            max-height: 100vh;
            max-width: none;
            height: 100%;
            padding: 20px;
        }
    }
    .level2-menu.active {
        transform: translateX(0);
        opacity: 1;
        pointer-events: inherit;
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
    .level2-menu__label--conteiner.shadow {
        box-shadow: 4px 6px 8px -3px #00000011;
    }
    .level2-menu__label {
        font-size: 27px;
        margin: 0 0 0 58px;
        white-space: nowrap;
        max-width: calc(100% - 24px);
    }
    .level2-menu__content {
        padding: 0 20px 12px 20px;
        margin: 0 10px 25px 0;
        overflow-y: visible;
        overflow-x: hidden;  
    }
    .level2-menu__content::-webkit-scrollbar {
        width: 7px;
    }
    .level2-menu__content::-webkit-scrollbar-thumb {
        background: var(--scroll-bar-color);
        border-radius: 10px;
    }
    .level2-menu__content::-webkit-scrollbar-thumb:hover {
        background: var(--scroll-bar-color-2);
    }
    </style>