<script setup>
    import { onMounted, ref } from "vue";
    import { updateSettings, getSettingsValue, getSettings } from "../../../../assets/js/settings.js";
    
    const settings = getSettings();
    const path = "nightMode";

    let selectMode = ref(getSettingsValue(settings, path));
    let markerWidth = ref(0);
    let markerLeft = ref(0);

    function setMarkerPosition() {
        const formInputs = document.querySelectorAll(".dark-mode-form input");
        const form = document.querySelector(".dark-mode-form");

        let selected = null;
        formInputs.forEach(element => {
            if (element.checked) selected = element;
        })

        
        let parent = selected.parentElement;
        let parentWidth = parent.clientWidth;
        let parentRect = parent.getBoundingClientRect();
        let parentWindowLeft = parentRect.left;
        let formWindowLeft = form.getBoundingClientRect().left;
        
        markerLeft.value = parentWindowLeft - formWindowLeft;
        markerWidth.value = parentWidth;
    }

    onMounted(() => {
        setMarkerPosition();
    });

    function updateSetingsOnClick() {
        setTimeout(() => {
            updateSettings(settings, path, selectMode.value);
            setMarkerPosition();
        }, 50);
    }
</script>

<template>
    <form class="dark-mode-form">
        <span class="dark-mode-form__button-name">Тема:</span>
        <div class="dark-mode-form__theme-select" @click="updateSetingsOnClick">
            <div class="dark-mode-form__select-container">
                <input type="radio" id="night-mode-active" class="dark-mode-form__button-input" name="dark-mode" value="active" v-model="selectMode">
                <label for="night-mode-active">Тёмная</label>
            </div>
            <div class="dark-mode-form__select-container">
                <input type="radio" id="night-mode-auto" class="dark-mode-form__button-input" name="dark-mode" value="auto" v-model="selectMode">
                <label for="night-mode-auto">Авто</label>
            </div>
            <div class="dark-mode-form__select-container">
                <input type="radio" id="night-mode-disactive" class="dark-mode-form__button-input" name="dark-mode" value="disactive" v-model="selectMode">
                <label for="night-mode-disactive">Светлая</label>
            </div>
        </div>
        <div class="marker" :style="{ width: `${markerWidth}px`, transform: `translateX(${markerLeft}px)`}"></div>
    </form>
</template>

<style scoped>
    .dark-mode-form__button-name {
        padding: 0 0 0 10px;
        font-size: 17px;
        font-weight: 500;
        color: var(--text-color-1);
    }
    .dark-mode-form {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: "Sourse Sans Pro", sans-serif;
    }
    .dark-mode-form label {
        font-size: 17px;
        padding: 3px 7px;
        border-radius: 20px;
        font-weight: 500;
        color: var(--text-color-1);
        transition: .3s ease;
    }
    .dark-mode-form label:hover {
        cursor: pointer;
    }
    .dark-mode-form__button-input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }
    .dark-mode-form__theme-select {
        display: flex;
        gap: 10px;
        padding: 8px 5px;
        border-radius: 30px;
        outline: #00000000 solid;
        background: #a3a3a32b;
    }
    .dark-mode-form__select-container {
        z-index: 11;
    }
    .marker {
        position: absolute;
        top: 4px;
        left: 0;
        height: 30px;
        background: var(--bg-color-2);
        border-radius: 50px;
        box-shadow: 0 0 5px #0000001e;
        transition: .2s ease;
        z-index: 10;
    }
</style>