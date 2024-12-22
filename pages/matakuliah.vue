<script setup lang="ts">
import MataKuliahTable from '@/views/pages/matakuliah/MatakuliahTable.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Mata Kuliah">
        <VCardText>Daftar mata kuliah komputer yang diakui untuk mendapatkan sertifikat komputer tanpa harus ikut ujian sertifikasi komputer PTIPD</VCardText>
        <MataKuliahTable />
      </VCard>
    </VCol>
  </VRow>
</template>
