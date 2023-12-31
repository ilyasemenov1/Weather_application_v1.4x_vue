<script setup>
import Settings from './settings/Settings.vue'
import FavouriteTows from './favoutite-towns/FavouriteTows.vue'
import About from './about/About.vue'
import SettingsIcon from '../../icons/SettingsIcon.vue'
import HeartIcon from '../../icons/HeartIcon.vue'
import InfoIcon from '../../icons/InfoIcon.vue'

import { settingsStore } from '@/stores/settings.js'
import { mainData } from '@/stores/mainData.js'
import { burgerMenuDataStore } from '@/stores/burgerMenu.js'
import { storeToRefs } from 'pinia'

import { onMounted, ref, watch } from 'vue'

const storeSettings = settingsStore()
const { settings } = storeToRefs(storeSettings)

const menuStore = burgerMenuDataStore()
let { isMenuOpen, isMenuArrowMode } = storeToRefs(menuStore)

const store = mainData()
const { weatherData, isShowSearchErr, isGeolocationErr, isNetworkErr } = storeToRefs(store)

let header = document.querySelector('.header')
let headerContent = document.querySelector('.header-content')
let pageContent = ''

// !Mutable (once) in OnMounted()!
let modalMenuWidth = 0
let burgerWidth = 0

const padding = 15
const burger = ref(null)
const mainMenu = ref(null)
let menu = ''

let isPageBlurActive = ref(false)
let burgerMenuButtonPositionX = ref(0)
let burgerMenuButtonPositionY = ref(0)
let burgerMenuButtonTransformX = ref(0)
let burgerMenuButtonTransformY = ref(0)

let isVerticalScrollbar = ref(false)
let verticalScrollbarWidth = ref(0)

// !Mutable (once) in setMenuPosition()!
let headerWidth = 0
let headerHeight = 0
let headerContentwidth = 0
let headerContentHeight = 0
let headerLeft = 0
let headerTop = 0

function setOpenMenuTransform() {
	if (window.innerWidth > 768) {
		burgerMenuButtonTransformX.value =
			-menu.clientWidth + 65 + (headerWidth - headerContentwidth) / 2 + verticalScrollbarWidth.value;
		burgerMenuButtonTransformY.value = 0
	} else {
		burgerMenuButtonTransformX.value = 0
		burgerMenuButtonTransformY.value = 0
	}
}

function setArrowModeMenuPositon() {
	if (window.innerWidth > 768) {
		burgerMenuButtonTransformX.value =
			-modalMenuWidth +
			padding +
			burgerWidth +
			headerLeft +
			(headerWidth - headerContentwidth) / 2 +
			15 + verticalScrollbarWidth.value;
	} else {
		burgerMenuButtonTransformX.value = -modalMenuWidth + padding + burgerWidth + 15
	}
}

function changeMenuState() {
	const { isVerticalScrollbarF, verticalScrollbarWidthF } = detectVericalScrollbar();
	isVerticalScrollbar.value = isVerticalScrollbarF
	verticalScrollbarWidth.value = verticalScrollbarWidthF
	if (isMenuArrowMode.value) {
		// From arrow to open mode
		isMenuArrowMode.value = false
		isMenuOpen.value = true
		isPageBlurActive.value = true
		closeMenuSelect()
		setOpenMenuTransform()
		setPageContentTransformX(-menu.clientWidth)
	} else if (isMenuOpen.value) {
		// From open to default mode
		closeMenu()
	} else if (!isMenuOpen.value && !isMenuArrowMode.value) {
		// From default to open mode
		isMenuOpen.value = true
		isPageBlurActive.value = true
		setOpenMenuTransform()
		setPageContentTransformX(-menu.clientWidth)
	}
}

function setMenuPosition(burgerElement) {
	headerWidth = header.clientWidth
	headerHeight = header.clientHeight
	headerContentwidth = headerContent.clientWidth
	headerContentHeight = headerContent.clientHeight
	headerLeft = header.clientLeft
	headerTop = header.clientTop

	burgerMenuButtonPositionX.value =
		headerWidth - padding - burgerWidth - headerLeft - (headerWidth - headerContentwidth) / 2
	burgerMenuButtonPositionY.value = headerHeight - burgerElement.clientHeight + headerTop
}

function openSelectedMenu(event) {
	if (event.target.className != 'main-menu__button') return

	isMenuArrowMode.value = true
	let id = event.target.dataset.selectId
	let modalMenu = document.getElementById(id)
	modalMenu.classList.add('active')

	setArrowModeMenuPositon()
	setPageContentTransformX(-modalMenuWidth)
}

function closeMenuSelect() {
	let element = document.querySelectorAll('.level2-menu')
	element.forEach((element) => {
		element.classList.remove('active')
	})
}

function closeMenu() {
	burgerMenuButtonTransformX.value = 0
	burgerMenuButtonTransformY.value = 0
	isMenuArrowMode.value = false
	isMenuOpen.value = false
	isPageBlurActive.value = false

	closeMenuSelect()
	setPageContentTransformX(0)
}

function setPageContentTransformX(transformValue) {
	if (settings.value['menuAnimation'] && transformValue < 0) return
	pageContent.forEach((element) => {
		element.style = `left: ${transformValue}px;`
	})
}

onMounted(() => {
	header = document.querySelector('.header')
	headerContent = document.querySelector('.header-content')

	const pageBlur = document.querySelectorAll('.page-blur')
	pageContent = document.querySelectorAll(
		'.header, .main, .footer, .error-notification__label, .loading-animation--conteiner, .error-notification__button'
	)

	modalMenuWidth = document.querySelector('.level2-menu').clientWidth
	burgerWidth = burger.value.clientWidth
	menu = mainMenu.value

	setMenuPosition(burger.value)
	window.addEventListener('resize', () => {
		setMenuPosition(burger.value)
		modalMenuWidth = document.querySelector('.level2-menu').clientWidth

		if (isMenuArrowMode.value) {
			setArrowModeMenuPositon()
			setPageContentTransformX(-modalMenuWidth)
		} else if (isMenuOpen.value) {
			setOpenMenuTransform()
			setPageContentTransformX(-menu.clientWidth)
		}
	})

	pageBlur.forEach((element) => {
		element.addEventListener('click', () => {
			closeMenu()
		})
	})

	window.addEventListener('keydown', (event) => {
		if (event.keyCode == 27) {
			if (!isMenuOpen.value) return
			changeMenuState()
		}
	})
})

let isBurgerScrolled = ref(false)

const pageScroll = 195

function pageScrolled(scroll) {
	const header = document.querySelector('.header')
	const burgerTop = Math.round(header.clientHeight / 2 - burger.value.clientHeight / 2 - 1)

	if (
		!settings.value['fixHeader'] ||
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		isBurgerScrolled.value = false
		burger.value.style.top = `${burgerTop}px`
		return
	}

	if (
		window.pageYOffset < header.clientHeight + pageScroll &&
		window.pageYOffset > pageScroll - header.clientHeight
	) {
		//TODO: Change to burgerMenuButtonPositionY
		burger.value.style.top = `${
			window.pageYOffset - pageScroll - burger.value.clientHeight - burgerTop
		}px`
	} else if (window.pageYOffset < header.clientHeight + pageScroll) {
		burger.value.style.top = `${-window.pageYOffset + burgerTop}px`
	} else {
		burger.value.style.top = `${burgerTop}px`
	}

	if (window.pageYOffset < scroll) {
		isBurgerScrolled.value = false
	} else if (window.pageYOffset > scroll) {
		isBurgerScrolled.value = true
	}
}

function detectVericalScrollbar() {
	const root = document.compatMode =='BackCompat' ? document.body : document.documentElement
	const isVerticalScrollbarF = root.scrollHeight > root.clientHeight
	const verticalScrollbarWidthF = window.innerWidth - document.documentElement.clientWidth
	return { isVerticalScrollbarF, verticalScrollbarWidthF }
}

function updateScrollbarPosition() {
	setTimeout(() => {
		const { isVerticalScrollbarF, verticalScrollbarWidthF } = detectVericalScrollbar();
		isVerticalScrollbar.value = isVerticalScrollbarF
		verticalScrollbarWidth.value = verticalScrollbarWidthF
		setMenuPosition(burger.value);
	}, 25)
} 

onMounted(() => {
	pageScrolled(100)
	window.addEventListener('scroll', () => {
		pageScrolled(100)
	})
})

watch(settings.value, () => {
	pageScrolled(100)
})

watch(isMenuOpen, () => {
	setTimeout(() => {
		isMenuOpen.value ? (document.body.style = 'overflow: hidden;') : (document.body.style = '')
	}, 50)
	if (!isMenuOpen.value) {
		closeMenu()
		pageScrolled(100)
	} else {
		burger.value.style.top = '15px'
	}
})


watch(isShowSearchErr, updateScrollbarPosition)
watch(isGeolocationErr, updateScrollbarPosition)
watch(isNetworkErr, updateScrollbarPosition)
watch(weatherData,updateScrollbarPosition)
</script>

<template>
	<button
		class="burger-menu-button"
		ref="burger"
		@click="changeMenuState()"
		:class="{ active: isMenuOpen, arrow: isMenuArrowMode, scrolled: isBurgerScrolled }"
		:style="{
			top: `{${burgerMenuButtonPositionY}px`,
			left: `${burgerMenuButtonPositionX}px`,
			transform: `translate(${burgerMenuButtonTransformX}px, ${burgerMenuButtonTransformY}px)`
		}"
		:aria-label="
			!isMenuOpen
				? 'Открыть меню'
				: !isMenuArrowMode && isMenuOpen
				? 'Закрыть меню'
				: 'Закрыть раздел'
		"
	>
		<span class="burger"></span>
	</button>
	<div
		class="main-menu"
		:class="{ active: isMenuOpen, 'not-visible': isMenuArrowMode }"
		ref="mainMenu"
	>
		<h2 class="main-menu__label">Главное меню</h2>
		<div class="main-menu__content" @click="(event) => openSelectedMenu(event)">
			<button class="main-menu__button" data-select-id="settings" aria-label="Настройки">
				<div class="main-menu__button-icon">
					<SettingsIcon />
				</div>
				<span>Настройки</span>
			</button>
			<button
				class="main-menu__button"
				data-select-id="favourite-towns"
				aria-label="Избранные города"
			>
				<div class="main-menu__button-icon">
					<HeartIcon />
				</div>
				<span>Избранные города</span>
			</button>
			<button class="main-menu__button" data-select-id="about" aria-label="О приложении">
				<div class="main-menu__button-icon">
					<InfoIcon />
				</div>
				<span>О приложении</span>
			</button>
		</div>
	</div>
	<div class="page-blur" :class="{ active: isPageBlurActive }"></div>
	<Settings />
	<FavouriteTows />
	<About />
</template>

<style scoped>
.burger-menu-button {
	position: absolute;
	top: 15px;
	right: 30px;
	width: 40px;
	height: 40px;
	border: 1px solid #ffffff00;
	border-radius: 100%;
	background: none;
	background-size: 28px 28px;
	animation: main-block-add 0.3s ease;
	transition:
		background 0.3s ease,
		border 0.3s ease,
		transform 0.3s ease,
		opacity 0.3s ease;
	z-index: 300;
}
.burger-menu-button.scrolled {
	position: fixed;
}
.burger-menu-button span {
	position: absolute;
	width: calc(100% - 24px);
	left: 16px;
	height: 3px;
	border-radius: 5px;
	background: var(--bg-color-13);
	transition: 0.2s ease;
}
.burger-menu-button span::before,
.burger-menu-button span::after {
	position: absolute;
	content: '';
	height: 3px;
	border-radius: 5px;
	background: var(--bg-color-13);
	transition: 0.2s ease;
}
.burger-menu-button span::before {
	width: calc(100% + 5px);
	top: -8px;
	left: -5px;
}
.burger-menu-button span::after {
	width: calc(100% + 7px);
	left: -7px;
	top: 8px;
}
.burger-menu-button.active span {
	background: rgba(0, 0, 0, 0);
	transform: translateX(-10px);
}
.burger-menu-button.active span::before,
.burger-menu-button.active span::after {
	transform: translateX(10px);
	width: calc(100% + 12px);
	left: 0px;
	top: -1px;
}
.burger-menu-button.active span::before {
	transform: rotate(45deg);
}
.burger-menu-button.active span::after {
	transform: rotate(-45deg);
}

.burger-menu-button.arrow span {
	transform: translateX(0px);
	width: 20px;
	top: 19px;
	left: 12px;
	background: var(--bg-color-13);
}
.burger-menu-button.arrow span::before,
.burger-menu-button.arrow span::after {
	transform: translateX(10px);
	width: calc(100% - 4px);
	left: 0px;
	top: 0px;
}
.burger-menu-button.arrow span::before {
	transform: rotate(45deg);
}
.burger-menu-button.arrow span::after {
	transform: rotate(-45deg);
}
.burger-menu-button.arrow span::before {
	top: 5px;
	left: -5px;
}
.burger-menu-button.arrow span::after {
	top: -5px;
	left: -5px;
}
.burger-menu-button:hover,
.burger-menu-button:focus-visible {
	cursor: pointer;
	background-color: var(--bg-color-12);
	border: 1px solid var(--border-color-1);
}
.main-menu {
	position: fixed;
	top: 0;
	display: flex;
	flex-direction: column;
	gap: 17px;
	left: calc(100% - 300px);
	background: var(--bg-color-1);
	width: 300px;
	height: 100vh;
	padding: 10px;
	z-index: 51;
	pointer-events: none;
	transform: translateX(300px);
	visibility: hidden;
	transition: 0.3s ease;
	box-sizing: border-box;
	@media (max-width: 768px) {
		position: fixed;
		top: 0;
		left: 0vw;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		border-radius: 0px;
		background: var(--bg-color-1);
		opacity: 1;
		transform: translateX(100%);
	}
}
.main-menu__label {
	position: relative;
	top: 8px;
	margin: 0px 0 0 45px;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 27px;
	font-weight: 700;
	color: var(--text-color-1);
	@media (max-width: 768px) {
		display: none;
	}
}
.main-menu__content {
	display: flex;
	flex-direction: column;
}
.main-menu__button {
	position: relative;
	display: flex;
	align-items: center;
	gap: 5px;
	width: 100%;
	padding: 7px;
	border-radius: 10px;
	border: none;
	background: none;
	text-align: left;
	font-family: 'Sourse Sans Pro', sans-serif;
	font-size: 20px;
	font-weight: 600;
	color: var(--text-color-1);
	transition: 0.2s ease;
	box-sizing: border-box;
	@media (max-width: 768px) {
		width: auto;
		font-size: 25px;
		text-transform: uppercase;
		line-height: 33px;
	}
}
.main-menu__button span,
.main-menu__button svg {
	pointer-events: none;
}
.main-menu__button > div {
	position: relative;
	top: 1px;
	width: 22px;
	height: 22px;
	@media (max-width: 768px) {
		display: none;
	}
}
.main-menu__button svg {
	position: absolute;
	top: 0;
	left: 0;
	width: inherit;
	height: inherit;
	fill: var(--text-color-1);
}
.main-menu__button:hover,
.main-menu__button:focus {
	cursor: pointer;
	background: var(--bg-color-12);
}
.main-menu__button:active {
	transform: scale(0.97);
}
.main-menu.active {
	box-shadow: 0px 0px 18px #00000021;
	transform: translateX(0px);
	pointer-events: all;
	visibility: visible;
}
.main-menu.not-visible {
	visibility: hidden;
}
.main-menu__button-icon {
	pointer-events: none;
}
</style>
