<script setup>
    import Link from '../global/Link.vue';
    import CloudIcon from "../icons/CloudIcon.vue";
    import GitHubIcon from "../icons/GithubIcon.vue";
</script>
<template>
    <footer class="footer">
        <div class="footer__content">
            <Link link-href="https://openweathermap.org/">
                <template #icon>
                    <CloudIcon/>
                </template>
                <template #text>Данные с OpenWeather</template>
            </Link>
            <div class="footer-nav">
                <Link link-href="https://github.com/ilyasemenov1/Weather_application_v1.4x_vue">
                    <template #icon>
                        <GitHubIcon />
                    </template>
                    <template #text>GitHub</template>
                </Link>
            </div>
        </div>
    </footer>
</template>
<style scoped>
    .footer {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 15px 0;
        box-shadow: 0px 0px 15px #00000015;
        background: var(--bg-color-1);
        box-sizing: border-box;
        transition: .3s ease, background 0ms;
        z-index: 5;
    }
    .footer__content {
        display: flex;
        justify-content: space-between;
        max-width: 1440px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>