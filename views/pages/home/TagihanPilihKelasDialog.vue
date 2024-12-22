<script setup lang="ts">
import { useKeycloakStore } from '@/stores/keycloak'
import type { Kelas } from '@/types/kelas'

const props = defineProps({
  id: String,
  idJenis: Number,
  namaJenis: String,
})

const emit = defineEmits(['submit'])
const dialog = ref(false)
const kelasItem = ref()
const kelasBaruId = ref()
const errorMessage = ref('')

const nim = ref('')
const keycloakStore = useKeycloakStore()

nim.value = keycloakStore.nim

watch(dialog, async newX => {
  if (newX) {
    const { data } = await useFetch<Kelas[]>('/api/kelas/available', {
      query: { jenisInvoice: props.idJenis },
    })

    kelasItem.value = data?.value?.map(row => ({ value: row.id, title: `${row.id} | ${row.tanggal} | ${row.jam.substring(0, 5)} WIB` }))
    errorMessage.value = ''
  }
})

async function submit() {
  try {
    await $fetch(`/api/invoice/${props.id}/kelas/${kelasBaruId.value}/pilih`, {
      method: 'POST',
      body: {
        updatedBy: nim.value,
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
  <div>
    <VDialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">
        <VBtn
          color="warning"
          v-bind="activatorProps"
        >
          Pilih Kelas
        </VBtn>
      </template>

      <VCard
        prepend-icon="bx-edit-alt"
        :title="`Pilih Kelas ${props.namaJenis}`"
      >
        <VCardText>
          <VRow dense>
            <VCol cols="12">
              <VSelect
                v-model="kelasBaruId"
                :items="kelasItem"
                label="Kelas*"
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
