<script setup>
    import { ref } from "vue";
    import SelectIcon from "../../../icons/SelectIcon.vue";
    import { updateSettings, getSettingsValue } from "../../../../assets/js/settings.js";

    const props = defineProps(["options", "path"]);
    let options = ref(props.options);
    let path = props.path;

    const settings = JSON.parse(localStorage.getItem("settings"));

    let selected = ref(getSettingsValue(settings, path));
    let isOpen = ref(false);

    function selectOptionEvent(event) {
        let target = event.target;
        if (target.className !== "select__option") return;
        let children = target.children;
        selected.value = children[0].value;
        isOpen.value = false;

        updateSettings(settings, path, selected.value);
    }
</script>

<template>
    <div class="settings-select">
        <span class="settings-select_label">
            <slot></slot>
        </span>
        <div class="select" :class="{ active: isOpen }">
            <button class="select__button" aria-label="Select" @click="isOpen = !isOpen">
                <span>
                    {{ options[selected] }}
                </span>
                <div class="select__icon">
                    <SelectIcon />
                </div>
            </button>
            <div class="select__menu time-format">
                <div class="select__option" v-for="option, index in options" :class="{ disactive: index === selected }" @click="(event) => selectOptionEvent(event)" role="button">
                    <input type="radio" :id="index" :value="index" v-model="selected">
                    <label :for="index">{{ option }}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .settings-select {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
    }
    .settings-select_label {
        font-size: 17px;
        font-weight: 500;
        color: var(--text-color-1);
    }
    .select {
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        outline: #00000000 solid;
        box-shadow: 0px 0px 6px #0000001c;
        background: var(--bg-color-3);
        transition: .2s ease;
    }
    .select:has(.select__button:focus-visible) {
        outline: var(--bg-color-16) solid;
    }
    .select__button {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 10px 10px 10px 15px;
        border: none;
        outline: none !important;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        background: none;
        color: var(--text-color-1);
        transition: .2s ease;
    }
    .select__button div {
        position: relative;
        width: 23px;
        height: 23px;
    }
    .select__button svg {
        position: absolute;
        top: -2px;
        left: -2px;
        width: 28px;
        height: 28px;
        fill: var(--text-color-1);
        transition: .2s ease;
    }
    .select.active svg {
        rotate: 90deg;
    }
    .select:hover,
    .select:focus {
        cursor: pointer;
        box-shadow: 0px 0px 14px #0000001f;
    }
    .select__button:hover {
        cursor: pointer;
    }
    .select__menu {
        position: absolute;
        display: flex;
        top: calc(100% + 15px);
        min-width: 100%;
        width: max-content;
        max-height: 200px;
        left: 0;
        flex-direction: column;
        border-radius: 15px;
        padding: 8px;
        box-shadow: 0px 0px 8px #0000001c;
        background: var(--bg-color-3);
        overflow-x: hidden;
        overflow-y: visible;
        transition: .2s ease;
        box-sizing: border-box;
        z-index: 5;
        transform: translateY(-30px);
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
    }
    .select.active .select__menu {
        transform: translateY(0px);
        opacity: 1;
        pointer-events: all;
        visibility: visible;
    }
    .select__menu::-webkit-scrollbar {
        width: 5px;
        background: none;
    }
    .select__menu::-webkit-scrollbar-thumb {
        background: var(--scroll-bar-color);
        border-radius: 10px;
    }
    .select__option {
        padding: 10px;
        border: none;
        border-radius: 15px;
        font-family: "Sourse Sans Pro", sans-serif;
        font-size: 16px;
        font-weight: 500;
        text-align: left;
        background: var(--bg-color-3);
        color: var(--text-color-1);
        transition: .2s ease;
    }
    .select__option.disactive {
        display: none;
    }
    .select__option:hover,
    .select__option:focus {
        cursor: pointer;
        background: var(--bg-color-12);
    }
    .select__option:active {
        transform: scale(.97);
    }
    .select__option label {
        pointer-events: none;
    }
    .select input {
        display: none;
    }
</style>