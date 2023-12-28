<script setup>
    import SearchIcon from "../icons/SearchIcon.vue";
    import CloseIcon from "../icons/CloseIcon.vue";
    import { ref, onMounted } from 'vue';

    import { favouriteTownsStore } from "@/stores/favouriteTowns.js";
    import { settingsStore } from "@/stores/settings.js";
    import { mainData } from '@/stores/mainData.js';
    import { burgerMenuDataStore } from "@/stores/burgerMenu.js";
    import { storeToRefs } from 'pinia';

    const storeSettings = settingsStore();
    const { settings } = storeToRefs(storeSettings); 

    const store = favouriteTownsStore();
    const { storagedTowns } = storeToRefs(store); 

    const storeMainData = mainData();
    const { cityName } = storeToRefs(storeMainData); 

    const menuStore = burgerMenuDataStore();
    let { isMenuOpen, isMenuArrowMode } = storeToRefs(menuStore);

    let towns = ref([]);
    let isFocused = ref(false);
    let isFindTowns = ref(false);
    let isValue = ref(false);

    let searchInput = ref(null);

    let townFocusIndex = ref(0);

    
    window.addEventListener("keydown", (event) => {
        if ([191, 111].includes(event.keyCode)) {
            event.preventDefault();
            setTimeout(() => {
                isMenuOpen.value = false;
                isMenuArrowMode.value = false;
                searchInput.value.focus();
            }, 50);
        }
    });
    
    function searchStoregedTowns(value) {
        let сounter = 0;
        let resultTowns = [];
        if (value) {
            isValue.value = true;
            for (let j = 0; j < storagedTowns.value.length; j++) {
                value = value.toLowerCase();
                let element = storagedTowns.value[j].name.toLowerCase();
                if (element.includes(value)) { 
                    сounter++;
                    let townTextArr = element.split(value);
                    let town = ""
                    for (let i = 0; i < townTextArr.length; i++) {
                        town += `<b>${townTextArr[i]}</b>`;
                        if (i != townTextArr.length-1) town += value;
                    }
                    resultTowns.push({townHTML: town, town: element, number: сounter});
                 }
            }
            towns.value = resultTowns;
            isFindTowns.value = resultTowns.length > 0;
        } else {
            isValue.value = false;
            isFindTowns.value = false;
            setTimeout(() => {
                towns.value = [];
            }, 200);
        }
    }

    function removeFafouriteTown(name) {
        for (let i = 0; i < storagedTowns.value.length; i++) {
            if (storagedTowns.value[i].name.toLowerCase() === name.toLowerCase()) {
                storagedTowns.value.splice(i, 1);
            };
            storagedTowns.value.length > 0 ? isFindTowns.value = true : isFindTowns.value = false;
        }
    }

    function focusTownByArrow(clallback) {
        if (!(isFocused.value && isFindTowns.value && settings.value.showFavouriteTowns)) return;
        event.preventDefault();
        console.log(townFocusIndex.value);
        clallback();
    }

    onMounted(() => {
        searchInput.value;
    });
</script>

<template>
    <search class="search">
        <div class="search-content" :class="{ active: isFocused }">
            <button class="search-button" tabindex="-1" @click="cityName = searchInput.value" aria-label="Поиск">
                <SearchIcon></SearchIcon>
            </button>
            <input type="search" autocomplete="off" placeholder="Введите название города" 
            @input="event => searchStoregedTowns(event.target.value)" 
            @keyup.enter="(event) => cityName = event.target.value" 
            @keyup.esc="(event) => event.target.blur()"
            @keyup.shift.delete="(event) => event.target.value = ''"
            @keydown.down="(event) => focusTownByArrow(() => {
                if (townFocusIndex == towns.length) return;
                townFocusIndex++;
                let town = $refs[`town-${townFocusIndex}`][0];
                town.classList.add('selected');
                searchInput.value = town.value;
            }, event)"
            @keydown.up="(event) => focusTownByArrow(() => {
                if (townFocusIndex == 0) return;
                if (townFocusIndex == 1) {
                    townFocusIndex--;
                    searchInput.focus();
                    return;
                }
                townFocusIndex--;
                let town = $refs[`town-${townFocusIndex}`][0];
                town.classList.add('selected');
                searchInput.value = town.value;
            }, event)"
            @focus="(event) => {
                searchStoregedTowns(event.target.value);
                isFocused=true;
            }" 
            @blur="() => {
                isFocused = false;
                townFocusIndex = 0;
                }"
            ref="searchInput"
            id="searchInput">
            <button class="clear-button"
            @click="() => {
                searchInput.value = '';
                isValue = false;
                searchInput.focus();
            }"
            :class="{ active: isValue }" 
            aria-label="Отчистить ввод">
                <CloseIcon />
            </button>
        </div>
        <div class="search-towns" :class="{ active: isFocused && isFindTowns && settings.showFavouriteTowns }">
            <h3 class="search-towns__label">Избранные города</h3>
            <div class="search-towns__content">
                <div class="search-town__town-conteiner" v-for="town in towns" >
                    <button class="search-town__town-button"
                    :ref="`town-${town.number}`"
                    @mousedown="() => {
                        cityName = town.town;
                        searchInput.value = town.town;
                    }" 
                    @click="() => {
                        cityName = town.town;
                        searchInput.value = town.town;
                    }" 
                    v-html="town.townHTML"
                    :value="town.town"></button>
                    <button class="search-town__town-delete-button"
                    @mousedown="removeFafouriteTown(town.town)"
                    @click="removeFafouriteTown(town.town)">
                        <CloseIcon />
                    </button>
                </div>
            </div>
        </div>
    </search>
</template>

<style scoped>
    .search {
        position: relative;
        max-width: 650px;
        width: 100%;
        height: 50px;
        margin: 0 50px 0 0;
    }
    .header.scrolled .search-content {
        top: 2px;
        height: 47px;
    }
    .search-content {
        position: relative;
        display: grid;
        grid-template-columns: 45px 1fr 45px;
        align-items: center;
        height: 50px;
        outline: #00000000 solid;
        border-radius: 8px;
        background: var(--bg-color-14);
        transition: .2s ease;
        z-index: 10;
    }
    .search-content.active {
        background: var(--bg-color-15);
        box-shadow: 0px 1px 4px #00000034;
        outline: var(--bg-color-16) solid;
    }
    .search-button {
        position: relative;
        width: 35px;
        height: 35px;
        margin: 0 0 0 10px;
        background: none;
        border: 1px solid #ffffff00;
        border-radius: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-image: var(--search-icon-path);
        transition: .2s ease;
    }
    .search-button>svg,
    .clear-button>svg {
        position: absolute;
        top: 7px;
        left: 7px;
        width: 20px;
        height: 20px;
        fill: var(--text-color-1);
        opacity: .9;
    }
    input {
        height: 40px;
        padding: 0 10px;
        border: none;
        outline: none;
        font-family: "Sourse Sans Pro", sans-serif;
        font-weight: 500;
        font-size: 17px;
        background: none;
        color: var(--text-color-5);
    }
    button:hover,
    button:focus {
        cursor: pointer;
        background-color: var(--bg-color-12);
        border: 1px solid var(--border-color-1);
    
    }
    .search-towns {
        display: flex;
        flex-direction: column;
        gap: 7px;
        position: absolute;
        top: calc(100% - 10px);
        width: 100%;
        max-height: 300px;
        padding: 20px 0 12px 0;
        border-radius: 0 0 15px 15px;
        box-shadow: 0px 0px 10px #00000029;
        background: var(--bg-color-1);
        box-sizing: border-box;
        overflow-y: visible;
        overflow-x: hidden;
        transition: .15s ease;
        z-index: -1;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        visibility: hidden;
    }
    .search-towns.active,
    .search-towns:has(button:focus-visible) {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;
        visibility: visible;
    }
    .search-towns__content {
        display: flex;
        flex-direction: column;
        font-family: "Sourse Sans Pro";
        font-weight: 500;
        color: var(--text-color-1);
    }
    .search-towns__label {
        margin: 0 0 0 15px;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-color-1);
    }
    .search-town__town-conteiner {
        display: grid;
        grid-template-columns: 1fr 30px;
        align-items: center;
        gap: 10px;
        padding: 0 15px;
        background: var(--bg-color-1);
    }
    .search-towns .search-town__town-button {
        position: relative;
        margin: 0;
        padding: 10px 0;
        border: none;
        outline: none;
        text-align: left;
        font-size: 16px;
        font-weight: 500; 
        color: var(--text-color-1);
        background: none;
        transition: .2s ease;
    }
    .search-towns .search-town__town-button::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 4px;
        height: 100%;
        border-radius: 0 3px 3px 0;
        background: var(--bg-color-16);
        opacity: 0;
        transform: translateX(-100%);
        transition: .2s ease;
    }
    .search-towns .search-town__town-button::first-letter {
        text-transform: uppercase;
    }
    .search-towns .search-town__town-conteiner:hover,
    .search-towns .search-town__town-conteiner:focus,
    .search-town__town-conteiner:has(button:focus) {
        cursor: pointer;
        background: var(--bg-color-14);
    }
    .search-towns .search-town__town-button:focus {
        outline: none !important;
    }
    .search-town__town-delete-button {
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid #00000000;
        background: none;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }
    .search-town__town-conteiner:hover .search-town__town-delete-button,
    .search-town__town-conteiner:has(button:focus) .search-town__town-delete-button{
        opacity: 1;
        pointer-events: all;
        visibility: visible;
    }
    .search-town__town-delete-button svg {
        position: absolute;
        top: 50%;
        left: 50%;
        width: calc(100% + 0px);
        height: calc(100% + 0px);
        stroke: var(--text-color-1);
        fill: var(--text-color-1);
        transform: translate(-50%, -50%);
    }
    .clear-button {
        position: relative;
        width: 35px;
        height: 35px;
        margin: 0 10px 0 0;
        background: none;
        border: 1px solid #ffffff00;
        border-radius: 100%;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }
    .clear-button>svg {
        top: 1px;
        left: 1px;
        width: 32px;
        height: 32px;
        stroke: var(--text-color-1);
    }
    .clear-button.active {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
    }
</style>