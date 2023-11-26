<script setup>
    
</script>
<template>
    <div class="weather-content-block">
        <div class="weather-content-block__text">
            <slot name="firstTextContent"></slot>
        </div>
        <div class="weather-content-block__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<style scoped>
    .weather-content-block {
        display: flex;
        flex-direction: column;
        row-gap: 15px;
        padding: 12px;
        border-radius: 15px;
        box-shadow: 0px 5px 14px #00000018;
        overflow: hidden;
        background: var(--gradient-1);
    }
    .weather-content-block.hourly-forecast {
        background: var(--gradient-2);
    }
    .weather-content-block__text {
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 15px;
        font-weight: 600;
        color: var(--text-color-2);
    }
    .weather-content-block__content {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>