<script setup>
import MainWeatherContentRoot from './MainWeatherContentRoot.vue'
import RightArrowIcon from '../../icons/RightArrowIcon.vue'
import LeftArrowIcon from '../../icons/LeftArrowIcon.vue'
import SettingsIcon from '../../icons/SettingsIcon.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules'

import { ref, watch } from 'vue'

import 'swiper/css'

import { mainData } from '@/stores/mainData.js'
import { settingsStore } from '@/stores/settings.js'
import { storeToRefs } from 'pinia'

import {
	transformTempToSettingUnit,
	constructDate,
	conventDtTxt,
	dtConventer,
	arrayMin,
	arrayMax
} from '@/assets/js/appFunctions.js'

const store = mainData()
const { weatherData } = storeToRefs(store)

const settingsSt = settingsStore()
const { settings } = storeToRefs(settingsSt)

let hourlyForecastMode = ref('default')

let localStorageMode = localStorage.getItem('hourly-forecast-option');

if (localStorageMode) {
	hourlyForecastMode.value = localStorageMode
} else {
	localStorage.setItem('hourly-forecast-option', hourlyForecastMode.value)
}

let selectOptions = ref([
	{ index: "defaultD", text: "Сводка" },
	{ index: "tempD", text: "Температура" },
	{ index: "humidityD", text: "Влажность" },
])
let timeFormat = ref(settings.value.timeFormat)

const blockHeight = 56

watch(settings.value, () => {
	timeFormat.value = settings.value.timeFormat
})

let weatherDataArr = ref([])
let iconsArr = ref([])
let gapToNewDate = ref(0)
let isGapedDate = false

function newDayDate(index) {
	let date = new Date()
	date.setDate(date.getDate() + index)

	let options = {
		month: 'numeric',
		day: 'numeric'
	}

	return date.toLocaleDateString('ru-RU', options)
}

watch(weatherData, () => {
	iconsArr.value = []
	weatherDataArr.value = weatherData.value.list
	let tempArr = []
	let tempMin = 0
	let tempMax = 0
	let tempDelta = 0

	let humidityArr = []
	let humidityMin = 0
	let humidityMax = 0
	let humidityDelta = 0

	let windArr = []
	for (let i = 0; i < [...weatherDataArr.value].length; i++) {
		weatherDataArr.value[i].index = i
		iconsArr.value.push(
			new URL(
				`/src/assets/icons/weatherIcons/${weatherDataArr.value[i].weather[0].icon}.svg`,
				import.meta.url
			)
		)
		if (conventDtTxt(weatherDataArr.value[i].dt_txt) == '00:00' && !isGapedDate && i != 0) {
			gapToNewDate.value = i
			isGapedDate = true
		}
		tempArr.push(transformTempToSettingUnit(weatherDataArr.value[i].main.temp, settings.value))
		humidityArr.push(weatherDataArr.value[i].main.humidity)
	}

	tempMin = arrayMin(tempArr)
	tempMax = arrayMax(tempArr)
	tempDelta = tempMax - tempMin

	humidityMin = arrayMin(humidityArr)
	humidityMax = arrayMax(humidityArr)
	humidityDelta = humidityMax - humidityMin


	for (let i = 0; i < tempArr.length; i++) {
		weatherDataArr.value[i].tempMapped = blockHeight * (Math.abs(tempArr[i] - tempMin)) / tempDelta
		weatherDataArr.value[i].humidityMapped = blockHeight * (Math.abs(humidityArr[i] - humidityMin)) / humidityDelta
	}
})

watch(hourlyForecastMode, () => {
	console.log(hourlyForecastMode)
	localStorage.setItem('hourly-forecast-option', hourlyForecastMode.value)
})

let prev = ref(null)
let next = ref(null)

const modules = ref([Navigation, Keyboard, Mousewheel])
</script>

<template>
	<MainWeatherContentRoot>
		<template #firstTextContent>
			<div class="hourly-forecast__first-content">
				<h2 class="hourly-forecast__label">Почасовой прогноз</h2>
				<button class="hourly-forecast__settings-button">
					<SettingsIcon />
				</button>
				<div class="forecast-select">
					<label class="forecast-select-option" :class="{ active: option.index === hourlyForecastMode }" :for="option.index" v-for="option in selectOptions">
						<input type="radio" :id="option.index" :value="option.index" v-model="hourlyForecastMode" />
						<span>{{ option.text }}</span>
					</label>
				</div>
			</div>
		</template>
		<template #content>
			<div class="hourly-forecast__slider">
				<button
					class="hourly-forecast__left-button active-button main-focusable"
					aria-label="Left Button"
					tabindex="0"
					ref="prev"
				>
					<span class="hourly-forecast__left-button-view">
						<LeftArrowIcon />
					</span>
				</button>
				<div class="hourly-forecast__slider-block">
					<swiper
						class="hourly-forecast__slider-content swiper-wrapper"
						:modules="modules"
						slides-per-view="auto"
						:slides-per-group="3"
						:space-between="10"
						:keyboard="{
							enabled: true
						}"
						:navigation="{
							enabled: true,
							prevEl: prev,
							nextEl: next
						}"
						:mousewheel="true"
					>
						<swiper-slide v-if="hourlyForecastMode === 'defaultD'"
							v-for="forecastElement in weatherDataArr"
							class="slider-block"
							:class="{
								'new-day':
									conventDtTxt(forecastElement.dt_txt) == '00:00' && forecastElement.index != 0
							}"
						>
							<span class="slider-block__time" :class="{ h12: timeFormat === '12h' }"
								>{{
									forecastElement.index == 0
										? constructDate()
										: dtConventer(forecastElement.dt, true, settings)
								}}
							</span>
							<img
								class="slider-block__status-icon"
								:src="iconsArr[forecastElement.index]"
								alt="Иконка статуса погоды"
							/>
							<div class="slider-block__temp-block">
								<div class="slider-block__temp">{{
									transformTempToSettingUnit(forecastElement.main.temp, settings)
								}}</div>
							</div>
							<span
								class="slider-date"
								v-show="
									conventDtTxt(forecastElement.dt_txt) == '00:00' && forecastElement.index != 0
								"
								>{{ newDayDate((forecastElement.index - gapToNewDate) / 8 + 1) }}</span
							>
						</swiper-slide>
						<swiper-slide v-else-if="hourlyForecastMode === 'tempD' || hourlyForecastMode === 'humidityD'"
							v-for="forecastElement in weatherDataArr"
							
							class="slider-block"
							:class="{
								'new-day':
									conventDtTxt(forecastElement.dt_txt) == '00:00' && forecastElement.index != 0
							}"
						>
							<span class="slider-block__time graph" :class="{ h12: timeFormat === '12h' }"
								>{{
									forecastElement.index == 0
										? constructDate()
										: dtConventer(forecastElement.dt, true, settings)
								}}
							</span>
							<span class="indicator" 
							:class="{
								'not-filled': hourlyForecastMode === 'tempD' ? forecastElement.tempMapped < 5 : forecastElement.humidityMapped < 5,
								'temp': hourlyForecastMode === 'tempD',
								'humidity': hourlyForecastMode === 'humidityD'
							}"
							:style="{ 
								height: `${hourlyForecastMode === 'tempD' ? forecastElement.tempMapped : forecastElement.humidityMapped}px`
							}"
							>

							</span>
							<span class="slider-block__value-block">
								<span class="slider-block__value-indicator"
								:style="{
									bottom: hourlyForecastMode === 'tempD' ? forecastElement.tempMapped > 5 ? `${forecastElement.tempMapped}px` : '5px' : forecastElement.humidityMapped > 5 ? `${forecastElement.humidityMapped}px` : '5px'
								}"
								:class="{
									'temp': hourlyForecastMode === 'tempD',
									'humidity': hourlyForecastMode === 'humidity'
								}"
								>{{
									hourlyForecastMode === 'tempD' ? transformTempToSettingUnit(forecastElement.main.temp, settings) : `${forecastElement.main.humidity}%`
								}}</span>
							</span>
							<span
								class="slider-date"
								v-show="
									conventDtTxt(forecastElement.dt_txt) == '00:00' && forecastElement.index != 0
								"
								>{{ newDayDate((forecastElement.index - gapToNewDate) / 8 + 1) }}</span
							>
						</swiper-slide>
					</swiper>
				</div>
				<button
					class="hourly-forecast__right-button active-button main-focusable"
					aria-label="Right Button"
					tabindex="0"
					ref="next"
				>
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
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 22px;
	color: var(--text-color-2);
}
.hourly-forecast__slider {
	display: grid;
	grid-template-columns: 30px 1fr 30px;
	grid-column-gap: 10px;
	height: 100px;
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
	}
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
	@media (max-width: 768px) {
		display: none;
	}
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
	transition: 0.3s ease;
}
.hourly-forecast__right-button-view svg,
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
	opacity: 0.6;
}
.hourly-forecast__right-button:hover .hourly-forecast__right-button-view,
.hourly-forecast__right-button:focus-visible .hourly-forecast__right-button-view {
	transform: translateX(2px);
	background-color: var(--bg-color-7);
}
.hourly-forecast__right-button:hover.swiper-button-disabled .hourly-forecast__right-button-view,
.hourly-forecast__right-button:focus-visible.swiper-button-disabled
	.hourly-forecast__right-button-view {
	transform: translateX(0px);
	background-color: var(--bg-color-6);
}
.hourly-forecast__left-button:hover .hourly-forecast__left-button-view,
.hourly-forecast__left-button:focus-visible .hourly-forecast__left-button-view {
	transform: translateX(-2px);
	background-color: var(--bg-color-7);
}
.hourly-forecast__left-button:hover.swiper-button-disabled .hourly-forecast__left-button-view,
.hourly-forecast__left-button:focus-visible.swiper-button-disabled
	.hourly-forecast__left-button-view {
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
	font-family: 'Sourse Sans Pro', sans-serif;
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
	content: '';
	width: 1px;
	height: calc(100% - 30px);
	background: var(--bg-color-8);
}
.slider-block__time {
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 16px;
	font-weight: 600;
	text-align: center;
	text-wrap: nowrap;
	color: var(--text-color-3);
}
.slider-block__time.h12 {
	position: relative;
	top: 5px;
	font-size: 12px;
}
.slider-block__time.graph {
	position: absolute ;
	left: 9px;
	bottom: 0;
	font-size: 14px;
}
.slider-block__time.h12.graph {
	top: auto;
	left: 6px;
	bottom: 1px;
	font-size: 11px;
}
.slider-block__temp-block,
.slider-block__value-block {
	display: flex;
	justify-content: center;
}
.slider-block__temp {
	position: relative;
	left: -5px;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 16px;
	font-weight: 600;
	color: var(--text-color-2);
}
.slider-block__temp::after {
	position: absolute;
	content: '°C';
}
.slider-block__value-indicator {
	position: relative;
	left: 0;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 14px;
	font-weight: 600;
	color: var(--text-color-2);
	opacity: .9;
	transform: translateY(58px);
}
.slider-block__value-indicator.humidity {
	font-size: 13px;
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
.indicator.humidity {
	--indicator-fill: #55b0ccb9;
}
.indicator.temp {
	--indicator-fill: #db9003d2;
}
.indicator {
	position: absolute;
	left: 7px;
	bottom: 0;
	width: 36px;
	min-height: 5px;
	border-radius: 12px;
	background: var(--indicator-fill);
	box-shadow: 0 1px 4px #00000017;
	transform: translateY(-21px);
}
.indicator.not-filled {
	background: none;
	border: 2px solid var(--indicator-fill);
}
.hourly-forecast__first-content {
	position: relative;
}
.hourly-forecast__settings-button {
	position: absolute;
	right: 0;
	top: 0;
	width: 28px;
	height: 28px;
	border: none;
	border-radius: 50%;
	background: var(--bg-color-6);
	opacity: .8;
}
.hourly-forecast__settings-button>svg {
	position: absolute;
	left: 4px;
	top: 4px;
	width: calc(100% - 8px);
	height: calc(100% - 8px);
	fill: #ffffff;
	opacity: .8;
}
.hourly-forecast__settings-button:hover,
.hourly-forecast__settings-button:focus-visible {
	cursor: pointer;
	opacity: 1;
}
.forecast-select {
	position: absolute;
	right: 0;
	display: flex;
	flex-direction: column;
	padding: 10px 5px;
	border-radius: 15px;
	backdrop-filter: blur(10px);
	background: var(--bg-color-6);
	box-shadow: 0 2px 10px #0000001e;
	pointer-events: none;
	visibility: hidden;
	transform: translateY(-10px) scale(.8);
	opacity: 0;
	z-index: 2;
}
.hourly-forecast__settings-button:hover ~ .forecast-select,
.hourly-forecast__settings-button:focus ~ .forecast-select,
.forecast-select:hover,
.forecast-select:has(input:focus) {
	transform: translateY(0) scale(1);
	opacity: 1;
	pointer-events: all;
	visibility: visible;
}
.forecast-select-option {
	display: block;
	padding: 5px 10px;
	border-radius: 10px;
	font-size: 16px;
	transition: .2s ease;
}
.forecast-select-option:hover,
.forecast-select-option.active,
.forecast-select-option:has(input:focus) {
	cursor: pointer;
	background: var(--bg-color-6);
}
.forecast-select-option>input {
	position: absolute;
	pointer-events: none;
	opacity: 0;
}
</style>
