<script setup>
    import SearchTowns from "./SearchTowns.vue";
    import { ref } from 'vue';

    let towns = ref([]);
    let isFocused = ref(false);

    const stotagedTowns = ["123", "345", "343"]
    let resultTowns = [];

    function ScarchStoregedTowns(town) {
        resultTowns = [];
        for (let element of stotagedTowns) {
            if (element.includes(town)) { resultTowns.push(element) }
        }
        towns = ref(resultTowns);
    }


</script>

<template>
    <div class="search">
        <div class="search-content" :class="{active: isFocused}">
            <button class="search-button" tabindex="-1" @click="console.log('clicked')"></button>
            <input type="search" autocomplete="off" placeholder="Введите название города" 
            @input="event => ScarchStoregedTowns(event.target.value)" 
            @keyup.enter="console.log('search')" 
            @keyup.esc="(event) => event.target.blur()"
            @keyup.shift.delete="(event) => event.target.value = ''"
            @focus="isFocused=true" 
            @blur="isFocused=false">
        </div>
        <SearchTowns :towns="towns" />
    </div>
</template>

<style scoped>
    .search {
        position: relative;
        max-width: 650px;
        width: 100%;
        height: 50px;
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
</style>