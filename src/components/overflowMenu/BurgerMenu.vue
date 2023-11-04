<script setup>
    import { ref } from "vue";
    let isMenuOpen = ref(false);
    let isMenuArrowMode = ref(false);


    function changeMenuState() {
        if (!isMenuOpen.value && isMenuArrowMode.value) {
            // On arrow mode active
            isMenuArrowMode.value = false;
            isMenuOpen.value = true;
        } else if (isMenuOpen.value) {
            isMenuArrowMode.value = false;
            isMenuOpen.value = false;
        } else if (!isMenuOpen.value && !isMenuArrowMode.value) {
            isMenuOpen.value = true;
        }
    }
</script>

<template>
    <button class="burger-menu-button" 
    @click="changeMenuState()" 
    :class="{ active: isMenuOpen, arrow: isMenuArrowMode }">
        <span class="burger"></span>
    </button>
    <div class="main-menu" :class="{active: isMenuOpen}">
        <h2 class="main-menu__label">Главное меню</h2>
        <div class="main-menu__content">
            <router-link  to="/settings" aria-label="Settings" tabindex="-1">
                <span>Настройки</span>
            </router-link>
            <router-link to="/favourite-towns" aria-label="About App" tabindex="-1">
                <span>Избранные города</span>
            </router-link>
            <router-link to="/about" aria-label="About App" tabindex="-1">
                <span class="main-menu__button-name info-button-menu">О приложении</span>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    .burger-menu-button {
        position: fixed;
        top: 15px;
        right: 30px;
        width: 40px;
        height: 40px;
        border: 1px solid #ffffff00;
        border-radius: 100%;
        background: none;
        background-size: 28px 28px;
        animation: main-block-add .3s ease;
        transition: background .3s, border .3s, transform .3s, opacity .3s;
        z-index: 300;
    }
    span {
        position: absolute;
        width: calc(100% - 24px);
        left: 16px;
        height: 3px;
        border-radius: 5px;
        background: var(--bg-color-13);
        transition: .2s ease;
    }
    span::before,
    span::after {
        position: absolute;
        content: "";
        height: 3px;
        border-radius: 5px;
        background: var(--bg-color-13);
        transition: .2s ease;
    }
    span::before {
        width: calc(100% + 5px);
        top: -8px;
        left: -5px;
    }
    span::after {
        width: calc(100% + 7px);
        left: -7px;
        top: 8px;
    }
    button.active span {
        background: rgba(0, 0, 0, 0);
        transform: translateX(-10px);
    }
    button.active span::before,
    button.active span::after {
        transform: translateX(10px);
        width: calc(100% + 12px);
        left: 0px;
        top: -1px;
    }
    button.active span::before {
        transform: rotate(45deg);
    }
    button.active span::after {
        transform: rotate(-45deg);
    }

    button.arrow span {
        transform: translateX(0px);
        width: 20px;
        top: 19px;
        left: 12px;
    }
    button.arrow span::before,
    button.arrow span::after {
        transform: translateX(10px);
        width: calc(100% - 4px);
        left: 0px;
        top: 0px;
    }
    button.arrow span::before {
        transform: rotate(45deg);
    }
    button.arrow span::after {
        transform: rotate(-45deg);
    }
    button.arrow span::before {
        top: 5px;
        left: -5px;
    }
    button.arrow span::after {
        top: -5px;
        left: -5px;
    }
    button:hover,
    button:focus-visible {
        cursor: pointer;
        background-color: var(--bg-color-12);
        border: 1px solid var(--border-color-1);
    }
</style>