<script setup lang="ts">
const props = defineProps({
  id: String,
})

const emit = defineEmits(['submit'])
const dialog = ref(false)
const errorMessage = ref()

watch(dialog, async newX => {
  if (newX)
    errorMessage.value = ''
})

async function submit() {
  try {
    await $fetch(`/api/invoice/${props.id}/bayar`, {
      method: 'POST',
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
          v-bind="activatorProps"
          size="small"
          variant="tonal"
          color="warning"
        >
          Sudah bayar?
        </VBtn>
      </template>

      <VCard
        prepend-icon="bx-credit-card"
        text="Anda yakin sudah membayar tagihan ini?"
        title="Bayar Tagihan"
      >
        <VAlert
          v-if="errorMessage"
          color="error"
          class="mt-2"
        >
          {{ errorMessage }}
        </VAlert>
        <VSpacer />
        <VCardActions>
          <VSpacer />

          <VBtn
            text="Tidak"
            variant="plain"
            @click="dialog = false"
          />

          <VBtn
            color="primary"
            text="Ya"
            variant="tonal"
            @click="submit"
          />
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
