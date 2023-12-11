import { defineStore } from 'pinia'
import { ref } from "vue";

export const burgerMenuDataStore = defineStore("burger-menu-data-store", () => {
    let isMenuOpen = ref(false);
    let isMenuArrowMode = ref(false);

    return { isMenuOpen, isMenuArrowMode }
});