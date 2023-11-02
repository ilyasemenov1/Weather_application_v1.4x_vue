<script setup>
    import { computed, toRef, ref } from "vue";
    const props = defineProps(['towns']);
    
    
</script>

<template>
    <div class="search-towns-conteiner">
        <div class="search-towns">
            <button class="search-town" v-for="town of towns" @click="console.log({town})">{{ town }}</button>
        </div>
    </div>
</template>