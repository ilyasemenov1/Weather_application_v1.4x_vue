<script setup>
    import rootLevel2MenuComponent from '../rootLevel2MenuComponent.vue';
    import NoTownsIcon from '../../../icons/NoTownsIcon.vue';
    import LocationIcon from '../../../icons/LocationIcon.vue';

    import { ref, defineComponent  } from "vue";

    let storagedTowns = ref([{"name":"всеволожск","lat":60,"lon":31},{"name":"минск","lat":54,"lon":28},{"name":"киев","lat":50,"lon":31},{"name":"магадан","lat":60,"lon":151},{"name":"мариуполь","lat":47,"lon":38},{"name":"брянск","lat":53,"lon":34},{"name":"светлогорск","lat":53,"lon":30},{"name":"омск","lat":55,"lon":73},{"name":"гатчина","lat":60,"lon":30},{"name":"казань","lat":56,"lon":49},{"name":"улан-удэ","lat":52,"lon":108},{"name":"махачкала","lat":43,"lon":48},{"name":"псков","lat":58,"lon":28},{"name":"зеленогорск","lat":56,"lon":95},{"name":"зеленоград","lat":56,"lon":37},{"name":"ростов","lat":57,"lon":39},{"name":"великий новгород","lat":59,"lon":31},{"name":"москва","lat":56,"lon":38},{"name":"севастополь","lat":45,"lon":34},{"name":"кемерово","lat":55,"lon":86}])
    let isShowNoTownsNotify = ref(storagedTowns.value.length < 1);
    let isUnicTown = ref(true);
    let isinputValue = ref(false);
    let isFocused = ref(false);
    let inputValue = ref("");
    let isSearch = ref(true);
    let delay = ref(0);
    let isMobile = ref(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    function isShowTown() {
        let isUnic = true;
        for (let town of storagedTowns.value) {
            if (town.name === inputValue.value) {
                isUnic = false;
                break;
            }
        }

        isUnicTown.value = isUnic;
        inputValue.value == "" ? isinputValue.value = false : isinputValue.value = true;
    }

    function createInfoMenu(cityName, element) {
        const parentElement = element.parentElement;

        const margin = 12;
        const pagePadding = 15;

        const rectElement = element.getBoundingClientRect();
        const rectParentElement = parentElement.getBoundingClientRect();

        const menuLeft = rectElement.left - rectParentElement.left;
        const conteinerHeight = rectParentElement.height;
        const menuTop = rectElement.top - rectParentElement.top + rectElement.height + margin - 3;

        const infoMenu = document.createElement("div");
        infoMenu.className = "info-menu";
        infoMenu.innerHTML = `
        <button class="info-menu__button" id="info-del-button">Удалить</button>
        <button class="info-menu__button" id="info-search-button">Поиск</button>
        `

        parentElement.append(infoMenu);

        const infoMenuHeight = infoMenu.clientHeight;
        const menuBottom = rectElement.top - rectParentElement.top - margin + 2 - infoMenuHeight;


        if (conteinerHeight - (menuTop + infoMenuHeight) >= pagePadding) {
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
                element.remove();

                localStorage.setItem("favorite-towns", JSON.stringify(parentElement));
            } else if (target.id == "info-search-button") {
                console.log(cityName);
            }
        });
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

    function removePopup() {
        isSearch.value = true;
    }
</script>

<template>
    <rootLevel2MenuComponent id="favourite-towns">
        <template #labelText>Избранные города</template>
        <template #content class="favorite-towns-content">
            <div class="add-town" :class="{ active: isUnicTown && isinputValue && isFocused }">
                <input type="text" placeholder="Введите название города" class="add-town__input" v-model="inputValue" @input="isShowTown" @focus="isFocused = true" @blur="isFocused = false">
                <button class="add-town__button" @focus="isFocused = true" @blur="isFocused = false">
                    <span class="plus-s-1"></span>
                    <span class="plus-s-2"></span>
                    <span class="plus-s-3"></span>
                    <span class="plus-s-4"></span>
                </button>
            </div>
            <div class="favourite-towns-content">
                <div class="favourite-towns-no-towns" :class="{ active: isShowNoTownsNotify }">
                    <span class="favorite-towns-no-towns__label">
                        <div class="favorite-towns-no-towns__icon">
                            <NoTownsIcon />
                        </div>
                        <span>У вас нет избранных городов</span>
                    </span>
                    <button class="favorite-towns__add-button">Добавить город</button>
                </div>
            </div>
            <div class="favourite-towns">
                <button class="favorite-town" 
                v-for="town in storagedTowns" 
                @mousedown="(event) => { if (!isMobile) touchEvent(town, event) }" 
                @focus="(event) => { if (isMobile) touchEvent(town, event) }" 
                @blur="removePopup"
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
    .favorite-towns-content {
        display: grid;
        grid-template-rows: 45px 1fr;
        gap: 25px;
        height: 100%;
    }
    .favourite-towns-no-towns {
        position: absolute;
        left: 1000px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 10px;
        transition: .2s ease;
        opacity: 0;
        transform: translateX(-50px);
        visibility: hidden;
        pointer-events: none;
    }
    .favourite-towns-no-towns.active {
        position: relative;
        left: 0;
        opacity: 1;
        transform: translateX(0);
        visibility: visible;
        pointer-events: all;
    }
    .favorite-towns-no-towns__label {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        position: relative;
        margin: 60px 0 0 0;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 24px;
        font-weight: 700;
        color: var(--text-color-1);
    }
    .favorite-towns-no-towns__icon {
        position: relative;
        width: 70px;
        height: 70px;
    }
    .favorite-towns-no-towns__icon svg {
        position: absolute;
        width: inherit;
        height: inherit;
        fill: var(--text-color-1);
    }
    .favorite-towns__add-button {
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
    .favorite-towns__add-button::after {
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
    .favorite-towns__add-button:hover,
    .favorite-towns__add-button:focus {
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