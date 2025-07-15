<script lang="ts" setup>
import type Keycloak from 'keycloak-js'
import { useKeycloakStore } from '@/stores/keycloak'

const nim = ref('')
const keycloakStore = useKeycloakStore()

const nuxtApp = useNuxtApp()
const keycloak = nuxtApp.$keycloak as Keycloak

nim.value = keycloakStore.nim

const matkul = ref()

const { data } = await useFetch(`/api/mahasiswa/${nim.value}/matakuliah`)

matkul.value = data.value.matakuliahMahasiswa

const loadings = ref<boolean>(false)

async function cekUlang() {
  loadings.value = true

  matkul.value = await $fetch(`/api/mahasiswa/${nim.value}/matakuliah`, {
    method: 'POST',
    headers: {
      token: `${keycloak.token}`,
    },
  })
  loadings.value = false
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Mata Kuliah Saya">
        <VCardText>Daftar mata kuliah komputer saya yang diakui bisa mendapatkan sertifikat komputer tanpa harus ikut ujian sertifikasi komputer PTIPD</VCardText>
        <VBtn
          class="ma-4"
          :loading="loadings"
          :disabled="loadings"
          color="primary"
          @click="cekUlang"
        >
          Cek MK Komputer Saya
          <VIcon
            end
            icon="bx-revision"
          />
        </VBtn>
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th>
                kode
              </th>
              <th>
                nama
              </th>
              <th>
                Nilai
              </th>
              <th>
                Lulus
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="device in matkul"
              :key="device.type"
            >
              <td>
                {{ device.kodeMataKuliah }}
              </td>
              <td>
                {{ device.namaMataKuliah }}
              </td>
              <td>
                {{ device.nilai }}
              </td>
              <td>
                <i
                  v-if="device.isLulus"
                  class="bx bx-check-shield"
                  style="color: green"
                />
                <i
                  v-else
                  class="bx bx-x-circle"
                  style="color: red"
                />
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
