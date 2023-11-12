<script setup>
    import rootLevel2MenuComponent from '../rootLevel2MenuComponent.vue';
    import NoTownsIcon from '../../../icons/NoTownsIcon.vue';
    import LocationIcon from '../../../icons/LocationIcon.vue';

    import { getWeatherNow } from '../../../../assets/js/weatherInfo.js';

    import { ref, onMounted, watch } from "vue";

    import { favouriteTownsStore } from "@/stores/favouriteTowns.js";
    import { storeToRefs } from 'pinia'

    const store = favouriteTownsStore();
    const { storagedTowns } = storeToRefs(store); 

    // FavouriteTownsWatcher
    watch(
        storagedTowns.value,
        () => {
            localStorage.setItem("favourite-towns", JSON.stringify(storagedTowns.value));
            isShowNoTownsNotify.value = storagedTowns.value.length === 0;
        }
    )


    let isShowNoTownsNotify = ref(storagedTowns.value.length === 0);
    let isUnicTown = ref(true);
    let isinputValue = ref(false);
    let isFocused = ref(false);
    let inputValue = ref("");
    let isSearch = ref(true);
    let isFetching = ref(false);
    let delay = ref(0);
    let isMobile = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    let input = ref(null);

    function isShowTown() {
        let isUnic = true;
        for (let town of storagedTowns.value) {
            if (town.name.toLowerCase() === inputValue.value.toLocaleLowerCase()) {
                isUnic = false;
                break;
            }
        }

        isUnicTown.value = isUnic;
        inputValue.value == "" ? isinputValue.value = false : isinputValue.value = true;
    }

    function createInfoMenu(cityName, element) {
        removeInfoMenu();

        const parentParentElement = element.parentElement.parentElement;
        const parentElement = element.parentElement;

        const margin = 12;
        const pagePadding = 15;

        const rectElement = element.getBoundingClientRect();
        const rectParentElement = parentElement.getBoundingClientRect();
        const rectParentParentElement = parentParentElement.getBoundingClientRect();
        let scrollTop = parentParentElement.scrollTop;

        const menuLeft = rectElement.left - rectParentElement.left;
        const conteinerHeight = rectParentParentElement.height;
        const menuTop = rectElement.top - rectParentElement.top + rectElement.height + margin - 3;

        const infoMenu = document.createElement("div");
        infoMenu.className = "info-menu";
        infoMenu.innerHTML = `
        <button class="info-menu__button" id="info-del-button">
            <div class="info-menu__icon">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 284.011 284.011" style="enable-background:new 0 0 284.011 284.011;" xml:space="preserve">
                        <path d="M235.732,66.214l-28.006-13.301l1.452-3.057c6.354-13.379,0.639-29.434-12.74-35.789L172.316,2.611
                            c-6.48-3.079-13.771-3.447-20.532-1.042c-6.76,2.406-12.178,7.301-15.256,13.782l-1.452,3.057L107.07,5.106
                            c-14.653-6.958-32.239-0.698-39.2,13.955L60.7,34.155c-1.138,2.396-1.277,5.146-0.388,7.644c0.89,2.499,2.735,4.542,5.131,5.68
                            l74.218,35.25h-98.18c-2.797,0-5.465,1.171-7.358,3.229c-1.894,2.059-2.839,4.815-2.607,7.602l13.143,157.706
                            c1.53,18.362,17.162,32.745,35.588,32.745h73.54c18.425,0,34.057-14.383,35.587-32.745l11.618-139.408l28.205,13.396
                            c1.385,0.658,2.845,0.969,4.283,0.969c3.74,0,7.328-2.108,9.04-5.712l7.169-15.093C256.646,90.761,250.386,73.175,235.732,66.214z
                            M154.594,23.931c0.786-1.655,2.17-2.905,3.896-3.521c1.729-0.614,3.59-0.521,5.245,0.267l24.121,11.455
                            c3.418,1.624,4.878,5.726,3.255,9.144l-1.452,3.057l-36.518-17.344L154.594,23.931z M169.441,249.604
                            c-0.673,8.077-7.55,14.405-15.655,14.405h-73.54c-8.106,0-14.983-6.328-15.656-14.405L52.35,102.728h129.332L169.441,249.604z
                            M231.62,96.835l-2.878,6.06L83.057,33.701l2.879-6.061c2.229-4.695,7.863-6.698,12.554-4.469l128.661,61.108
                            C231.845,86.509,233.85,92.142,231.62,96.835z"/>
                </svg>
            </div>
            Удалить
            </button>
        <button class="info-menu__button" id="info-search-button">
            <div class="info-menu__icon">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve">
                    <path d="M325.606,304.394L223.328,202.117c16.707-21.256,26.683-48.041,26.683-77.111C250.011,56.077,193.934,0,125.005,0
                        C56.077,0,0,56.077,0,125.006C0,193.933,56.077,250.01,125.005,250.01c29.07,0,55.855-9.975,77.11-26.681l102.278,102.277
                        C307.322,328.536,311.161,330,315,330s7.678-1.464,10.606-4.394C331.465,319.749,331.465,310.251,325.606,304.394z M30,125.006
                        C30,72.619,72.619,30,125.005,30c52.387,0,95.006,42.619,95.006,95.005c0,52.386-42.619,95.004-95.006,95.004
                        C72.619,220.01,30,177.391,30,125.006z"/>
                </svg>    
            </div>
            Поиск
            </button>
        `

        parentElement.append(infoMenu);

        const infoMenuHeight = infoMenu.clientHeight;
        const menuBottom = rectElement.top - rectParentElement.top - margin + 2 - infoMenuHeight;


        if (scrollTop + conteinerHeight - 70 - (menuTop + infoMenuHeight) >= pagePadding) {
            infoMenu.style = `top: ${menuTop}px; left: ${menuLeft}px`;
            infoMenu.classList.add("top");
        } else if (menuBottom > 0) {
            infoMenu.style = `top: ${menuBottom}px; left: ${menuLeft}px`;
            infoMenu.classList.add("bottom");
        } else {
            infoMenu.remove();
        }

        infoMenu.addEventListener("mousedown", (event) => {
            let target = event.target;

            if (target.id == "info-del-button") {
                removeFafouriteTown(cityName.name);
            } else if (target.id == "info-search-button") {
                searchEvent(cityName.name);
            }

            removeInfoMenu();
        });

        parentParentElement.addEventListener("scroll", () => {
            scrollTop = parentParentElement.scrollTop;
        })
    }

    function touchEvent(cityName, event) {
        let element = event.target;
        isSearch.value = true;
        delay.value = setTimeout(() => {
            createInfoMenu(cityName, element);
            isSearch.value = false;
        }, 250);
    }

    function searchEvent(town) {
        if (!isSearch.value) return;
        clearTimeout(delay.value);
        console.log(town);
    }

    function removeInfoMenu() {
        let elements = document.querySelectorAll(".info-menu");

        if (!isNaN(elements)) {
            return;
        }

        elements.forEach(element => {
            isSearch.value = true;
            if (element.classList.contains("top")) {
                element.classList.add("remove-top");
            } else {
                element.classList.add("remove-bottom");
            }
            setTimeout(() => {
                element.remove();
            }, 200);
        });
    }

    function removeFafouriteTown(name) {
        for (let i = 0; i < storagedTowns.value.length; i++) {
            if (storagedTowns.value[i].name.toLowerCase() === name.toLowerCase()) {
                storagedTowns.value.splice(i, 1);
            };
        }

        isShowNoTownsNotify.value = storagedTowns.value.length === 0;
    }

    async function addFavoutiteTown() {
        isFetching.value = true;
        getWeatherNow(inputValue.value)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.cod != 200) return;
            let town = {
                name: data.city.name,
                lat: Math.round(data.city.coord.lat),
                lon: Math.round(data.city.coord.lon)
            }
            storagedTowns.value.push(town);

            isShowNoTownsNotify.value = storagedTowns.value.length === 0;
            isShowTown();
        })
        .finally(() => {
            isFetching.value = false;
        })
    }

    onMounted(() => {
        input.value;
    });
</script>

<template>
    <rootLevel2MenuComponent id="favourite-towns">
        <template #labelText>Избранные города</template>
        <template #content class="favourite-towns-content">
            <div class="add-town" :class="{ active: isUnicTown && isinputValue && isFocused }">
                <input type="text" placeholder="Введите название города" class="add-town__input" 
                v-model="inputValue" 
                @input="isShowTown" 
                @focus="() => {
                    isFocused = true;
                    isShowTown();
                    }" 
                @blur="isFocused = false" 
                @keypress.enter="addFavoutiteTown" 
                ref="input">
                <button class="add-town__button" 
                @focus="isFocused = true" 
                @blur="isFocused = false" 
                @click="addFavoutiteTown" 
                :class="{ loading: isFetching }">
                    <span class="plus-s-1"></span>
                    <span class="plus-s-2"></span>
                    <span class="plus-s-3"></span>
                    <span class="plus-s-4"></span>
                </button>
            </div>
            <div class="favourite-towns-no-towns" :class="{ active: isShowNoTownsNotify }">
                <span class="favourite-towns-no-towns__label">
                    <div class="favourite-towns-no-towns__icon">
                        <NoTownsIcon />
                    </div>
                    <span>У вас нет избранных городов</span>
                </span>
                <button class="favourite-towns__add-button" @click="input.focus()">Добавить город</button>
            </div>
            <div class="favourite-towns">
                <button class="favorite-town" 
                v-for="town in storagedTowns" 
                @mousedown="(event) => { if (!isMobile) touchEvent(town, event) }" 
                @focus="(event) => { if (isMobile) touchEvent(town, event) }" 
                @blur="removeInfoMenu"
                @click="searchEvent(town)"> 
                    <h3 class="favorite-town__name">{{ town.name }}</h3>
                    <div class="favorite-town__coords">
                        <div class="favorite-town__coords-icon">
                            <LocationIcon />
                        </div>
                        <span>{{ town.lat }}° / {{ town.lon }}°</span>
                    </div>
                </button>
            </div>
        </template>
    </rootLevel2MenuComponent>
</template>

<style scoped>
    .favourite-towns-content {
        display: grid;
        grid-template-rows: 45px 1fr;
        gap: 25px;
        height: 100%;
    }
    .favourite-towns-no-towns {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: calc(100% - 70px);
        padding: 10px;
        transition: .2s ease;
        opacity: 0;
        transform: translateX(-50px);
        visibility: hidden;
        pointer-events: none;
    }
    .favourite-towns-content {
        position: relative;
        top: calc(50% - 35px);
        transform: translateY(-50%);
    }
    .favourite-towns-no-towns.active {
        position: relative;
        left: 0;
        opacity: 1;
        transform: translateX(0);
        visibility: visible;
        pointer-events: inherit;
    }
    .favourite-towns-no-towns__label {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        position: relative;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 24px;
        font-weight: 700;
        color: var(--text-color-1);
    }
    .favourite-towns-no-towns__icon {
        position: relative;
        width: 70px;
        height: 70px;
    }
    .favourite-towns-no-towns__icon svg {
        position: absolute;
        width: inherit;
        height: inherit;
        fill: var(--text-color-1);
    }
    .favourite-towns__add-button {
        position: relative;
        width: max-content;
        padding: 8px 10px 8px 34px;
        border: none;
        border-radius: 15px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0px 0px 6px #0000001c;
        color: var(--text-color-1);
        background: var(--bg-color-3);
        transition: .2s ease;
    }
    .favourite-towns__add-button::after {
        position: absolute;
        content: "+";
        left: 8px;
        top: calc(50% - 10px);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        font-size: 18px;
        font-weight: 600;
        line-height: 20px;
        background: var(--bg-color-10);
    }
    .favourite-towns__add-button:hover,
    .favourite-towns__add-button:focus {
        cursor: pointer;
        box-shadow: 0px 1px 12px #0000001f;
        transform: translateY(-3px);
    }
    .add-town {
        position: relative;
        width: 100%;
        margin: 10px 0 0 0;
    }
    .add-town__input {
        min-height: 45px;
        width: 100%;
        padding: 8px 10px;
        border: none;
        border-radius: 15px;
        outline: #00000000 solid; 
        font-family: "Sourse Sans Pro", sans-serif;
        font-weight: 500;
        font-size: 17px;
        box-shadow: 0px 0px 6px #0000001c;  
        background: var(--bg-color-3);
        color: var(--text-color-1);
        transition: .2s ease;
        box-sizing: border-box;
    }
    .add-town__input:focus-visible {
        box-shadow: 0px 0px 12px #0000001f;
        background: var(--bg-color-15);
        outline: var(--bg-color-16) solid;
    }
    .add-town__input:hover {
        box-shadow: 0px 0px 12px #0000001f;
    }
    .add-town__button {
        position: absolute;
        top: 0;
        right: 0;
        width: 45px;
        height: 45px;
        border: none;
        border-radius: 15px;
        background: var(--bg-color-3);
        box-shadow: 0px 0px 6px #0000001c;
        transform: translateX(100%);
        transition: .2s ease;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }
    .add-town__button:hover {
        cursor: pointer;
        background: var(--bg-color-15);
    }
    .add-town.active  .add-town__input,
    .add-town:has(.add-town__button:focus-visible) .add-town__input {
        width: calc(100% - 60px);
    }
    .add-town.active .add-town__button,
    .add-town__button:focus-visible {
        transform: translateX(0%);  
        visibility: visible;
        pointer-events: all;
        opacity: 1;
    }
    .add-town__button span {
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 2px);
        content: "";
        width: 4px;
        height: 25px;
        border-radius: 10px;
        background: var(--bg-color-13);
        transition: .2s ease;
    }
    .add-town__button .plus-s-1 {
        transform: rotate(90deg);
    }
    .add-town__button.loading span {
        top: calc(50% - 3px);
        width: 7px;
        height: 7px;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .add-town__button.loading span:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .add-town__button.loading span:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .add-town__button.loading span:nth-child(3) {
        left: 20px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .add-town__button.loading span:nth-child(4) {
        left: 32px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    .favourite-towns {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin: 15px 0 0 0;
    }
    .favorite-town {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        border: none;
        border-radius: 20px;
        font-family: "Sourse Sans Pro";
        font-weight: 600;
        text-align: left;
        box-shadow: 0px 0px 6px #0000001c;
        background: var(--bg-color-3);
        color: var(--text-color-1);
        transition: .2s ease;
        animation: favorite-town-add .2S ease forwards;
        overflow: hidden;
    }
    @keyframes favorite-town-add {
        0% {
            opacity: 0;
            transform: translateY(15px);
        }
        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
    .favorite-town__name {
        font-size: 20px;
        font-weight: 700;
        pointer-events: none;
        margin: 0;
    }
    .favorite-town__coords {
        position: relative;
        display: flex;
        gap: 3px;
        font-size: 16px;
        pointer-events: none;
    }
    .favorite-town__coords-icon {
        position: relative;
        width: 20px;
        height: 20px;
    }
    .favorite-town__coords-icon svg {
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        fill: var(--text-color-1);
    }
    .favorite-town:hover,
    .favorite-town:focus {
        cursor: pointer;
        box-shadow: 0px 1px 12px #0000001f;
        transform: translateY(-3px);
    }
    .favorite-town__name::first-letter {
        text-transform: uppercase;
    }
</style>