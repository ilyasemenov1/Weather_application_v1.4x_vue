<script setup>
    import LogoIcon from "../icons/LogoIcon.vue";
</script>

<template>
    <div class="logo">
        <div class="icon">
            <LogoIcon></LogoIcon>
        </div>
        <h1 class="logo-text">
            <slot></slot>
        </h1>
    </div>
</template>

<style scoped>
    .logo {
        position: relative;
        display: flex;
        gap: 5px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-weight: 800;
        letter-spacing: 1px;
        color: var(--text-color-1);
    }
    .icon {
        width: 22px;
        height: 22px;
    }
    .icon svg {
        position: absolute;
        top: 6px;
        left: 0;
        width: inherit;
        height: inherit;
    }
    .logo-text {
        font-size: 26px;
        margin: 0;
    }
</style>