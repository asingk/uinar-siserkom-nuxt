<script setup lang="ts">
import type Keycloak from 'keycloak-js'
import { useKeycloakStore } from '@/stores/keycloak'

interface JenisInvoice {
  id: number
  nama: string
}

const emit = defineEmits(['submit'])
const dialog = ref(false)
const jenisInvoiceItem = ref()
const jenisId = ref<number>()
const errorMessage = ref('')

const nuxtApp = useNuxtApp()
const keycloak = nuxtApp.$keycloak as Keycloak

const nim = ref('')
const keycloakStore = useKeycloakStore()

nim.value = keycloakStore.nim

watch(dialog, async newX => {
  if (newX) {
    errorMessage.value = ''
    jenisId.value = undefined

    const { data } = await useFetch<JenisInvoice[]>('api/jenis-invoice')

    jenisInvoiceItem.value = data.value.jenisInvoice
  }
})

async function submit() {
  try {
    await $fetch(`/api/mahasiswa/${nim.value}/invoice`, {
      method: 'POST',
      headers: {
        token: `${keycloak.token}`,
      },
      body: {
        jenisInvoice: jenisId.value,
      },
    })
    dialog.value = false
    emit('submit')
  }
  catch (error: any) {
    errorMessage.value = error.data.data.message
  }
}
</script>

<template>
  <div class="pa-2 ma-4">
    <VDialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">
        <VBtn v-bind="activatorProps">
          Buat Tagihan
          <VIcon
            end
            icon="bx-plus-circle"
          />
        </VBtn>
      </template>

      <VCard
        prepend-icon="bx-plus-circle"
        title="Buat Tagihan"
      >
        <VCardText>
          <VRow dense>
            <VCol cols="12">
              <VSelect
                v-model="jenisId"
                :items="jenisInvoiceItem"
                label="Jenis Tagihan*"
                item-title="nama"
                item-value="id"
                required
              />
            </VCol>
          </VRow>
          <small class="text-caption text-medium-emphasis">*wajib diisi</small>
          <VAlert
            v-if="errorMessage"
            color="error"
            class="mt-2"
          >
            {{ errorMessage }}
          </VAlert>
        </VCardText>

        <VDivider />

        <VCardActions>
          <VSpacer />

          <VBtn
            text="Close"
            variant="plain"
            @click="dialog = false"
          />

          <VBtn
            color="primary"
            text="Save"
            variant="tonal"
            @click="submit"
          />
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
