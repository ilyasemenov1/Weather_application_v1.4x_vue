<script setup>
    import { ref, onMounted } from "vue";

    import Logo from "./Logo.vue";
    import CitySearch from "./CitySearch.vue";
    import BurgerMenu from "./overflowMenu/BurgerMenu.vue";

    let header = ref(null);

    function setHeaderPosition() {
        
    }

    onMounted(() => {
        window.addEventListener("scroll", setHeaderPosition);
    });
</script>

<template>
    <header class="header" ref="header">
        <div class="header-content" ref="headerContent">
            <div class="header-blocks">
                <Logo>
                    Погода
                </Logo>
                <CitySearch></CitySearch>
            </div>
        </div>
    </header>
    <BurgerMenu></BurgerMenu>
</template>

<style scoped>
    .header {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        min-height: 70px;
        margin: 0 auto;
        padding: 10px 0;
        box-shadow: 0px 0px 15px #00000015;
        background: var(--bg-color-1);
        z-index: 9;
        transition: transform ease .3s;
        box-sizing: border-box;
    }
    .header.not-scrolled {
        position: fixed;
        animation: headerNotScrolled .2s ease forwards;
    }
    .header.scrolled {
        position: fixed;
        animation: headerScrolled .2s ease forwards;
    }
    @keyframes headerScrolled {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes headerNotScrolled {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 20px;
        max-width: 1440px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .header-blocks {
        display: flex;
        align-items: center;
        column-gap: 100px;
        width: 100%;
    }
</style>