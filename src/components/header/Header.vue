<script setup>
import { ref, onMounted, watch } from 'vue'

import Logo from './Logo.vue'
import CitySearch from './CitySearch.vue'
import BurgerMenu from './overflowMenu/BurgerMenu.vue'

import { settingsStore } from '@/stores/settings.js'
import { storeToRefs } from 'pinia'

const storeSettings = settingsStore()
const { settings } = storeToRefs(storeSettings)

let header = ref(null)
let isHeaderScrolled = ref(false)

const pageScroll = 195

function pageScrolled(scroll) {
  if (
    !settings.value['fixHeader'] ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isHeaderScrolled.value = false
    return
  }

  if (window.pageYOffset < scroll) {
    isHeaderScrolled.value = false
    header.value.style.top = `0px`
  } else if (window.pageYOffset > scroll) {
    isHeaderScrolled.value = true
    if (-(header.value.clientHeight - (window.pageYOffset - pageScroll)) <= 0) {
      header.value.style.top = `${-(
        header.value.clientHeight -
        (window.pageYOffset - pageScroll)
      )}px`
    } else if (header.value.style.top.split('px')[0] < 0) {
      header.value.style.top = `0px`
    }
  }
}

watch(settings.value, () => {
  pageScrolled(100)
})

onMounted(() => {
  pageScrolled(100)
  window.addEventListener('scroll', () => {
    pageScrolled(100)
  })
})
</script>

<template>
  <header class="header" ref="header" :class="{ scrolled: isHeaderScrolled }">
    <div class="header-content" ref="headerContent">
      <div class="header-blocks">
        <Logo> Погода </Logo>
        <CitySearch></CitySearch>
      </div>
    </div>
  </header>
  <BurgerMenu></BurgerMenu>
</template>

<style scoped>
.header {
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 70px;
  margin: 0 auto;
  padding: 10px 0;
  box-shadow: 0px 0px 15px #00000015;
  background: var(--bg-color-1);
  z-index: 9;
  transition: left ease 0.3s;
  box-sizing: border-box;
}
.header.scrolled {
  position: fixed;
  min-height: 60px;
  padding: 8px 20px;
  box-shadow: 0px 0px 18px #00000025;
}
@keyframes headerScrolled {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes headerNotScrolled {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
  max-width: 1440px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.header-blocks {
  display: flex;
  align-items: center;
  column-gap: 100px;
  width: 100%;
}
</style>
