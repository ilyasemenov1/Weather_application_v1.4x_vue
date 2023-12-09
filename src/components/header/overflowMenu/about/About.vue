<script setup>
    import rootLevel2MenuComponent from '../rootLevel2MenuComponent.vue';
    import Logo from "../../Logo.vue";
    import Link from '../../../global/Link.vue';
    import GithubIcon from '../../../icons/GithubIcon.vue';
    import GitIcon from '../../../icons/GitIcon.vue';
</script>

<template>
    <rootLevel2MenuComponent id="about">
        <template #labelText>О приложении</template>
        <template #content>
            <Logo>Погода v1.4.3</Logo>
            <h2>Что нового?</h2>
            <ul>
                <li>Приложение переписано на <a href="https://vuejs.org/" target="_blank">Vue.js framework</a></li>
            </ul>
            <h2>Другие ветки приложения:</h2>
            <ul>
                <li>
                    <a href="https://github.com/ilyasemenov1/Weather_application_v1.4x_stable" target="_blank">Ветка v1.4x - vanilla JS</a>
                </li>
                <li>
                    <a href="https://github.com/ilyasemenov1/Weather_application_v1.3x_stable" target="_blank">Ветка v1.3x</a>
                </li>
            </ul>
            <h2>Есть идеи?</h2>
            <ul>
                <li>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=sialogacc@gmail.com&su=SUBJECT&body=BODY" target="_blank">Почта</a>
                </li>
                <li>
                    <a href="https://t.me/si1og" target="_blank">Telegram</a>
                </li>
                <li>
                    <a href="https://github.com/ilyasemenov1" target="_blank">GitHub</a>
                </li>
            </ul>
            <h2>Хотите помочь в разработке?</h2>
            <ul>
                <li>
                    <a href="https://github.com/ilyasemenov1/Weather_application_v1.4x_stable/upload/master" target="_blank">Отправьте пул реквест на GitHub</a>
                </li>
            </ul>
        </template>
    </rootLevel2MenuComponent>
</template>