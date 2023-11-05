<script setup>
    import rootLevel2MenuComponent from '../rootLevel2MenuComponent.vue';
    import Logo from "../../Logo.vue";
</script>

<template>
    <rootLevel2MenuComponent id="about">
        <template #labelText>О приложении</template>
        <template #content>
            <Logo v-for="i in 60">Погода v1.5.0</Logo>
        </template>
    </rootLevel2MenuComponent>
</template>