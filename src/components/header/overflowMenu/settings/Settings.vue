<script setup>
import rootLevel2MenuComponent from '../rootLevel2MenuComponent.vue'
import ThemeMenuSelect from './ThemeMenuSelect.vue'
import SettingsSwitch from './SettingsSwitch.vue'
import SettingsSelect from './SettingsSelect.vue'

import { watch } from 'vue'

import { settingsStore } from '@/stores/settings.js'
import { storeToRefs } from 'pinia'

const store = settingsStore()
const { settings } = storeToRefs(store)

watch(settings.value, () => {
	localStorage.setItem('settings', JSON.stringify(settings.value))
})
</script>

<template>
	<rootLevel2MenuComponent id="settings">
		<template #labelText>Настройки</template>
		<template #content>
			<h2>Интерфейс:</h2>
			<ThemeMenuSelect />
			<SettingsSwitch :path="'fixHeader'">
				Фиксировать шапку сайта при прокручивании
			</SettingsSwitch>
			<SettingsSwitch :path="'menuAnimation'"> Упростить анимацию открытия меню </SettingsSwitch>
			<SettingsSwitch :path="'showFavouriteTowns'">
				Показывать избранные города при поиске
			</SettingsSwitch>
			<SettingsSelect
				:options="{
					'12h': '12-часовой',
					'24h': '24-часовой'
				}"
				:path="'timeFormat'"
			>
				Временной формат:
			</SettingsSelect>
			<h2>Автообновление данных:</h2>
			<SettingsSelect
				:options="{
					'5min': 'Раз в 5 минут',
					'10min': 'Раз в 10 минут',
					'15min': 'Раз в 15 минут',
					'30min': 'Раз в 30 минут',
					'1h': 'Раз в 1 час',
					'2h': 'Раз в 2 часа',
					'5h': 'Раз в 5 часов',
					disable: 'Не обновнять данные'
				}"
				:path="'dataUpdate'"
			>
				Автообновление данных:
			</SettingsSelect>
			<h2>Единицы измерения:</h2>
			<SettingsSelect
				:options="{
					c: 'В градусах Цельсия',
					f: 'В градусах Фаренгейта',
					k: 'В кельвинах'
				}"
				:path="'units.temp'"
			>
				Температура:
			</SettingsSelect>
			<SettingsSelect
				:options="{
					mps: 'В метрах в секунду',
					kmph: 'В километрах в час',
					milph: 'В милях в час'
				}"
				:path="'units.speed'"
			>
				Скорость:
			</SettingsSelect>
			<SettingsSelect
				:options="{
					'mm-rt': 'В миллиметрах ртутного столба',
					hpa: 'В гектопаскалях'
				}"
				:path="'units.pressure'"
			>
				Давление:
			</SettingsSelect>
		</template>
	</rootLevel2MenuComponent>
</template>
