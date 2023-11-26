<script setup>
    import MainWeather from './weatherSections/MainWeather.vue';
    import HourlyForecast from './weatherSections/HourlyForecast.vue';
</script>

<template>
    <main class="main">
        <div class="first-content weather-content">
            <div class="main-content-block">
                <MainWeather />
                <HourlyForecast class="hourly-forecast"/>
            </div>
        </div>
    </main>
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
        transition: .3s;
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