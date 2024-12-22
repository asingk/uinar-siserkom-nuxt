<script setup lang="ts">
import type { Kelas } from '@/types/kelas'

const { data } = await useFetch<Kelas[]>('/api/kelas/available')
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th>
          Unit
        </th>
        <th>
          Tanggal
        </th>
        <th>
          Pukul
        </th>
        <th>
          Jenis
        </th>
        <th>
          Pengajar
        </th>
        <th>
          Daya Tampung
        </th>
        <th>
          Terisi
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in data"
        :key="item.id"
      >
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ item.tanggal }}
        </td>
        <td>
          {{ item.jam.substring(0, 5) }}
        </td>
        <td>
          {{ item.namaJenis }}
        </td>
        <td>
          {{ item.namaPengajar }}
        </td>
        <td>
          {{ item.dayaTampung }}
        </td>
        <td>
          <span
            v-if="item.isPenuh"
            style="color: red"
          >{{ item.isi }}</span>
          <span
            v-else
            style="color: lawngreen"
          >{{ item.isi }}</span>
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
