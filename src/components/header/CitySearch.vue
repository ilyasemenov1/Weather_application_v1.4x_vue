<script setup>
    import SearchIcon from "../icons/SearchIcon.vue";
    import { ref } from 'vue';

    let towns = ref([]);
    let isFocused = ref(false);
    let isFindTowns = ref(false);

    const storagedTowns = ["Всеволожск", "126345678"];
    let resultTowns = [];

    function searchStoregedTowns(value) {
        resultTowns = [];
        if (value) {
            for (let element of storagedTowns) {
                value = value.toLowerCase();
                element = element.toLowerCase();
                if (element.includes(value)) { 
                    let townTextArr = element.split(value);
                    let town = ""
                    for (let i = 0; i < townTextArr.length; i++) {
                        town += townTextArr[i];
                        if (i != townTextArr.length-1) town += `<b>${value}</b>`;
                    }
                    resultTowns.push(town);
                 }
            }
            towns.value = resultTowns;
            resultTowns.length > 0 ? isFindTowns.value = true : isFindTowns.value = false;
        } else {
            isFindTowns.value = false;
            setTimeout(() => {
                towns.value = [];
            }, 200);
        }
    }


</script>

<template>
    <search class="search">
        <div class="search-content" :class="{active: isFocused}">
            <button class="search-button" tabindex="-1" @click="console.log('clicked')">
                <SearchIcon></SearchIcon>
            </button>
            <input type="search" autocomplete="off" placeholder="Введите название города" 
            @input="event => searchStoregedTowns(event.target.value)" 
            @keyup.enter="console.log('search')" 
            @keyup.esc="(event) => event.target.blur()"
            @keyup.shift.delete="(event) => event.target.value = ''"
            @focus="isFocused=true" 
            @blur="isFocused=false">
        </div>
        <div class="search-towns" :class="{ active: isFocused && isFindTowns }">
            <h3 class="search-towns__label">Избранные города</h3>
            <div class="search-towns__content">
                <button class="search-town__town-button" 
                v-for="town of towns" 
                @click="console.log({ town })" 
                v-html="town"></button>
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
    .search-content {
        position: relative;
        display: grid;
        grid-template-columns: 45px 1fr;
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
    .search-button svg {
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
    }
    .search-towns button {
        position: relative;
        margin: 0;
        padding: 10px 15px;
        border: none;
        outline: none;
        text-align: left;
        font-size: 16px;
        font-weight: 500; 
        color: var(--text-color-1);
        background: var(--bg-color-1);
        transition: .2s ease;
    }
    .search-towns button b {
        font-weight: 700;
        text-decoration: underline;
    }
    .search-towns button::before {
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
    .search-towns button::first-letter {
        text-transform: uppercase;
    }
    .search-towns button:hover,
    .search-towns button:focus {
        cursor: pointer;
        background: var(--bg-color-14);
    }
    .search-towns button:focus {
        outline: none !important;
    }
    .modal-block__recommend-button:focus::before {
        opacity: 1;
        transform: translateY(0);
    } 
</style>