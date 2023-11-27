<script setup>
    import MainWeatherContentRoot from "./MainWeatherContentRoot.vue";
    import RightArrowIcon from "../../icons/RightArrowIcon.vue";
    import LeftArrowIcon from "../../icons/LeftArrowIcon.vue";

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, Keyboard, Mousewheel } from 'swiper/modules';

    import { ref, watch } from "vue";

    import 'swiper/css';

    import { mainData } from '@/stores/mainData.js';
    import { storeToRefs } from 'pinia';

    import { transformTempToSettingUnit, constructDate, conventDtTxt } from "@/assets/js/appFunctions.js";

    const store = mainData();
    const { weatherData } = storeToRefs(store); 

    let weatherDataArr = ref([]);
    let iconsArr = ref([]);
    let gapToNewDate = ref(0);
    let isGapedDate = false;

    function newDayDate(index) {
        let date = new Date();
        date.setDate(date.getDate() + index);

        let options = {
            month: 'numeric', 
            day: 'numeric' 
        };

        return date.toLocaleDateString('ru-RU', options);
    }

    watch(
        weatherData,
        () => {
            weatherDataArr.value = weatherData.value.list;
            for (let i = 0; i < [...weatherDataArr.value].length; i++) {
                weatherDataArr.value[i].index = i;
                iconsArr.value.push(new URL(`/src/assets/icons/weatherIcons/${weatherDataArr.value[i].weather[0].icon}.svg`, import.meta.url));
                if (conventDtTxt(weatherDataArr.value[i].dt_txt) == "00:00" && !isGapedDate) {
                    gapToNewDate.value = i;
                    isGapedDate = true;
                }
            }
        }
    )

    let prev = ref(null);
    let next = ref(null);

    const modules = ref([Navigation, Keyboard, Mousewheel]);
</script>

<template>
    <MainWeatherContentRoot>
        <template #firstTextContent>
            <h2 class="hourly-forecast__label">Почасовой прогноз</h2>
        </template>
        <template #content>
            <div class="hourly-forecast__slider">
                <button class="hourly-forecast__left-button active-button main-focusable" aria-label="Left Button" tabindex="0" ref="prev">
                    <span class="hourly-forecast__left-button-view">
                        <LeftArrowIcon />
                    </span>
                </button>
                <div class="hourly-forecast__slider-block">
                    <swiper class="hourly-forecast__slider-content swiper-wrapper"
                        :modules="modules"
                        slides-per-view="auto"
                        :slides-per-group="3"
                        :space-between="10"
                        :keyboard="{
                            enabled: true,
                        }"
                        :navigation="{
                            enabled: true,
                            prevEl: prev,
                            nextEl: next
                        }"
                        :mousewheel="true">
                        <swiper-slide v-for="forecastElement in weatherDataArr" class="slider-block" :class="{'new-day': conventDtTxt(forecastElement.dt_txt) == '00:00'}">
                            <span class="slider-block__time">{{ forecastElement.index == 0 ? constructDate() : conventDtTxt(forecastElement.dt_txt) }}</span>
                            <img class="slider-block__status-icon" :src="iconsArr[forecastElement.index]" alt="Иконка статуса погоды">
                            <span class="slider-block__temp-block">
                                <span class="slider-block__temp">{{ transformTempToSettingUnit(forecastElement.main.temp) }}</span>
                            </span>
                            <span class="slider-date" v-show="conventDtTxt(forecastElement.dt_txt) == '00:00'">{{ newDayDate((forecastElement.index - gapToNewDate)/8 + 1) }}</span>
                        </swiper-slide>
                    </swiper>
                </div>
                <button class="hourly-forecast__right-button active-button main-focusable" aria-label="Right Button" tabindex="0" ref="next">
                    <span class="hourly-forecast__right-button-view">
                        <RightArrowIcon />
                    </span>
                </button>
            </div>
        </template>
    </MainWeatherContentRoot>
</template>
<style scoped>
    .hourly-forecast__label {
        padding: 0;
        margin: 0;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 22px;
        color: var(--text-color-2);
    }
    .hourly-forecast__slider {
        display: grid;
        grid-template-columns: 30px 1fr 30px;
        grid-column-gap: 10px;
        height: 100px;
    }
    .hourly-forecast__slider-block {
        position: relative;
        overflow: hidden;
        user-select: none;
    }
    .hourly-forecast__slider-content {
        position: absolute;
        display: flex;
        height: 100%;
    }
    .hourly-forecast__right-button,
    .hourly-forecast__left-button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
        border: none;
        background: none;
        cursor: pointer;
    }

    .hourly-forecast__right-button-view,
    .hourly-forecast__left-button-view {
        position: relative;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: var(--bg-color-6);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 12px 12px;
        transition: .3s ease;
    }.hourly-forecast__right-button-view svg,
    .hourly-forecast__left-button-view svg {
        position: absolute;
        width: calc(100% - 11px);
        height: calc(100% - 11px);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        fill: #ffffff;
    }
    .swiper-button-disabled {
        pointer-events: none;
    }
    .swiper-button-disabled .hourly-forecast__right-button-view,
    .swiper-button-disabled .hourly-forecast__left-button-view {
        opacity: .6;
    }
    .hourly-forecast__right-button:hover .hourly-forecast__right-button-view,
    .hourly-forecast__right-button:focus-visible  .hourly-forecast__right-button-view {
        transform: translateX(2px);
        background-color: var(--bg-color-7);
    }
    .hourly-forecast__right-button:hover.swiper-button-disabled .hourly-forecast__right-button-view,
    .hourly-forecast__right-button:focus-visible.swiper-button-disabled .hourly-forecast__right-button-view {
        transform: translateX(0px);
        background-color: var(--bg-color-6);
    }
    .hourly-forecast__left-button:hover .hourly-forecast__left-button-view,
    .hourly-forecast__left-button:focus-visible  .hourly-forecast__left-button-view {
        transform: translateX(-2px);
        background-color: var(--bg-color-7);
    }
    .hourly-forecast__left-button:hover.swiper-button-disabled .hourly-forecast__left-button-view,
    .hourly-forecast__left-button:focus-visible.swiper-button-disabled .hourly-forecast__left-button-view {
        transform: translateX(0px);
        background-color: var(--bg-color-6);
    }
    .hourly-forecast__left-button-view {
        background-image: var(--left-arrow-icon-path);
    }
    .hourly-forecast__right-button-view {
        background-image: var(--right-arrow-icon-path);
    }
    .slider-block {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 50px;
    }
    .slider-date {  
        position: absolute;
        top: 5px;
        left: -32px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 11px;
        font-weight: 700;
        color: var(--text-color-3);
    }
    .slider-block.new-day {
        margin-left: 30px;
    }
    .slider-block.new-day::after {
        position: absolute;
        top: 25px;
        left: -20px;
        content: "";
        width: 1px;
        height: calc(100% - 30px);
        background: var(--bg-color-8);
    }
    .slider-block__time {
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        color: var(--text-color-3);
    }
    .slider-block__time.h12 {
        position: relative;
        top: 5px;
        font-size: 12px;
    }
    .slider-block__temp-block {
        display: flex;
        justify-content: center;
    }
    .slider-block__temp {
        position: relative;
        left: -5px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: var(--text-color-2);
    }
    .slider-block__temp::after {
        position: absolute;
        content: "°C";
    }
    .weather-main__staus-icon {
        position: absolute;
        left: -75px;
        top: -15px;
        width: 70px;
        height: 70px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 60px 60px;
    }
    .slider-block__status-icon {
        position: absolute;
        top: calc(50% - 25px);
        left: calc(50% - 25px);
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>