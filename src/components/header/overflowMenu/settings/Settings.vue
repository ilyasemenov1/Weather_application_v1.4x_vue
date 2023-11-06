<script setup>
    import rootLevel2MenuComponent from '../rootLevel2MenuComponent.vue';
    import ThemeMenuSelect from './ThemeMenuSelect.vue';
    import SettingsSwitch from './SettingsSwitch.vue';
    import SettingsSelect from './SettingsSelect.vue';
</script>

<template>
    <rootLevel2MenuComponent id="settings">
        <template #labelText>Настройки</template>
        <template #content>
            <h2>Интерфейс:</h2>
            <ThemeMenuSelect />
            <SettingsSwitch>
                Фиксировать шапку сайта при прокручивании
            </SettingsSwitch>
            <SettingsSwitch>
                Упростить анимацию открытия меню
            </SettingsSwitch>
            <SettingsSwitch>
                Показывать избранные города при поиске
            </SettingsSwitch>
            <SettingsSelect :options='{"12h": "12-часовой", "24h": "24-часовой"}'>
                Временной формат:
            </SettingsSelect>
        </template>
    </rootLevel2MenuComponent>
</template>