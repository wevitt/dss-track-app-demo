<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import LoginForm from '@/components/LoginForm.vue'
  import Dashboard from '@/components/Dashboard.vue'
  const routes = {
    '/': LoginForm,
    '/dashboard': Dashboard
  }

  const currentPath = ref(window.location.hash)
  const currentView = computed(() => {
    const hash = currentPath.value.slice(1) || '/'
    return (routes as any)[hash]
  })

  onMounted(() => {
    window.addEventListener('hashchange', () => {
		  currentPath.value = window.location.hash
		})
  })
</script>

<template>
  <div>
    <a href="#" target="_blank">
      <img src="/dssgroup.svg" class="logo" alt="DSS Group logo" />
    </a>
  </div>
  <component :is="currentView" />
</template>

<style scoped>
.logo {
  height: 300px;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 6em #ffffff);
}
</style>
