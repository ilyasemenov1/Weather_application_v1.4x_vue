<script setup>
    import MainWeather from './weatherSections/MainWeather.vue';
    import HourlyForecast from './weatherSections/HourlyForecast.vue';
    import Loading from "./Loading.vue";
    import GeolocationErr from './errorSections/GeolocationErr.vue';
    import SearchErr from './errorSections/SearchErr.vue';

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
            console.log(data);
            if (data.cod != "200") {
                isShowSearchErr.value = true;
                isShowLoader.value = false;
                return;
            }

            cityNameShow.value = data.city.name;
            weatherData.value = data;

            isShowWeatherInfo.value = true;
            isShowLoader.value = false;
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
    });

</script>

<template>
    <main class="main" :class="{ disactive: !isShowWeatherInfo }">
        <div class="first-content weather-content">
            <div class="main-content-block">
                <MainWeather />
                <HourlyForecast class="hourly-forecast"/>
            </div>
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
    }
    .main-content-block {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-gap: 25px
    }
    </style>