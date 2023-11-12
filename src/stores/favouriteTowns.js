import { defineStore } from 'pinia'
import { ref } from "vue";

export const favouriteTownsStore = defineStore("favourite-towns", () => {
    let storagedTowns = ref([]);

    let favouriteTowns = JSON.parse(localStorage.getItem("favourite-towns"));
    if (isNaN(favouriteTowns) && favouriteTowns) storagedTowns = ref(favouriteTowns);

    return { storagedTowns }
})