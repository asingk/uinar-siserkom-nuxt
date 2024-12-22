<script lang="ts" setup>
import { useKeycloakStore } from '@/stores/keycloak'

interface Mahasiswa {
  nim: string
  nama: string
  prodi: string
  certificateNo: string
}

const runtimeConfig = useRuntimeConfig()

const nim = ref('')
const keycloakStore = useKeycloakStore()

nim.value = keycloakStore.nim

const loadings = ref<boolean>(false)
const errorMessage = ref()

const { data: mhs, refresh } = await useFetch<Mahasiswa>(`/api/mahasiswa/${nim.value}`)

async function submit() {
  loadings.value = true
  errorMessage.value = ''

  try {
    await $fetch(`/api/mahasiswa/${nim.value}/sertifikat`, {
      method: 'POST',
    })
  }
  catch (error: any) {
    errorMessage.value = error.data.data.message
  }
  loadings.value = false
  await refresh()
}
</script>

<template>
  <VRow justify="center">
    <VCol cols="12">
      <VCard>
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              sm="2"
            >
              <div>
                <label>Nama</label>
              </div>
            </VCol>
            <VCol
              cols="12"
              sm="10"
            >
              <div>
                {{ mhs?.nama }}
              </div>
            </VCol>
            <VCol
              cols="12"
              sm="2"
            >
              <div>
                <label>NIM</label>
              </div>
            </VCol>
            <VCol
              cols="12"
              sm="10"
            >
              <div>
                {{ nim }}
              </div>
            </VCol>
            <VCol
              cols="12"
              sm="2"
            >
              <div>
                <label>Program Studi</label>
              </div>
            </VCol>
            <VCol
              cols="12"
              sm="10"
            >
              <div>
                {{ mhs?.prodi }}
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
    <!-- 👉 Apple Watch card -->
    <VCol
      v-if="mhs?.certificateNo"
      sm="6"
      cols="12"
    >
      <VCard>
        <VImg :src="`${runtimeConfig.public.cdnSiserkom}/${mhs.certificateNo}.jpg`" />
        <VBtn
          block
          class="rounded-t-0"
          :href="`${runtimeConfig.public.cdnSiserkom}/${mhs.certificateNo}.jpg`"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </VBtn>
      </VCard>
    </VCol>
    <VCol
      v-else
      cols="12"
      sm="4"
      md="12"
      lg="5"
      order="1"
      order-lg="2"
      class="member-pricing-bg text-center"
    >
      <div class="membership-pricing d-flex flex-column align-center py-14 h-100 justify-center">
        <p>
          Belum ada sertifikat
        </p>

        <VBtn
          class="mt-8"
          :loading="loadings"
          :disabled="loadings"
          @click="submit"
        >
          Cetak Sertifikat
        </VBtn>
        <VAlert
          v-if="errorMessage"
          color="error"
          icon="$error"
          class="mt-2"
        >
          {{ errorMessage }}
        </VAlert>
      </div>
    </VCol>
  </VRow>
</template>
