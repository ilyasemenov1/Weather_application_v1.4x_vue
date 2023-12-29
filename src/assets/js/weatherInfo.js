const key = '5ba78f463e9dddeead6f1f0cf154d3ca'
const token = 'pk.5458a1a49de64870a499080d6af514dc'

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

function success(pos) {
  const crd = pos.coords

  getCity(crd.latitude, crd.longitude)
}

function error() {
  // generate_err_notification("geolocation");
  console.log('error')
}

function getUserLocation() {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }

  navigator.geolocation.getCurrentPosition(success, error, options)
}

function getCity(lat, lng) {
  var xhr = new XMLHttpRequest()

  xhr.open(
    'GET',
    `https://us1.locationiq.com/v1/reverse.php?key=${token}&lat=${lat}&lon=${lng}&format=json`,
    true
  )
  xhr.send()
  xhr.addEventListener(
    'readystatechange',
    () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText)
        let place = ''

        if (response.address.town) {
          place = response.address.town
        } else {
          place = response.address.city
        }

        return place

        // const settings = JSON.parse(localStorage.getItem("document-settings"));

        // if (settings["data-update"] != "disable") {
        //     const weather_interval = setInterval(() => {
        //     }, transferTimeFromSettingsToMs());

        //     sessionStorage.setItem("weather-interval", JSON.stringify(weather_interval));
        // }
      }
    },
    false
  )
}

function transferTimeFromSettingsToMs() {
  const settings = JSON.parse(localStorage.getItem('settings'))

  if (!isNaN(settings)) {
    throw new Error('Settings not found')
  }

  let settings_data = settings['data-update']
  let time_type = settings_data.match(/s|min|h/)[0]
  if (time_type) {
    let time_count = settings_data.split(time_type)[0]

    switch (time_type) {
      case 's':
        return +time_count * 1000
      case 'min':
        return +time_count * 1000 * 60
      case 'h':
        return +time_count * 1000 * 3600
      default:
        throw new Error('Another time type or no time type')
    }
  } else {
    throw new Error('Another time type or no time type')
  }
}
