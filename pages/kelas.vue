<script setup lang="ts">
import KelasTable from '@/views/pages/kelas/KelasTable.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Kelas">
        <VCardText>Daftar kelas yang tersedia</VCardText>
        <KelasTable />
      </VCard>
    </VCol>
  </VRow>
</template>
