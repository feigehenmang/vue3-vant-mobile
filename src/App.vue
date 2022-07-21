<template>
  <van-config-provider :theme-vars="themeVars" :theme="theme">
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ConfigProviderTheme } from 'vant'
import { localStorage } from '@/utils/local-storage'
import { useStore, useThemeStore } from '@/stores'

const store = useStore()
const theme = ref<ConfigProviderTheme>('light')
const mode = computed(() => store.mode)
const themeStore = useThemeStore()
const themeVars = computed(() => themeStore.theme)
watch(mode, (val) => {
  if(val === 'dark' || localStorage.get('theme') === 'dark') {
    theme.value = 'dark'
    document.querySelector('html')
    .setAttribute('data-theme', 'dark')
  } else {
    theme.value = 'light'
    document.querySelector('html')
    .setAttribute('data-theme', 'light')
  }
}, { immediate: true })

</script>
