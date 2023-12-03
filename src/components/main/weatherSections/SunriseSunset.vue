<script setup>
    import { ref, watch } from "vue";

    import SunriseIcon from "../../../components/icons/SunriseIcon.vue";
    import SunsetIcon from "../../../components/icons/SunsetIcon.vue";

    import { mainData } from '@/stores/mainData.js';
    import { storeToRefs } from 'pinia';

    import { dtConventer } from "@/assets/js/appFunctions.js";

    const store = mainData();
    const { weatherData } = storeToRefs(store); 

    let sunrise = ref("");
    let sunset = ref("");

    watch(
        weatherData,
        () => {
            const data = weatherData.value.city;
            sunrise.value = dtConventer(data.sunrise, false);
            sunset.value = dtConventer(data.sunset, false);
        }
    )

</script>
<template>
    <div class="main-info-block-add-info">
        <div class="sunrise-sunset">
            <div class="sunrise-sunset__sunrise">
                <div class="sunrise-sunset__sunrise-icon icon">
                    <SunriseIcon />
                </div>
                <span class="sunrise-sunset__sunrise-label">Рассвет:</span>
                <span class="sunrise-sunset__sunrise-time">{{ sunrise }}</span>
            </div>
            <div class="sinrise-sunset__sunset">
                <div class="sunrise-sunset__sunset-icon icon">
                    <SunsetIcon />
                </div>
                <span class="sunrise-sunset__sunset-label">Закат:</span>
                <span class="sunrise-sunset__sunset-time">{{ sunset }}</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .main-info-block-add-info {
        display: flex;
        flex-direction: row-reverse;
        gap: 25px;
        grid-column-start: 1;
        grid-column-end: 3;
        @media (max-width: 640px) {
            flex-direction: column;
        }
    }
    .sunrise-sunset {
        padding: 12px;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.103) 0px 2px 8px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-weight: 600;
        font-size: 17px;
        color: var(--text-color-1);
        @media (max-width: 640px) {
            width: auto;
        }
    }
    .sunrise-sunset {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 20px;
        align-items: center;
        width: 100%;
        background: var(--bg-color-1);
    }
    .sunrise-sunset::after {
        position: absolute;
        content: "";
        left: 50%;
        top: 8px;
        width: .5px;
        height: calc(100% - 16px);
        background: var(--text-color-1);
        opacity: .5;
    }
    .sunrise-sunset>div {
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .icon {
        position: relative;
        width: 21px;
        height: 21px;
    }
    .icon svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        fill: var(--text-color-1);
        stroke: var(--text-color-1);
    }
    .sunrise-sunset__sunrise-icon svg {
        fill: none;
    }
</style>