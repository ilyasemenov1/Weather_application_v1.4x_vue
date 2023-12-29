import { defineStore } from 'pinia'
import { ref } from 'vue'

export const mainData = defineStore('main-data', () => {
	let weatherData = ref({})
	let isShowWeatherInfo = ref(false)
	let isShowLoader = ref(true)
	let isShowSearchErr = ref(false)
	let isGeolocationErr = ref(false)
	let isNetworkErr = ref(false)
	let isOnline = ref(true)
	let isUpdateForecast = ref(true)
	let cityName = ref('')
	let cityNameShow = ref('')

	return {
		weatherData,
		isShowWeatherInfo,
		isShowLoader,
		isShowSearchErr,
		isGeolocationErr,
		cityName,
		cityNameShow,
		isUpdateForecast,
		isOnline,
		isNetworkErr
	}
})
