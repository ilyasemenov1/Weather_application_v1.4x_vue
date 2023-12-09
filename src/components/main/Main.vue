<script setup>
    import MainWeather from './weatherSections/MainWeather.vue';
    import HourlyForecast from './weatherSections/HourlyForecast.vue';
    import SunriseSunset from './weatherSections/SunriseSunset.vue';
    import Loading from "./Loading.vue";
    import GeolocationErr from './errorSections/GeolocationErr.vue';
    import SearchErr from './errorSections/SearchErr.vue';
    import WeatherDetails from './weatherSections/WeatherDetails.vue';
    import ShortFourDaysForecast from './weatherSections/ShortFourDaysForecast.vue';
    import FullFourDaysForecast from './weatherSections/FullFourDaysForecast.vue';

    import { onMounted, watch } from 'vue';
    import { storeToRefs } from 'pinia'

    import { getWeather } from "../../assets/js/weatherInfo.js";
    import { mainData } from '../../stores/mainData.js';

    const store = mainData();
    const { weatherData, isShowWeatherInfo, isShowLoader, isShowSearchErr, isGeolocationErr, cityName, cityNameShow, isUpdateForecast } = storeToRefs(store); 

    const token = 'pk.5458a1a49de64870a499080d6af514dc';

    function success(pos) {
        const crd = pos.coords;

        getCity(crd.latitude, crd.longitude);
    }

    function error() {
        isShowWeatherInfo.value = false;
        isGeolocationErr.value = true;
        isShowLoader.value = false;
    }

    function getUserLocation() {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    async function getCity(lat, lng) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', `https://us1.locationiq.com/v1/reverse.php?key=${token}&lat=${lat}&lon=${lng}&format=json`, true);
        xhr.send();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                let place = "";
        
                if (response.address.town) {
                    place = response.address.town;
                } else {
                    place = response.address.city;
                }

                cityName.value = place;
                isUpdateForecast.value = false;
            }
        }, false);
    }

    async function updateWeather() {
        isShowLoader.value = true;
        isShowWeatherInfo.value = false;
        isShowSearchErr.value = false;
        isGeolocationErr.value = false;

        if (cityName.value == "") {
            getUserLocation();
            return;
        }

        getWeather(cityName.value)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.cod != "200") {
                isShowSearchErr.value = true;
                isShowLoader.value = false;
                return;
            }

            cityNameShow.value = data.city.name;
            weatherData.value = data;

            isShowWeatherInfo.value = true;
            isShowLoader.value = false;

            setTempAtr();
            setSpeedAtr();
            setPressureAtr();
        });
    }

    function setTempAtr() {
        const elements = document.querySelectorAll(".weather-main__temp-block, .day-card__temp, .day-info-block-day-time__temp, .slider-block__temp, .weather-main__self-temp-block");
        const settings = JSON.parse(localStorage.getItem("settings"));

        elements.forEach(element => {
            element.classList.remove("c", "k", "f");
            element.classList.add(settings["units"]["temp"]);
        });
    }

    function setSpeedAtr() {
        const elements = document.querySelectorAll(".weather-main__wind-block, .day-card__wind-block, .day-info-block-day-time__wind");
        const settings = JSON.parse(localStorage.getItem("settings"));

        elements.forEach(element => {
            element.classList.remove("mps", "kmph", "milph");
            element.classList.add(settings["units"]["speed"]);
        });
    }

    function setPressureAtr() {
        const elements = document.querySelectorAll(".weather-main__pressure-block, .day-info-block-day-time__pressure");
        const settings = JSON.parse(localStorage.getItem("settings"));

        elements.forEach(element => {
            element.classList.remove("mm-rt", "hpa");
            element.classList.add(settings["units"]["pressure"]);
        });
    }

    function scrollToAnchor() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(element) {
                element.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    watch(
        cityName,
        () => {
            updateWeather();
        }
    );

    watch(
        isUpdateForecast,
        () => {
            updateWeather();
            isUpdateForecast.value = false;
        }
    );

    onMounted(() => {
        getUserLocation();
        scrollToAnchor();
    });

</script>

<template>
    <main class="main" :class="{ disactive: !isShowWeatherInfo }">
        <div class="first-content weather-content">
            <div class="main-content-block">
                <MainWeather />
                <HourlyForecast class="hourly-forecast"/>
            </div>
            <div class="second-main-info-block">
                <SunriseSunset />
                <WeatherDetails />
                <ShortFourDaysForecast />
            </div>
        </div>
        <div class="full-four-days-foracast">
            <FullFourDaysForecast />
        </div>
    </main>
    <Loading />
    <GeolocationErr />
    <SearchErr />
</template>
<style scoped>
    .main {
        position: relative;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        row-gap: 25px;
        max-width: 1440px;
        width: 100%;
        margin: 70px 0 0 0;
        padding: 30px 20px;
        box-sizing: border-box;
        animation: info-block-add .2s ease;
        transition: .3s ease;
    }
    .first-content {
        display: grid;
        grid-template-columns: 520px 1fr;
        grid-gap: 25px;
        @media (max-width: 1175px) {
            grid-template-columns: 1fr;
        }
    }
    .main-content-block {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 25px;
        @media (max-width: 1175px) {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: 1fr;
        }
        @media (max-width: 955px) {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
        }
    }
    .second-main-info-block {
        display: grid;
        grid-template-columns: 1fr 155px;
        grid-template-rows: min-content auto;
        gap: 25px;
        height: 100%;
        @media (max-width: 640px) {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(3 auto);
            gap: 0;
            row-gap: 20px;
        }
    }
    .full-four-days-foracast {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 25px;
        width: 100%;
        @media (max-width: 970px) {
            grid-template-columns: 1fr;
        }
    }
</style>