<script setup>
    import { onMounted, ref } from "vue";

    const header = document.querySelector(".header");
    const headerContent = document.querySelector(".header-content");

    const padding = 15;
    const burger = ref(null);
    const mainMenu = ref(null);
    let menu = "";

    let isMenuOpen = ref(false);
    let isMenuArrowMode = ref(false);
    let burgerMenuButtonPositionX = ref(0);
    let burgerMenuButtonPositionY = ref(0);
    let burgerMenuButtonTransformX = ref(0);
    let burgerMenuButtonTransformY = ref(0);

    let headerWidth = 0;
    let headerHeight = 0;
    let headerContentwidth = 0
    let headerContentHeight = 0
    let headerLeft = 0;
    let headerTop = 0;

    function changeMenuState() {
        if (!isMenuOpen.value && isMenuArrowMode.value) {
            // On arrow mode active
            isMenuArrowMode.value = false;
            isMenuOpen.value = true;
        } else if (isMenuOpen.value) {
            isMenuArrowMode.value = false;
            isMenuOpen.value = false;
            burgerMenuButtonTransformX.value = 0;
            burgerMenuButtonTransformY.value = 0;
            header.style = "";
        } else if (!isMenuOpen.value && !isMenuArrowMode.value) {
            isMenuOpen.value = true;
            burgerMenuButtonTransformX.value = burgerMenuButtonTransformX.value - menu.clientWidth + 65 + (headerWidth - headerContentwidth)/2;
            burgerMenuButtonTransformY.value = 0;
            header.style = `transform: translateX(${-menu.clientWidth}px);`;
        }
    }

    function menuPosition(burgerElement) {
        headerWidth = header.clientWidth;
        headerHeight = header.clientHeight;
        headerContentwidth = headerContent.clientWidth;
        headerContentHeight = headerContent.clientHeight;
        headerLeft = header.clientLeft;
        headerTop = header.clientTop;
        
        burgerMenuButtonPositionX.value = headerWidth - padding - burgerElement.clientWidth - headerLeft - (headerWidth - headerContentwidth)/2;
        burgerMenuButtonPositionY.value = headerHeight - burgerElement.clientHeight + headerTop;
    }

    onMounted(() => {
        menu = mainMenu.value;

        menuPosition(burger.value);
        window.addEventListener("resize", () => {
            menuPosition(burger.value);
        });
    })
</script>

<template>
    <button class="burger-menu-button" 
    ref="burger" 
    @click="changeMenuState()" 
    :class="{ active: isMenuOpen, arrow: isMenuArrowMode }"
    :style="{ top: `{${burgerMenuButtonPositionY}px`, left: `${burgerMenuButtonPositionX}px`, transform: `translateX(${burgerMenuButtonTransformX}px)` }">
        <span class="burger"></span>
    </button>
    <div class="main-menu" 
    :class="{active: isMenuOpen}"
    ref="mainMenu">
        <h2 class="main-menu__label">Главное меню</h2>
        <div class="main-menu__content">
            <router-link class="main-menu__button" to="/settings" aria-label="Settings" tabindex="-1">
                <span>Настройки</span>
            </router-link>
            <router-link class="main-menu__button" to="/favourite-towns" aria-label="About App" tabindex="-1">
                <span>Избранные города</span>
            </router-link>
            <router-link class="main-menu__button" to="/about" aria-label="About App" tabindex="-1">
                <span>О приложении</span>
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
    .burger-menu-button.active span {
        background: rgba(0, 0, 0, 0);
        transform: translateX(-10px);
    }
    .burger-menu-button.active span::before,
    .burger-menu-button.active span::after {
        transform: translateX(10px);
        width: calc(100% + 12px);
        left: 0px;
        top: -1px;
    }
    .burger-menu-button.active span::before {
        transform: rotate(45deg);
    }
    .burger-menu-button.active span::after {
        transform: rotate(-45deg);
    }

    .burger-menu-button.arrow span {
        transform: translateX(0px);
        width: 20px;
        top: 19px;
        left: 12px;
    }
    .burger-menu-button.arrow span::before,
    .burger-menu-button.arrow span::after {
        transform: translateX(10px);
        width: calc(100% - 4px);
        left: 0px;
        top: 0px;
    }
    .burger-menu-button.arrow span::before {
        transform: rotate(45deg);
    }
    .burger-menu-button.arrow span::after {
        transform: rotate(-45deg);
    }
    .burger-menu-button.arrow span::before {
        top: 5px;
        left: -5px;
    }
    button.arrow span::after {
        top: -5px;
        left: -5px;
    }
    .burger-menu-button:hover,
    .burger-menu-button:focus-visible {
        cursor: pointer;
        background-color: var(--bg-color-12);
        border: 1px solid var(--border-color-1);
    }
    .main-menu {
        position: fixed;
        top: 0;
        display: flex;
        flex-direction: column;
        gap: 17px;
        left: calc(100% - 300px);
        background: var(--bg-color-1);
        width: 300px;
        height: 100vh;
        padding: 10px;
        z-index: 20;
        pointer-events: none;
        transform: translateX(300px);
        transition: transform .3s, opacity .3s;
        box-sizing: border-box;
    }
    .main-menu__label {
        position: relative;
        top: 8px;
        margin: 0px 0 0 45px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 27px;
        font-weight: 700;
        color: var(--text-color-1);
    }
    .main-menu__button {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 7px;
        border-radius: 10px;
        border: none;
        background: none;
        text-align: left;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: var(--text-color-1);
        transition: .2s ease;
        box-sizing: border-box;
    }
    .main-menu__button:hover,
    .main-menu__button:focus {
        cursor: pointer;
        background: var(--bg-color-12);
    }
    .main-menu__button:active {
        transform: scale(.97);
    }
    .main-menu.active {
        pointer-events: all;
        box-shadow: 0px 0px 18px #00000021;
        transform: translateX(0px);
    }
</style>