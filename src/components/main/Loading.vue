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
    .loading-animation {
        width: 90px;
        height: 90px;
        border-radius: 20px;
        box-shadow: rgb(0 0 0 / 10%) 0px 2px 8px;
        background: var(--bg-color-1);
    }
    .loading-animation .animation {
        top: 5px;
        left: 5px;
    }
    .animation {
        display: inline-block;
        position: relative;
        width: 30px;
        height: 30px;
    }
    .animation span {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(.5, 0, .5, 1) infinite;
        border-color: #6b6b6b transparent transparent transparent;
    }
    body.night-mode .animation span {
        border-color: #a5a5a5 transparent transparent transparent;
    }
    .animation span:nth-child(1) {
        animation-delay: -0.45s;
    }
    .animation span:nth-child(2) {
        animation-delay: -0.3s;
    }
    .animation span:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes modal-background-add {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>