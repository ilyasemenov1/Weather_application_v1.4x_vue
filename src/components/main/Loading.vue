<script setup>
    import { storeToRefs } from 'pinia'

    import { mainData } from '../../stores/mainData.js';

    const store = mainData();
    const { isShowLoader } = storeToRefs(store); 
</script>
<template>
    <div class="loading-animation--conteiner" :class="{ disactive: !isShowLoader }">
        <span class="loading-animation">
            <span class="animation">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </span>
        </span>
    </div>
</template>
<style scoped>
    .loading-animation--conteiner {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation: info-block-add .3s ease;
        z-index: 5;
    }
</style>