<script setup>
import { ref } from 'vue'

import { mainData } from '@/stores/mainData.js'
import { settingsStore } from '@/stores/settings.js'
import { storeToRefs } from 'pinia'

import {
	transformTempToSettingUnit,
	transformPressureToSettingUnit,
	transformSpeedToSettingUnit,
	getDate,
	average,
	mode
} from '@/assets/js/appFunctions.js'

const store = mainData()
const { weatherData } = storeToRefs(store)

const settingsSt = settingsStore()
const { settings } = storeToRefs(settingsSt)

function getDataByIndex(indexLevel1, indexLevel2) {
	try {
		return weatherData.value.list
			.slice((indexLevel1 - 1) * 8, indexLevel1 * 8)
			.slice((indexLevel2 - 1) * 2, indexLevel2 * 2)
	} catch {
		return null
	}
}

function setTemp(indexLevel1, indexLevel2) {
	const data = getDataByIndex(indexLevel1, indexLevel2)
	if (!data) return 0
	const resultData = data.map((e) => e.main.temp)
	return transformTempToSettingUnit(average(resultData), settings.value)
}

function setWind(indexLevel1, indexLevel2) {
	const data = getDataByIndex(indexLevel1, indexLevel2)
	if (!data) return 0
	const resultData = data.map((e) => e.wind.speed)
	return transformSpeedToSettingUnit(average(resultData), settings.value)
}

function setHumidity(indexLevel1, indexLevel2) {
	const data = getDataByIndex(indexLevel1, indexLevel2)
	if (!data) return 0
	const resultData = data.map((e) => e.main.humidity)
	return Math.round(average(resultData))
}

function setPressure(indexLevel1, indexLevel2) {
	const data = getDataByIndex(indexLevel1, indexLevel2)
	if (!data) return 0
	const resultData = data.map((e) => e.main.pressure)
	return transformPressureToSettingUnit(average(resultData), settings.value)
}

function setStatus(indexLevel1, indexLevel2) {
	const data = getDataByIndex(indexLevel1, indexLevel2)
	if (!data) return 0
	const resultData = data.map((e) => e.weather[0].description)
	return mode(resultData)
}

function setIcon(indexLevel1, indexLevel2) {
	const data = getDataByIndex(indexLevel1, indexLevel2)
	if (!data) return 0
	const resultData = data.map((e) => e.weather[0].icon)
	return new URL(`/src/assets/icons/weatherIcons/${mode(resultData)}.svg`, import.meta.url)
}

const dayTimes = ref(['Ночью', 'Утром', 'Днём', 'Вечером'])
</script>
<template>
	<section class="day-info-block" v-for="i in 4">
		<div class="day-info-block__scroll-anchor" :id="`day-info-block-${i}`"></div>
		<h2 class="info-name-block">
			<div class="info-name-block__day-info">
				<span class="info-name-block__week-day">{{ getDate(i) }}</span>
			</div>
		</h2>
		<div class="day-info-block-content">
			<div class="day-info-block-content__block">
				<div class="day-info-block-day-time" v-for="j in 4">
					<span class="day-info-block-day-time__label">{{ dayTimes[j - 1] }}</span>
					<div class="day-info-block-day-time__content">
						<div class="day-info-block-day-time__info-block-1">
							<span class="day-info-block-day-time__temp">{{ setTemp(i, j) }}</span>
							<span class="day-info-block-day-time__status">
								<img
									class="day-info-block-day-time__icon"
									:src="setIcon(i, j)"
									alt="Иконка статуса погоды"
								/>
								{{ setStatus(i, j) }}
							</span>
						</div>
						<div class="day-info-block-day-time__info-block-2">
							<span class="day-info-block-day-time__wind">{{ setWind(i, j) }}</span>
							<span class="day-info-block-day-time__humidity">{{ setHumidity(i, j) }}</span>
							<span class="day-info-block-day-time__pressure">{{ setPressure(i, j) }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.day-info-block {
	position: relative;
	display: flex;
	flex-direction: column;
	row-gap: 20px;
	padding: 12px;
	border-radius: 15px;
	box-shadow: 0px 5px 10px #00000018;
	background: var(--bg-color-1);
}
.day-info-block__scroll-anchor {
	position: absolute;
	top: -20px;
}
.js-scroll.not-scrolled {
	visibility: hidden;
}
.js-scroll.scrolled {
	animation: info-block-add 0.3s ease forwards;
	visibility: visible;
}
.info-name-block {
	margin: 0;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-weight: 700;
	font-size: 21px;
	color: var(--text-color-1);
}
.info-name-block__day-info {
	width: max-content;
	padding: 3px 10px;
	border-radius: 15px;
	background: var(--bg-color-4);
}
.info-name-block__week-day {
	display: block;
}
.weather-main__town {
	display: block;
}
.info-name-block__week-day::first-letter,
.day-card__status::first-letter,
.day-card__label::first-letter,
.weather-main__town::first-letter {
	text-transform: uppercase;
}
.day-info-block-content {
	display: grid;
	grid-template-columns: 1fr;
	grid-column-gap: 20px;
}
.day-info-block-content__block {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, auto);
	grid-gap: 20px;
}
.day-info-block-day-time {
	display: flex;
	flex-direction: column;
	row-gap: 5px;
}
.day-info-block-day-time {
	font-family: 'Sourse Sans Pro', sans-serif;
	font-weight: 600;
	color: var(--text-color-1);
}
.day-info-block-day-time__content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	row-gap: 3px;
}
.day-info-block-day-time__info-block-1 {
	display: flex;
	column-gap: 20px;
	font-size: 18px;
	font-weight: 700;
}
.day-info-block-day-time__info-block-2 {
	display: flex;
	flex-wrap: wrap;
	column-gap: 20px;
	row-gap: 5px;
	width: 100%;
	max-width: 450px;
	font-size: 18px;
	font-weight: 600;
}
.day-info-block-day-time__label {
	font-weight: 700;
	font-size: 20px;
}
.day-info-block-day-time__temp {
	position: relative;
	margin: 0 20px 0 0;
}
.day-info-block-day-time__temp::after {
	position: absolute;
	content: '°C';
}
.day-info-block-day-time__status {
	position: relative;
	margin: 0 0 0 30px;
}
.day-info-block-day-time__status::first-letter {
	text-transform: uppercase;
}
.day-info-block-day-time__icon {
	position: absolute;
	width: 45px;
	height: 45px;
	left: -49px;
	top: -11px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
}
.day-info-block-day-time__wind,
.day-info-block-day-time__humidity,
.day-info-block-day-time__pressure {
	position: relative;
	margin: 0 0 0 23px;
}
.day-info-block-day-time__wind::before,
.day-info-block-day-time__humidity::before,
.day-info-block-day-time__pressure::before {
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
.day-info-block-day-time__wind::before {
	opacity: 0.78;
	background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22%3E %3Cg fill=%22black%22 fill-rule=%22nonzero%22%3E %3Cpath d=%22M6 11.5h5.688a3.75 3.75 0 1 0-1.95-6.954.75.75 0 0 0 .781 1.28A2.25 2.25 0 1 1 11.688 10L6 10.001a.75.75 0 1 0 0 1.5zM2 15h9.966a1.5 1.5 0 1 1-.779 2.782.75.75 0 0 0-.78 1.281 3 3 0 1 0 1.56-5.563H1.999A.75.75 0 1 0 2 15zM16.667 13h2.251a3 3 0 1 0-1.56-5.563.75.75 0 0 0 .781 1.28 1.5 1.5 0 1 1 .779 2.782l-2.251.001a.75.75 0 1 0 0 1.5z%22/%3E %3C/g%3E %3C/svg%3E');
}
.day-info-block-day-time__humidity::before {
	opacity: 0.7;
	background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E %3Cg%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M17.5487 8.0001C16.7829 6.74175 15.1271 4.67011 12.5637 1.75476C12.2645 1.41448 11.7342 1.41518 11.4359 1.75625C8.88065 4.67783 7.22597 6.74805 6.45489 7.99571C3.91532 12.1049 3.72409 15.9389 6.56528 18.751C9.63862 21.793 14.3621 21.792 17.4355 18.7512C20.2743 15.9425 20.0858 12.169 17.5487 8.0001ZM7.73087 8.78429C8.39019 7.71747 9.8183 5.91206 12.0019 3.39071C14.1889 5.90415 15.6153 7.70851 16.2673 8.77991C18.4829 12.4205 18.6344 15.4548 16.3805 17.6849C13.8915 20.1475 10.1092 20.1483 7.62047 17.685C5.36463 15.4522 5.51867 12.3638 7.73087 8.78429Z%22 fill=%22black%22/%3E %3Cpath d=%22M12.7366 17.2967C14.3588 16.7579 15.4749 15.2362 15.4749 13.5C15.4749 13.0858 15.1391 12.75 14.7249 12.75C14.3107 12.75 13.9749 13.0858 13.9749 13.5C13.9749 14.5852 13.277 15.5366 12.2638 15.8732C11.8707 16.0038 11.6579 16.4283 11.7884 16.8214C11.919 17.2145 12.3436 17.4273 12.7366 17.2967Z%22 fill=%22black%22/%3E %3C/g%3E %3C/svg%3E');
}
.day-info-block-day-time__pressure::before {
	opacity: 0.7;
	background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E %3Cg%3E %3Cpath d=%22M14.1314 2.22778C14.5361 2.31569 14.793 2.71509 14.7051 3.11986C14.6172 3.52464 14.2178 3.78152 13.813 3.69362C13.2222 3.56532 12.6156 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 11.4103 20.4401 10.8289 20.3222 10.2616C20.238 9.85608 20.4985 9.45902 20.904 9.37478C21.3096 9.29054 21.7067 9.55101 21.7909 9.95657C21.9295 10.624 22 11.3077 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.7228 2 13.4361 2.07681 14.1314 2.22778Z%22 fill=%22black%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M13.348 10.6533C13.6409 10.9461 14.1158 10.946 14.4086 10.6531L18.0304 7.03025C18.3233 6.73732 18.3232 6.26244 18.0303 5.96959C17.7373 5.67674 17.2624 5.67681 16.9696 5.96975L13.3478 9.59259C13.055 9.88553 13.055 10.3604 13.348 10.6533ZM8.21961 15.7803C8.51248 16.0732 8.98735 16.0732 9.28028 15.7804L10.5308 14.5301C10.8237 14.2373 10.8238 13.7624 10.5309 13.4695C10.238 13.1766 9.76315 13.1765 9.47023 13.4694L8.21972 14.7196C7.9268 15.0125 7.92675 15.4874 8.21961 15.7803Z%22 fill=%22black%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M14.75 5.75C14.75 5.33579 15.0858 5 15.5 5H18.25C18.6642 5 19 5.33579 19 5.75C19 6.16421 18.6642 6.5 18.25 6.5H15.5C15.0858 6.5 14.75 6.16421 14.75 5.75Z%22 fill=%22black%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M17.5 5.75C17.5 5.33579 17.8358 5 18.25 5C18.6642 5 19 5.33579 19 5.75V8.5C19 8.91421 18.6642 9.25 18.25 9.25C17.8358 9.25 17.5 8.91421 17.5 8.5V5.75Z%22 fill=%22black%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z%22 fill=%22black%22/%3E %3C/g%3E %3C/svg%3E');
}
body.night-mode .day-info-block-day-time__wind::before {
	opacity: 0.78;
	background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22%3E %3Cg fill=%22white%22 fill-rule=%22nonzero%22%3E %3Cpath d=%22M6 11.5h5.688a3.75 3.75 0 1 0-1.95-6.954.75.75 0 0 0 .781 1.28A2.25 2.25 0 1 1 11.688 10L6 10.001a.75.75 0 1 0 0 1.5zM2 15h9.966a1.5 1.5 0 1 1-.779 2.782.75.75 0 0 0-.78 1.281 3 3 0 1 0 1.56-5.563H1.999A.75.75 0 1 0 2 15zM16.667 13h2.251a3 3 0 1 0-1.56-5.563.75.75 0 0 0 .781 1.28 1.5 1.5 0 1 1 .779 2.782l-2.251.001a.75.75 0 1 0 0 1.5z%22/%3E %3C/g%3E %3C/svg%3E');
}
body.night-mode .day-info-block-day-time__humidity::before {
	opacity: 0.7;
	background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E %3Cg%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M17.5487 8.0001C16.7829 6.74175 15.1271 4.67011 12.5637 1.75476C12.2645 1.41448 11.7342 1.41518 11.4359 1.75625C8.88065 4.67783 7.22597 6.74805 6.45489 7.99571C3.91532 12.1049 3.72409 15.9389 6.56528 18.751C9.63862 21.793 14.3621 21.792 17.4355 18.7512C20.2743 15.9425 20.0858 12.169 17.5487 8.0001ZM7.73087 8.78429C8.39019 7.71747 9.8183 5.91206 12.0019 3.39071C14.1889 5.90415 15.6153 7.70851 16.2673 8.77991C18.4829 12.4205 18.6344 15.4548 16.3805 17.6849C13.8915 20.1475 10.1092 20.1483 7.62047 17.685C5.36463 15.4522 5.51867 12.3638 7.73087 8.78429Z%22 fill=%22white%22/%3E %3Cpath d=%22M12.7366 17.2967C14.3588 16.7579 15.4749 15.2362 15.4749 13.5C15.4749 13.0858 15.1391 12.75 14.7249 12.75C14.3107 12.75 13.9749 13.0858 13.9749 13.5C13.9749 14.5852 13.277 15.5366 12.2638 15.8732C11.8707 16.0038 11.6579 16.4283 11.7884 16.8214C11.919 17.2145 12.3436 17.4273 12.7366 17.2967Z%22 fill=%22white%22/%3E %3C/g%3E %3C/svg%3E');
}
body.night-mode .day-info-block-day-time__pressure::before {
	opacity: 0.7;
	background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E %3Cg%3E %3Cpath d=%22M14.1314 2.22778C14.5361 2.31569 14.793 2.71509 14.7051 3.11986C14.6172 3.52464 14.2178 3.78152 13.813 3.69362C13.2222 3.56532 12.6156 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 11.4103 20.4401 10.8289 20.3222 10.2616C20.238 9.85608 20.4985 9.45902 20.904 9.37478C21.3096 9.29054 21.7067 9.55101 21.7909 9.95657C21.9295 10.624 22 11.3077 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.7228 2 13.4361 2.07681 14.1314 2.22778Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M13.348 10.6533C13.6409 10.9461 14.1158 10.946 14.4086 10.6531L18.0304 7.03025C18.3233 6.73732 18.3232 6.26244 18.0303 5.96959C17.7373 5.67674 17.2624 5.67681 16.9696 5.96975L13.3478 9.59259C13.055 9.88553 13.055 10.3604 13.348 10.6533ZM8.21961 15.7803C8.51248 16.0732 8.98735 16.0732 9.28028 15.7804L10.5308 14.5301C10.8237 14.2373 10.8238 13.7624 10.5309 13.4695C10.238 13.1766 9.76315 13.1765 9.47023 13.4694L8.21972 14.7196C7.9268 15.0125 7.92675 15.4874 8.21961 15.7803Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M14.75 5.75C14.75 5.33579 15.0858 5 15.5 5H18.25C18.6642 5 19 5.33579 19 5.75C19 6.16421 18.6642 6.5 18.25 6.5H15.5C15.0858 6.5 14.75 6.16421 14.75 5.75Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M17.5 5.75C17.5 5.33579 17.8358 5 18.25 5C18.6642 5 19 5.33579 19 5.75V8.5C19 8.91421 18.6642 9.25 18.25 9.25C17.8358 9.25 17.5 8.91421 17.5 8.5V5.75Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z%22 fill=%22white%22/%3E %3C/g%3E %3C/svg%3E');
}
.day-info-block-day-time__wind::after,
.day-info-block-day-time__humidity::after,
.day-info-block-day-time__pressure::after {
	position: absolute;
	content: '';
	top: 2px;
	font-size: 16px;
	color: var(--text-color-6);
}
.day-info-block-day-time__humidity::after {
	content: '%';
	width: 15px;
}
.day-info-block-day-time__humidity {
	margin-right: 15px;
}
@media (max-width: 550px) {
	.day-info-block-content__block {
		grid-template-columns: 1fr;
	}
	.select__menu {
		width: 100%;
	}
}
</style>
