<script setup>
import errorSectionRoot from './errorSectionRoot.vue'
import NoConnectionIcon from '../../icons/NoConnectionIcon.vue'

import { mainData } from '@/stores/mainData.js'
import { storeToRefs } from 'pinia'

let store = mainData()
let { isNetworkErr } = storeToRefs(store)
</script>
<template>
	<errorSectionRoot :class="{ disactive: !isNetworkErr }">
		<template #label-content>
			<div class="error-notification__icon">
				<span>
					<NoConnectionIcon />
				</span>
			</div>
			<h2 class="error-notification__text">Нет подключения к интернету</h2>
		</template>
	</errorSectionRoot>
</template>

<style scoped>
.error-notification__icon {
	display: flex;
	justify-content: center;
}
.error-notification__icon span {
	position: relative;
	width: 105px;
	height: 105px;
}
.error-notification__icon span svg {
	position: absolute;
	left: -11px;
	top: 0;
	width: 100%;
	height: 100%;
	fill: var(--text-color-1);
}
.error-notification__text {
	margin: 0;
	font-size: 25px;
}
.content {
	display: flex;
	align-items: center;
	gap: 5px;
}
.icon {
	position: relative;
	left: -3px;
	width: 17px;
	height: 17px;
}
.icon svg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	fill: var(--text-color-1);
}
.error-notification__button {
	position: relative;
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 5px 15px;
	border: none;
	border-radius: 20px;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-weight: 600;
	font-size: 17px;
	background: var(--bg-color-1);
	box-shadow: 0px 2px 8px #00000020;
	color: var(--text-color-1);
	transition: 0.2s ease;
}
.error-notification__button:hover,
.error-notification__button:focus-visible {
	cursor: pointer;
	box-shadow: 0px 2px 12px #0000001b;
	transform: translateY(-3px);
}
</style>
