<script setup>
import rootLevel2MenuComponent from '../rootLevel2MenuComponent.vue'
import LogoIcon from '../../../icons/LogoIcon.vue'
</script>

<template>
	<rootLevel2MenuComponent id="about">
		<template #labelText>О приложении</template>
		<template #content :style="{ height: 'calc(100%-40px)' }">
			<div class="app-logo">
				<div class="app-logo__icon">
					<LogoIcon />
				</div>
				<div class="app-logo__text">Погода v1.4.5</div>
			</div>
			<h2>Что нового?</h2>
			<ul>
				<li>
					Добавлены настройки отображения информации в почасовом прогнозе.
				</li>
				<li>
					Добавлено краткое описание искомого города.
				</li>
			</ul>
			<h2>Другие ветки приложения:</h2>
			<ul>
				<li>
					<a
						class="inline"
						href="https://github.com/ilyasemenov1/Weather_application_v1.4x_stable"
						target="_blank"
						>Ветка v1.4x - vanilla JS</a
					>
				</li>
				<li>
					<a
						class="inline"
						href="https://github.com/ilyasemenov1/Weather_application_v1.3x_stable"
						target="_blank"
						>Ветка v1.3x</a
					>
				</li>
			</ul>
			<h2>Есть идеи?</h2>
			<ul>
				<li>
					<a
						class="inline"
						href="https://mail.google.com/mail/?view=cm&fs=1&to=sialogacc@gmail.com&su=SUBJECT&body=BODY"
						target="_blank"
						>Почта</a
					>
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
					<a
						class="inline"
						href="https://github.com/ilyasemenov1/Weather_application_v1.4x_vue/upload/master"
						target="_blank"
						>Отправьте пул реквест на GitHub</a
					>
				</li>
			</ul>
		</template>
		<template #footer>
			<footer class="license">
				<a
					href="https://github.com/ilyasemenov1/Weather_application_v1.4x_vue/blob/master/LICENSE"
					class="license__link inline"
					target="_blank"
					>MIT License</a
				>
				<span>©2024 Ilya Semenov</span>
			</footer>
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
.license {
	position: relative;
	display: flex;
	justify-content: space-between;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 10px 20px;
	/* For old browsers */
	background: var(--bg-color-1);
	background: color-mix(in srgb, var(--bg-color-1), #ffffff17);
	box-shadow: 0 0 10px #00000017;
}
.license a {
	font-weight: 500;
}
.license span {
	font-weight: 500;
	color: var(--text-color-1);
}
</style>
