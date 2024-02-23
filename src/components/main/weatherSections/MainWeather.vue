<script setup>
import { cityIn } from 'lvovich'

import HeartIcon from '../../icons/HeartIcon.vue'
import RemoveIcon from '../../icons/RemoveIcon.vue'

import MainWeatherContentRoot from './MainWeatherContentRoot.vue'
import { ref, watch } from 'vue'

import { mainData } from '@/stores/mainData.js'
import { favouriteTownsStore } from '@/stores/favouriteTowns.js'
import { settingsStore } from '@/stores/settings.js'
import { storeToRefs } from 'pinia'

import {
	transformPressureToSettingUnit,
	transformSpeedToSettingUnit,
	transformTempToSettingUnit,
	constructDate
} from '@/assets/js/appFunctions.js'

const store = mainData()
const { weatherData, cityNameShow } = storeToRefs(store)

const favouriteTowns = favouriteTownsStore()
const { storagedTowns } = storeToRefs(favouriteTowns)

const settingsSt = settingsStore()
const { settings } = storeToRefs(settingsSt)

let time = ref(0)
let temp = ref(0)
let tempFeelsLike = ref(0)
let wind = ref(0)
let humidity = ref(0)
let pressure = ref(0)
let country = ref(0)
let location = ref({
	lat: "",
	lon: ""
})
let status = ref('')
let iconSrc = new URL('/src/assets/icons/weatherIcons/02d.svg', import.meta.url)

let isInFavouriteTowns = ref(false)
let isFetching = ref(false)

let predict = ref('')

function isUnicTown(townArg) {
	for (let town of storagedTowns.value) {
		if (townArg.toLowerCase() === town.name.toLowerCase()) {
			return false
		}
	}

	return true
}

function removeFafouriteTown() {
	for (let i = 0; i < storagedTowns.value.length; i++) {
		if (storagedTowns.value[i].name.toLowerCase() === cityNameShow.value.toLowerCase()) {
			storagedTowns.value.splice(i, 1)
		}
	}
}

async function addFavoutiteTown() {
	let data = weatherData.value
	let town = {
		name: data.city.name,
		lat: Math.round(data.city.coord.lat),
		lon: Math.round(data.city.coord.lon)
	}
	storagedTowns.value.push(town)
}

function favouriteTownButtonEvent() {
	isInFavouriteTowns.value ? removeFafouriteTown() : addFavoutiteTown()
}

function UpdateWaetherData() {
	let main = weatherData.value.list[0].main

	time.value = constructDate()
	temp.value = transformTempToSettingUnit(main.temp, settings.value)
	tempFeelsLike.value = transformTempToSettingUnit(main.feels_like, settings.value)
	status.value = weatherData.value.list[0].weather[0].description
	iconSrc = new URL(
		`/src/assets/icons/weatherIcons/${weatherData.value.list[0].weather[0].icon}.svg`,
		import.meta.url
	)

	wind.value = transformSpeedToSettingUnit(weatherData.value.list[0].wind.speed, settings.value)
	humidity.value = main.humidity
	pressure.value = transformPressureToSettingUnit(main.pressure, settings.value)

	cityNameShow.value.toLowerCase().match(/^в[с\з\ч\щ\к\м\л\ж\т\м\г\д\н\п\р\х]/)
		? (predict.value = 'во')
		: (predict.value = 'в')
	cityNameShow.value.toLowerCase().match(/[a-z]|^[0-9]/) ? (predict.value = 'в городе') : void 0

	country.value = iso2FlagEmoji(weatherData.value.city.country)
	location.value = {
		lat: Math.round(weatherData.value.city.coord.lat),
		lon: Math.round(weatherData.value.city.coord.lon)
	}

	isInFavouriteTowns.value = !isUnicTown(cityNameShow.value)
}

const iso2FlagEmoji = (iso) => String.fromCodePoint(...[...iso.toUpperCase()].map(char => char.charCodeAt(0) + 127397))

watch(weatherData, UpdateWaetherData)
watch(settings.value, UpdateWaetherData)

watch(storagedTowns.value, () => {
	isInFavouriteTowns.value = !isUnicTown(cityNameShow.value)
})
</script>
<template>
	<MainWeatherContentRoot>
		<template #firstTextContent>
			<div class="weather-main__label-content">
				<div class="weather-main__text">
					<h2 class="weather-main__label">
						Погода {{ predict }}
						<div class="city-description">
							{{ cityIn(cityNameShow) }}
							<div class="city-description__content">
								<div class="city-description__text-item">
									<div class="city-description__icon"></div>
									<div>{{ country }}</div>
								</div>
								<div class="city-description__text-item">
									<div class="city-description__icon"></div>
									<div>{{ `${location.lat} / ${location.lon}` }}</div>
								</div>
							</div>
						</div>
					</h2>
					<div class="weather-main__time">Данные на {{ time }}</div>
				</div>
				<button
					class="weather-main__favourite-town-button"
					:class="{ 'in-favourite-towns': !isInFavouriteTowns }"
					@click="favouriteTownButtonEvent()"
				>
					<span class="icon" v-if="!isInFavouriteTowns && !isFetching">
						<HeartIcon />
					</span>
					<span class="icon" v-else-if="isInFavouriteTowns && !isFetching">
						<RemoveIcon />
					</span>
					<span class="icon" v-else>
						<span class="animation">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</span>
					</span>
					<span class="text">
						{{ isInFavouriteTowns ? 'Удалить из избранных' : 'Добавить в избранные' }}
					</span>
				</button>
			</div>
		</template>
		<template #content>
			<div class="weather-main__content">
				<span class="weather-main__temp">
					<span class="weather-main__temp-block" id="temp">{{ temp }}</span>
				</span>
				<div class="weather-main__status">
					<img :src="iconSrc" class="weather-main__staus-icon" alt="Иконка стастуса погоды" />
					<span class="weather-main__status-block">{{ status }}</span>
					<div class="weather-main__self-temp">
						<span class="weather-main__self-temp--label">Ощущается как </span>
						<span class="weather-main__self-temp-block">{{ tempFeelsLike }}</span>
					</div>
				</div>
			</div>
			<div class="weather-main__second-block">
				<span class="weather-main__wind">
					<span class="weather-main__wind-block">{{ wind }}</span>
				</span>
				<span class="weather-main__humidity">
					<span class="weather-main__humidity-block">{{ humidity }}</span>
				</span>
				<span class="weather-main__pressure">
					<span class="weather-main__pressure-block">{{ pressure }}</span>
				</span>
			</div>
		</template>
	</MainWeatherContentRoot>
</template>

<style scoped>
.weather-main__label {
	padding: 0;
	margin: 0;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 22px;
	color: var(--text-color-2);
	max-width: 280px;
}
.weather-main__temp {
	display: flex;
	align-items: flex-start;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 40px;
	font-weight: 800;
	line-height: 40px;
	color: var(--text-color-2);
}
.weather-main__temp-block {
	position: relative;
	margin: 0 40px 0 0;
}
.weather-main__temp-block::after {
	position: absolute;
	content: '°C';
}
.weather-main__status {
	position: relative;
	display: flex;
	flex-direction: column;
	margin: 0 0 0 65px;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 22px;
	font-weight: 700;
	line-height: 20px;
	color: var(--text-color-2);
}
.weather-main__status-block {
	display: block;
}
.weather-main__status-block::first-letter {
	text-transform: uppercase;
}
.weather-main__self-temp {
	font-size: 16px;
	font-weight: 600;
	color: var(--text-color-3);
}
.weather-main__self-temp-block {
	position: relative;
	margin: 0 20px 0 0;
}
.weather-main__self-temp-block::after {
	position: absolute;
	content: '°C';
}
.weather-main__second-block {
	display: flex;
	flex-wrap: wrap;
	column-gap: 35px;
	row-gap: 10px;
	width: 100%;
}
.weather-main__wind,
.weather-main__humidity,
.weather-main__pressure,
.day-card__wind,
.day-card__humidity {
	display: flex;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 18px;
	font-weight: 600;
	color: var(--text-color-2);
}
.weather-main__wind-block,
.weather-main__humidity-block,
.weather-main__pressure-block,
.day-card__wind-block,
.day-card__humidity-block {
	position: relative;
	margin: 0 0 0 23px;
}
.weather-main__wind-block::before,
.weather-main__humidity-block::before,
.weather-main__pressure-block::before,
.day-card__wind-block::before,
.day-card__humidity-block::before {
	position: absolute;
	content: '';
	width: 20px;
	height: 20px;
	left: -23px;
	top: 2px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
}
.weather-main__wind-block::before,
.day-card__wind-block::before {
	background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22%3E %3Cg fill=%22%23FFF%22 fill-rule=%22nonzero%22%3E %3Cpath d=%22M6 11.5h5.688a3.75 3.75 0 1 0-1.95-6.954.75.75 0 0 0 .781 1.28A2.25 2.25 0 1 1 11.688 10L6 10.001a.75.75 0 1 0 0 1.5zM2 15h9.966a1.5 1.5 0 1 1-.779 2.782.75.75 0 0 0-.78 1.281 3 3 0 1 0 1.56-5.563H1.999A.75.75 0 1 0 2 15zM16.667 13h2.251a3 3 0 1 0-1.56-5.563.75.75 0 0 0 .781 1.28 1.5 1.5 0 1 1 .779 2.782l-2.251.001a.75.75 0 1 0 0 1.5z%22/%3E %3C/g%3E %3C/svg%3E');
}
.weather-main__humidity-block::before,
.day-card__humidity-block::before {
	background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E %3Cg%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M17.5487 8.0001C16.7829 6.74175 15.1271 4.67011 12.5637 1.75476C12.2645 1.41448 11.7342 1.41518 11.4359 1.75625C8.88065 4.67783 7.22597 6.74805 6.45489 7.99571C3.91532 12.1049 3.72409 15.9389 6.56528 18.751C9.63862 21.793 14.3621 21.792 17.4355 18.7512C20.2743 15.9425 20.0858 12.169 17.5487 8.0001ZM7.73087 8.78429C8.39019 7.71747 9.8183 5.91206 12.0019 3.39071C14.1889 5.90415 15.6153 7.70851 16.2673 8.77991C18.4829 12.4205 18.6344 15.4548 16.3805 17.6849C13.8915 20.1475 10.1092 20.1483 7.62047 17.685C5.36463 15.4522 5.51867 12.3638 7.73087 8.78429Z%22 fill=%22white%22/%3E %3Cpath d=%22M12.7366 17.2967C14.3588 16.7579 15.4749 15.2362 15.4749 13.5C15.4749 13.0858 15.1391 12.75 14.7249 12.75C14.3107 12.75 13.9749 13.0858 13.9749 13.5C13.9749 14.5852 13.277 15.5366 12.2638 15.8732C11.8707 16.0038 11.6579 16.4283 11.7884 16.8214C11.919 17.2145 12.3436 17.4273 12.7366 17.2967Z%22 fill=%22white%22/%3E %3C/g%3E %3C/svg%3E');
}
.weather-main__pressure-block::before {
	background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E %3Cg%3E %3Cpath d=%22M14.1314 2.22778C14.5361 2.31569 14.793 2.71509 14.7051 3.11986C14.6172 3.52464 14.2178 3.78152 13.813 3.69362C13.2222 3.56532 12.6156 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 11.4103 20.4401 10.8289 20.3222 10.2616C20.238 9.85608 20.4985 9.45902 20.904 9.37478C21.3096 9.29054 21.7067 9.55101 21.7909 9.95657C21.9295 10.624 22 11.3077 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.7228 2 13.4361 2.07681 14.1314 2.22778Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M13.348 10.6533C13.6409 10.9461 14.1158 10.946 14.4086 10.6531L18.0304 7.03025C18.3233 6.73732 18.3232 6.26244 18.0303 5.96959C17.7373 5.67674 17.2624 5.67681 16.9696 5.96975L13.3478 9.59259C13.055 9.88553 13.055 10.3604 13.348 10.6533ZM8.21961 15.7803C8.51248 16.0732 8.98735 16.0732 9.28028 15.7804L10.5308 14.5301C10.8237 14.2373 10.8238 13.7624 10.5309 13.4695C10.238 13.1766 9.76315 13.1765 9.47023 13.4694L8.21972 14.7196C7.9268 15.0125 7.92675 15.4874 8.21961 15.7803Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M14.75 5.75C14.75 5.33579 15.0858 5 15.5 5H18.25C18.6642 5 19 5.33579 19 5.75C19 6.16421 18.6642 6.5 18.25 6.5H15.5C15.0858 6.5 14.75 6.16421 14.75 5.75Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M17.5 5.75C17.5 5.33579 17.8358 5 18.25 5C18.6642 5 19 5.33579 19 5.75V8.5C19 8.91421 18.6642 9.25 18.25 9.25C17.8358 9.25 17.5 8.91421 17.5 8.5V5.75Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z%22 fill=%22white%22/%3E %3C/g%3E %3C/svg%3E');
}
.weather-main__wind-block::after,
.weather-main__humidity-block::after,
.weather-main__pressure-block::after,
.day-card__wind-block::after,
.day-card__humidity-block::after {
	position: absolute;
	content: '';
	top: 2px;
	font-size: 16px;
	color: var(--text-color-3);
}
.weather-main__wind-block::after,
.day-card__wind-block::after {
	width: 30px;
	content: 'м/с';
}
.weather-main__humidity-block::after,
.day-card__humidity-block::after {
	width: 20px;
	content: '%';
}
.weather-main__pressure-block::after {
	width: 100px;
	content: 'мм. рс. ст.';
}
.weather-main__wind-block {
	margin-right: 28px;
}
.weather-main__humidity-block {
	margin-right: 15px;
}
.weather-main__pressure-block {
	margin-right: 73px;
}
.weather-main__content {
	display: flex;
	flex-wrap: wrap;
	row-gap: 10px;
	column-gap: 15px;
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
.weather-main__label-content {
	display: flex;
	justify-content: space-between;
	gap: 20px;
}
.weather-main__favourite-town-button {
	display: flex;
	align-items: center;
	gap: 5px;
	height: fit-content;
	padding: 5px 10px;
	border: none;
	border-radius: 12px;
	background: rgb(255 255 255 / 12%);
	font-size: 14px;
	font-weight: 600;
	color: #ffffffce;
	opacity: 0.8;
}
body:not(.night-mode) .weather-main__favourite-town-button {
	color: #ffffff;
	background: rgb(255 255 255 / 16%);
}
.weather-main__favourite-town-button .icon {
	width: 16px;
	height: 16px;
}
.weather-main__favourite-town-button .icon svg {
	fill: #ffffffce;
}
.weather-main__favourite-town-button:hover,
.weather-main__favourite-town-button:focus {
	cursor: pointer;
	opacity: 1;
	background: rgb(255 255 255 / 15%);
	box-shadow: 0 1px 6px #00000013;
}
.animation {
	top: -3px;
	left: -4px;
	width: 100%;
	height: 100%;
}
.animation span {
	width: 100%;
	height: 100%;
	margin: 3px;
	border: 3px solid #fff;
}
body.night-mode .animation span {
	border-color: #c9c9c9 transparent transparent transparent;
}
@media (max-width: 565px) or ((max-width: 1070px) and (min-width: 956px)) {
	.weather-main__favourite-town-button {
		border-radius: 50%;
		padding: 10px;
	}
	.weather-main__favourite-town-button .text {
		display: none;
	}
	.weather-main__favourite-town-button .icon {
		width: 18px;
		height: 18px;
	}
}
.city-description {
	display: inline;
	position: relative;
}
.city-description__content {
	position: absolute;
	display: flex;
	gap: 10px;
	background: var(--bg-color-1);
	padding: 10px 15px;
	border-radius: 12px;
	z-index: 2;
}
.city-description__text-item {
	color: var(--text-color-1);
	font-weight: 600;
	font-size: 16px;
}
</style>
