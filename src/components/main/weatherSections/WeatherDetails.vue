<script setup>
    import { onMounted, ref, watch } from "vue";

    import { mainData } from '@/stores/mainData.js';
    import { storeToRefs } from 'pinia';

    const store = mainData();
    const { weatherData } = storeToRefs(store); 

    let clouds = ref(0);
    let precipitations = ref(0);

    watch(
        weatherData,
        () => {
            clouds.value = weatherData.value.list[0].clouds.all;
            precipitations.value = weatherData.value.list[0].pop*100;
            console.log(`${250*(clouds.value/100)} 400;`);
        }
    )
</script>
<template>
    <div class="weather-ditails js-scroll">
        <div class="weather-ditails__info">
            <span class="weather-ditails__label">Облачноть</span>
            <div class="weather-ditails__content">
                <span class="weather-ditails__data clouds">{{ clouds }}</span>
                <svg>
                    <circle cx="50%" xy="50%" r="40"></circle>
                    <circle cx="50%" xy="50%" r="40" id="clouds" 
                    :style="{ strokeDasharray: `${250*(clouds/100)} 400` }" 
                    :class="{ 'no-data': !clouds }"></circle>
                </svg>
            </div>
        </div>
        <div class="weather-ditails__info">
            <span class="weather-ditails__label">Осадки</span>
            <div class="weather-ditails__content">
                <span class="weather-ditails__data pop">{{ precipitations }}</span>
                <svg>
                    <circle cx="50%" xy="50%" r="40"></circle>
                    <circle cx="50%" xy="50%" r="40" id="pop"  
                    :style="{ strokeDasharray: `${250*(precipitations/100)} 400` }" 
                    :class="{ 'no-data': !precipitations }">{{ precipitations }}</circle>
                </svg>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .weather-ditails {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(2, 1fr);
        align-items: center;
        justify-items: center;
        gap: 30px;
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start: 2;
        grid-column-end: 3;
        padding: 12px;
        border-radius: 15px;
        box-shadow: rgb(0 0 0 / 9%) 0px 5px 10px;
        background: var(--bg-color-1);
        box-sizing: border-box;
    }
    .weather-ditails::after {
        position: absolute;
        content: "";
        top: 50%;
        height: 1px;
        width: calc(100% - 40px);
        border-radius: 25px;
        background: var(--bg-color-9);
    }
    .weather-ditails__info {
        display: grid;
        grid-template-rows: min-content 80px;
        gap: 12px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-weight: 600;
    }
    .weather-ditails__label {
        color: var(--text-color-7);
        font-size: 16px;
        text-align: center;
    }
    .weather-ditails__content {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        gap: 20px;
        width: 100%;
        height: 100%;
    }
    .weather-ditails__content svg {
        position: absolute;
        width: 120px;
        height: 120px;
        overflow: visible;
        transform: rotate(-90deg);
    }
    .weather-ditails__content svg circle {
        width: 100%;
        height: 100%;
        fill: transparent;
        stroke: var(--stroke-color-1);
        stroke-width: 5;
        stroke-linecap: round;
        transform: translateY(calc(50% - 1px));
    }
    .weather-ditails__content svg circle:nth-child(2) {
        stroke: var(--stroke-color-2);
        stroke-dasharray: 0 400;
    }
    .weather-ditails__data {
        position: relative;
        margin: 0 18px 0 0;
        font-size: 22px;
        color: var(--text-color-1);
    }
    .weather-ditails__data::after {
        position: absolute;
        top: 4px;
        content: "%";
        font-size: 18px;
    }
    .no-data {
        stroke: transparent !important;
    }
</style>