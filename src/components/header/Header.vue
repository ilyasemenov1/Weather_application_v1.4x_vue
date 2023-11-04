<script setup>
    import Logo from "./Logo.vue";
    import CitySearch from "./CitySearch.vue";
    import { onMounted, ref } from "vue";

    const headerContent = ref(null);
    const headerRef = ref(0);

    onMounted(() => {
        headerRef.value = headerContent.value.clientWidth;
        setHeaderRef(headerRef.value);

        window.addEventListener("resize", () => {
            headerRef.value = headerContent.value.clientWidth;
            setHeaderRef(headerRef.value);
        })
    });

    function setHeaderRef(refValue) {
        sessionStorage.setItem("header-width", JSON.stringify(refValue));
    }

</script>

<template>
    <header class="header">
        <div class="header-content" ref="headerContent">
            <div class="header-blocks">
                <Logo>
                    Погода
                </Logo>
                <CitySearch></CitySearch>
            </div>
        </div>
    </header>
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
        transition: transform .3s;
        box-sizing: border-box;
    }
    .header.scrolled {
        position: fixed;
        min-height: 60px;
        padding: 8px 20px;
        box-shadow: 0px 0px 18px #00000025;
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