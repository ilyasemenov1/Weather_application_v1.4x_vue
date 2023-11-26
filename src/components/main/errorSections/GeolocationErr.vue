<script setup>
    import errorSectionRoot from "./errorSectionRoot.vue";
    import SearchIcon from "../../icons/SearchIcon.vue";
    import LocationNotFound from "../../icons/LocationNotFound.vue";

    import { ref } from "vue";

    import { mainData } from '@/stores/mainData.js';
    import { storeToRefs } from 'pinia';

    let store = mainData();
    let { isGeolocationErr } = storeToRefs(store);

    let searchInput = ref(document.getElementById("searchInput"));

</script>
<template>
    <errorSectionRoot :class="{ disactive: !isGeolocationErr }">
        <template #label-content>
            <div class="error-notification__icon">
                <span>
                    <LocationNotFound />
                </span>
            </div>
            <h2 class="error-notification__text">Не удалось определить ваше местоположение</h2>
        </template>
        <template #button>
            <button class="error-notification__button"
            @click="searchInput.focus()">        
                <div class="icon">
                    <SearchIcon />
                </div>
                <span class="text">Перейти к поиску</span>
            </button>
        </template>
    </errorSectionRoot>
</template>

<style scoped>
    .error-notification__icon {
        display: flex;
        justify-content: center;
    }
    .error-notification__icon span {
        position: relative;
        width: 70px;
        height: 70px;
    }
    .error-notification__icon span svg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        fill: var(--text-color-1);
    }
    .error-notification__text {
        margin: 0;
        font-size: 27px;
    }
    .content {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .icon {
        position: relative;
        left: -3px;
        width: 17px;
        height: 17px;
    }
    .icon svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        fill: var(--text-color-1);
    }
    .error-notification__button {
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 15px;
        border: none;
        border-radius: 20px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-weight: 600;
        font-size: 17px;
        background: var(--bg-color-1);
        box-shadow: 0px 2px 8px #00000020;
        color: var(--text-color-1);
        transition: .2s ease;
    }
    .error-notification__button:hover,
    .error-notification__button:focus-visible {
        cursor: pointer;
        box-shadow: 0px 2px 12px #0000001b;
        transform: translateY(-3px);
    }
</style>