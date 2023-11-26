import { defineStore } from 'pinia'
import { ref } from "vue";

export const mainData = defineStore("main-data", () => {
    let weatherData = ref({});
    let isShowWeatherInfo = ref(false);
    let isShowLoader = ref(true);
    let isShowSearchErr = ref(false);
    let isLocationNotFoundErr = ref(false);
    let cityName = ref("a");
    let cityNameShow = ref("a");

    return { weatherData, isShowWeatherInfo, isShowLoader, isShowSearchErr, isLocationNotFoundErr, cityName, cityNameShow }
})