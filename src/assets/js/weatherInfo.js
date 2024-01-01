const key = '5ba78f463e9dddeead6f1f0cf154d3ca'

export async function getWeather(place) {
	return await fetch(
		`https://api.openweathermap.org/data/2.5/forecast/?q=${place}&appid=${key}&lang=ru&cnt=40`
	)
}

export async function getWeatherNow(place) {
	return await fetch(
		`https://api.openweathermap.org/data/2.5/forecast/?q=${place}&appid=${key}&lang=ru&cnt=1`
	)
}

export function transferTimeFromSettingsToMs(settingsData) {
	const timeType = settingsData.match(/s|min|h/)[0]
	if (timeType) {
		let timeCount = settingsData.split(timeType)[0]

		switch (timeType) {
			case 's':
				return +timeCount * 1000
			case 'min':
				return +timeCount * 1000 * 60
			case 'h':
				return +timeCount * 1000 * 3600
			default:
				throw new Error('Another time type or no time type')
		}
	} else {
		throw new Error('Another time type or no time type')
	}
}
