import { defineStore } from 'pinia'
import { ref } from "vue";

const documentВefaultSettings = {
    "nightMode": "auto",
    "fixHeader": true,
    "menuAnimation": false,
    "timeFormat": "24h",
    "showFavouriteTowns": true,
    "dataUpdate": "10min",
    "units": {
        "temp": "c",
        "speed": "mps",
        "pressure": "mm-rt"
    }
}

function getSettings() {
    let settings = JSON.parse(localStorage.getItem("settings"));

    if (isNaN(settings)) {

        let settingsDefault = getDictKeys(documentВefaultSettings, Object.keys(documentВefaultSettings).length);
        let settingsUser = getDictKeys(settings, Object.keys(settings).length);

        if (compartionOfTwoArr(settingsDefault, settingsUser)) {
            return settings;
        } else {
            localStorage.setItem("settings", JSON.stringify(documentВefaultSettings));
            return documentВefaultSettings;
        }
    } else {
        localStorage.setItem("settings", JSON.stringify(documentВefaultSettings));
        return documentВefaultSettings;
    }
}

function getDictKeys(dict, dictSize, firstKey=null ,allKeys=[], counter=0) {
    let keys = [];
    if (isNaN(firstKey)) {
        try {
            if (typeof dict[firstKey] != "string") {
                keys = Object.keys(dict[firstKey]);
            }
        } catch {
            keys = [];
        }
    } else {
        keys = Object.keys(dict);
    }

    if (keys != [] && counter <= dictSize) {
        keys.forEach(element => {
            allKeys.push(element);
            counter++;
            return getDictKeys(dict, dictSize, element, allKeys, counter);
        });
    }

    return allKeys;
}

function compartionOfTwoArr(arr1, arr2) {
    let counter = 0;
    arr1.forEach(element1 => {
        arr2.forEach(element2 => {
            if (element1 == element2) {
                counter++;
            }
        })
    });

    if (counter == arr1.length && counter == arr2.length) {
        return true;
    } else {
        return false
    }
}

export const settingsStore = defineStore("settings", () => {
    let settings = ref(getSettings());
    return { settings }
})