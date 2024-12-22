<script lang="ts" setup>
import HomeProfil from '@/views/pages/home/HomeProfil.vue'
import HomeTagihan from '@/views/pages/home/HomeTagihan.vue'
import HomeMataKuliah from '@/views/pages/home/HomeMataKuliah.vue'

const route = useRoute()

const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  { title: 'Profil', icon: 'bx-user', tab: 'profil' },
  { title: 'Tagihan', icon: 'bx-lock-open', tab: 'tagihan' },
  { title: 'Mata Kuliah', icon: 'bx-log-in', tab: 'matakuliah' },
]
</script>

<template>
  <div>
    <VTabs
      v-model="activeTab"
      show-arrows
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-5 disable-tab-transition"
    >
      <!-- Profil -->
      <VWindowItem value="profil">
        <HomeProfil />
      </VWindowItem>

      <!-- Tagihan -->
      <VWindowItem value="tagihan">
        <HomeTagihan />
      </VWindowItem>

      <!-- Mata Kuliah -->
      <VWindowItem value="matakuliah">
        <HomeMataKuliah />
      </VWindowItem>
    </VWindow>
  </div>
</template>
