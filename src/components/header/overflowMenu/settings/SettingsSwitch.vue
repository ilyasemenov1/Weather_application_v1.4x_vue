<script setup>
    import { ref, watch } from "vue";
    import { updateSettings, getSettingsValue } from "../../../../assets/js/settings.js";

    import { settingsStore } from "@/stores/settings.js";
    import { storeToRefs } from 'pinia'

    import { mainData } from '@/stores/mainData.js';

    const storeData = mainData();
    const { isUpdateForecast } = storeToRefs(storeData);

    const store = settingsStore();
    const { settings } = storeToRefs(store); 

    const props = defineProps(["path"]);
    const path = ref(props.path);

    let isChecked = ref(getSettingsValue(settings.value, path.value));

    watch(
        isChecked,
        () => {
            isUpdateForecast.value = true;
        }
    )
</script>

<template>
    <label class="settings-button" @click="settings = updateSettings(settings, path, !isChecked)">
        <input class="settings-button__checkbox" type="checkbox" v-model="isChecked">
        <span class="settings-button__label">
            <slot></slot>
        </span>
        <span class="settings-button__triger"></span>
    </label>
</template>

<style scoped>
    .settings-button {
        display: grid;
        grid-template-columns: 0px 1fr 50px;
        align-items: center;
        padding: 10px;
        border: none;
        border-radius: 15px;
        text-align: left;
        font-size: 17px;
        background: none;
        transition: .2s ease;
    }
    .settings-button__checkbox {
        display: block;
        z-index: -1;
        opacity: 0;
        width: 0;
        height: 0;
    }
    .settings-button__label {
        margin: 0 20px 0 0;
        font-weight: 500;
        font-size: 18px;
        color: var(--text-color-1);
    }
    .settings-button__triger {
        position: relative; 
        width: 42px;
        height: 22px;
        border-radius: 20px;
        background: #d3d3d3a4;
        transition: .2s ease;
    }
    .settings-button__triger::before {
        position: absolute;
        top: 5px;
        left: 5px;
        content: "";
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--bg-color-1);
        transition: .2s ease;
    }
    .settings-button__checkbox:checked ~ .settings-button__triger {
        background: #889eff;
    }
    .settings-button__checkbox:checked ~ .settings-button__triger::before {
        transform: translateX(21px);
    }
    .settings-button:active .settings-button__triger::before {
        transform: scale(1.2);
        box-shadow: 0px 0px 4px #00000041;
    }
    .settings-button:active .settings-button__checkbox:checked ~ .settings-button__triger::before {
        transform: translateX(21px) scale(1.2);
        box-shadow: 0px 0px 4px #00000041;
    }
    .settings-button:hover  {
        cursor: pointer;
        background: var(--bg-color-12);
    }
    .settings-button {
        outline: #00000000 solid;
    }
    .settings-button:has(input:focus-visible) {
        outline: var(--bg-color-16) solid;
        background: var(--bg-color-12);
    }
</style>