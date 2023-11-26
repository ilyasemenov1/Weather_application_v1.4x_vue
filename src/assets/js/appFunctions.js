export const constructDate = () => {

    const settings = JSON.parse(localStorage.getItem("settings"));

    let options = {
        hour12: false,
        hour: '2-digit',
        minute:'2-digit'
    }

    if (!isNaN(settings)) {
        return;
    }

    if (settings["time-format"] == "12h") {
        options.hour12 = true;
    }

    const date = new Date();
    return date.toLocaleDateString('ru-RU', options).split(", ")[1];
}

export const conventDtTxt = (dt) => {
    let hours = dt.split(" ")[1];
    let time = hours.split(":");
    return `${time[0]}:${time[1]}`;
}

export const setIcon = (index) => {
    return `./icons/weather_icons/${index}.svg`;
}

export const transformPressureToSettingUnit = (pressure) => {
    const settings = JSON.parse(localStorage.getItem("settings"));
    const unit = settings["units"]["pressure"];

    switch (unit) {
        case "mm-rt":
            return Math.round(pressure * 0.75);
        case "hpa":
            return pressure;
        case "atm":
            return Math.round(pressure * 0.75 / 760.002 * 10**5) / 10**5;
    }
}

export const transformSpeedToSettingUnit = (speed) => {
    const settings = JSON.parse(localStorage.getItem("settings"));
    const unit = settings["units"]["speed"];

    switch (unit) {
        case "mps":
            return Math.round(speed);
        case "kmph":
            return Math.round(speed * 3.6);
        case "milph":
            return Math.round(speed * 2.23694);
    }
}

export const transformTempToSettingUnit = (temp_k) => {
    let temp = 0;
    const settings = JSON.parse(localStorage.getItem("settings"));
    const unit = settings["units"]["temp"];

    const delta = 273.15;

    switch (unit) {
        case "c":
            temp = Math.round(temp_k - delta);
            break;
        case "f":
            temp = Math.round((temp_k - delta) * 9/5 + 32);
            break;
        case "k":
            temp = Math.round(temp_k);
            break;
        default:
            temp = Math.round(temp_k - delta);
    }

    if (unit == "k") return temp;

    let tempRet = 0;

    if (temp > 0) {
        tempRet = `+${temp}`;
    } else {
        tempRet = temp;
    }

    return tempRet;
}

export const arrayMin = (arr) => {
    return arr.reduce((p, v) => {
        return ( p < v ? p : v );
    });
}

export const arrayMax = (arr) => {
    return arr.reduce((p, v) => {
        return ( p > v ? p : v );
    });
}

export const dtConventer = (dt, isUtc) => {

    const settings = JSON.parse(localStorage.getItem("settings"));

    let options = {
        hour12: false,
        hour: '2-digit',
        minute:'2-digit'
    }

    if (!isNaN(settings)) {
        return;
    }

    if (settings["time-format"] == "12h") {
        options.hour12 = true;
    }

    if (isUtc) {
        let date = new Date((dt - 180*60)*1000);
        return date.toLocaleDateString('ru-RU', options).split(", ")[1];
    } else {
        let date = new Date(dt*1000);
        return date.toLocaleDateString('ru-RU', options).split(", ")[1];
    }

}

export const getDate = (index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);

    if (index != 0) {
        var options = {
            weekday: 'long',
            month: 'long', 
            day: 'numeric' 
        };

        return date.toLocaleDateString('ru-RU', options);
    } else {
        var options = {
            month: 'long', 
            day: 'numeric' 
        };

        return `завтра, ${date.toLocaleDateString('ru-RU', options)}`;
    }
}

export const average = (array) => array.reduce((a, b) => a + b) / array.length;
