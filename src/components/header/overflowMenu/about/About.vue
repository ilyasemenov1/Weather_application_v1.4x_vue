<script setup>
    import rootLevel2MenuComponent from '../rootLevel2MenuComponent.vue';
    import LogoIcon from '../../../icons/LogoIcon.vue';
</script>

<template>
    <rootLevel2MenuComponent id="about">
        <template #labelText>О приложении</template>
        <template #content>
            <div class="app-logo">
                <div class="app-logo__icon">
                    <LogoIcon />
                </div>
                <div class="app-logo__text">
                    Погода v1.4.3.1
                </div>
            </div>
            <h2>Что нового?</h2>
            <ul>
                <li>Приложение переписано на <a class="inline" href="https://vuejs.org/" target="_blank">Vue.js framework</a></li>
                <li>Исправлены мелкие ошибки</li>
            </ul>
            <h2>Другие ветки приложения:</h2>
            <ul>
                <li>
                    <a class="inline" href="https://github.com/ilyasemenov1/Weather_application_v1.4x_stable" target="_blank">Ветка v1.4x - vanilla JS</a>
                </li>
                <li>
                    <a class="inline" href="https://github.com/ilyasemenov1/Weather_application_v1.3x_stable" target="_blank">Ветка v1.3x</a>
                </li>
            </ul>
            <h2>Есть идеи?</h2>
            <ul>
                <li>
                    <a class="inline" href="https://mail.google.com/mail/?view=cm&fs=1&to=sialogacc@gmail.com&su=SUBJECT&body=BODY" target="_blank">Почта</a>
                </li>
                <li>
                    <a class="inline" href="https://t.me/si1og" target="_blank">Telegram</a>
                </li>
                <li>
                    <a class="inline" href="https://github.com/ilyasemenov1" target="_blank">GitHub</a>
                </li>
            </ul>
            <h2>Хотите помочь в разработке?</h2>
            <ul>
                <li>
                    <a class="inline" href="https://github.com/ilyasemenov1/Weather_application_v1.4x_vue/upload/master" target="_blank">Отправьте пул реквест на GitHub</a>
                </li>
            </ul>
        </template>
    </rootLevel2MenuComponent>
</template>
<style scoped>
    .app-logo {
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .app-logo__icon {
        position: relative;
        width: 22px;
        height: 22px;
    }
    .app-logo__icon svg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .app-logo__text {
        font-size: 24px;
        color: var(--text-color-1);
        font-weight: 700;
    }
</style>