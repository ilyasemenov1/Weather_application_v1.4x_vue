<script setup>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Mousewheel } from 'swiper/modules';

    import { onMounted, ref, watch } from "vue";

    import 'swiper/css';

    import { mainData } from '@/stores/mainData.js';
    import { storeToRefs } from 'pinia';

    import {
        transformTempToSettingUnit,
        transformSpeedToSettingUnit, 
        arrayMin,
        arrayMax,
        average,
        mode
    } from "@/assets/js/appFunctions.js";

    const store = mainData();
    const { weatherData } = storeToRefs(store); 

    const swiperOptions = ref({
        breakpoints: {
            280: {
                slidesPerView: 2
            },
            680: {
                slidesPerView: 3
            },
            850: {
                slidesPerView: 4
            },
            950: {
                slidesPerView: 4
            },
            1175: {
                slidesPerView: 2
            },
            1225: {
                slidesPerView: 3
            },
            1350: {
                slidesPerView: 4
            }
        }
    })
    const modules = ref([Mousewheel]);

    const addNewDayDate = (index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);

        let options = {
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('ru-RU', options);
    }

    const addWeekDay = (index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);

        if (index != 1) {
            var options = { 
                weekday: 'long',
            };
            return date.toLocaleDateString('ru-RU', options);
        } else {
            return "завтра";
        }
    }

    const setMinMaxTemp = (index) => {
        if (!weatherData.value.list) return 0;
        const arr = weatherData.value.list.slice((index-1)*8, index*8).map((e) => e.main.temp);
        return `${transformTempToSettingUnit(arrayMax(arr))} / ${transformTempToSettingUnit(arrayMin(arr))}`;
    }

    const setSpeed = (index) => {
        if (!weatherData.value.list) return 0;
        const arr = weatherData.value.list.slice((index-1)*8, index*8).map((e) => e.wind.speed);
        return transformSpeedToSettingUnit(average(arr));
    }

    const setHumidity = (index) => {
        if (!weatherData.value.list) return 0;
        const arr = weatherData.value.list.slice((index-1)*8, index*8).map((e) => e.main.humidity);
        return Math.round(average(arr))
    }

    const setIconSrc = (index) => {
        if (!weatherData.value.list) return 0;
        const arr = weatherData.value.list.slice((index-1)*8, index*8).map((e) => e.weather[0].icon);
        return new URL(`/src/assets/icons/weatherIcons/${mode(arr)}.svg`, import.meta.url);
    } 

    const setStatus = (index) => {
        if (!weatherData.value.list) return 0;
        const arr = weatherData.value.list.slice((index-1)*8, index*8).map((e) => e.weather[0].description);
        return mode(arr);
    }

    // TODO: Fix data update bugs

    const isWrap = (index) => {
        setTimeout(() => {
            const element = document.getElementById(`day-card-data-${index}`);
            const data = document.getElementById(`day-card-wind-and-speed-${index}`);
            if (!element) return;
            element.clientHeight > 100 ? data.classList.add("wrap") : data.classList.remove("wrap");
        }, 100);

    }

    watch(weatherData,
    () => {
        for (let i = 1; i < 5; i++) {
            isWrap(i);
        }
    })
</script>
<template>
    <section class="four-day-forecast-short js-scroll">
        <h2 class="four-day-forecast-short__label">Прогноз на 4 дня</h2>
        <div class="four-day-forecast-short__content">
            <swiper class="four-day-forecast-short__slider swiper-wrapper"
            :modules="modules"
            :slides-per-group="4"
            :space-between="10"
            :breakpoints="swiperOptions.breakpoints"
            :mousewheel="false">
                <swiper-slide v-for="i in 4">
                    <a :href="`#day-info-block-${i}`" class="day-card">
                        <div class="day-card__label--conteiner">
                            <span class="day-card__label">
                                {{ addWeekDay(i) }}
                            </span>
                            <span class="day-card__date">
                                {{ addNewDayDate(i) }}
                            </span>
                        </div>
                        <img class="day-card__weather-icon" :src="setIconSrc(i)" alt="Иконка статуса погоды">
                        <div class="day-card__data" :id="`day-card-data-${i}`">
                            <span class="day-card__status">{{ setStatus(i) }}</span>
                            <div class="day-card__main-info">
                                <span class="day-card__temp-block">
                                    <span class="day-card__temp">{{ setMinMaxTemp(i) }}</span>
                                </span>
                            </div>
                            <div class="day-card__second-block" :id="`day-card-wind-and-speed-${i}`">
                                <span class="day-card__wind">
                                    <span class="day-card__wind-block">{{ setSpeed(i) }}</span>
                                </span>
                                <span class="day-card__humidity">
                                    <span class="day-card__humidity-block">{{ setHumidity(i) }}</span>
                                </span>
                            </div>
                        </div>
                    </a>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>
<style scoped>
    .four-day-forecast-short {
        display: flex;
        flex-direction: column;
        grid-column-start: 1;
        grid-column-end: 2;
        row-gap: 5px;
        height: 100%;
        min-height: 284px;
        padding: 12px;
        border-radius: 15px;
        box-shadow: 0px 5px 14px #00000018;
        box-sizing: border-box;
        overflow: hidden;
        background: var(--gradient-3);
    }
    .four-day-forecast-short__label {
        padding: 0;
        margin: 0;
        font-family: "Sourse Sans Pro", sans-serif;
        font-weight: 700;
        font-size: 22px;
        color: #ffffffe7;
    }
    .four-day-forecast-short__content {
        position: relative;
        height: 100%;
    }
    .four-day-forecast-short__slider {
        position: absolute;
        display: flex;
        flex-wrap: nowrap;
        height: 100%;
    }
    .day-card {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 10px;
        border: 2px solid transparent;
        border-radius: 15px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-weight: 600;
        font-size: 17px;
        text-decoration: none;
        color: var(--text-color-2);
        transition: .2s ease;
        box-sizing: border-box;
    }
    .day-card:hover,
    .day-card:focus {
        cursor: pointer;
        background: #ffffff0c;
        border: 2px solid #ffffff1a;
        box-shadow: 0px 0px 14px #00000018;
    }
    .day-card__label--conteiner {
        display: flex;
        flex-direction: column;
    }
    .day-card__label {
        display: block;
        font-size: 20px;
        font-weight: 700;
    }
    .day-card__label::first-letter {
        text-transform: uppercase;
    }
    .day-card__date {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-color-3);
    }
    .day-card__weather-icon {
        position: relative;
        left: -6px;
        width: 70px;
        height: max-content;
        min-height: 50px;
    }
    .day-card__temp-block {
        display: flex;
        font-size: 19px;
        font-weight: 700;
    }
    .day-card__second-block {
        display: flex;
        flex-direction: column;
    }
    .day-card__second-block.wrap {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
    }
    .day-card__main-info {
        margin: 5px 0;
    }
    .day-card__temp {
        position: relative;
    }
    .day-card__temp::after {
        position: absolute;
        content: "°C";
    }
    .day-card__status::first-letter {
        text-transform: uppercase !important;
    }
</style>