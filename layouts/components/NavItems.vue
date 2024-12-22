<script lang="ts" setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <VerticalNavLink
    :item="{
      title: 'Beranda',
      icon: 'bx-user',
      to: '/home',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Kelas',
      icon: 'bx-bell',
      to: '/kelas',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Mata Kuliah',
      icon: 'bx-log-in',
      to: '/matakuliah',
    }"
  />
</template>
