<script lang="ts" setup>
import { useKeycloakStore } from '@/stores/keycloak'
import TagihanTambahDialog from '@/views/pages/home/TagihanTambahDialog.vue'
import TagihanBayarDialog from '@/views/pages/home/TagihanBayarDialog.vue'
import TagihanPilihKelasDialog from '@/views/pages/home/TagihanPilihKelasDialog.vue'
import type { InvoiceList } from '@/types/invoice'

const invoiceList = ref()

const nim = ref('')
const keycloakStore = useKeycloakStore()

nim.value = keycloakStore.nim

const { data, refresh } = await useFetch<InvoiceList>(`/api/mahasiswa/${nim.value}/invoice`)

watchEffect(() => {
  invoiceList.value = data?.value?._embedded?.invoiceModelList
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Daftar Tagihan Saya">
        <TagihanTambahDialog @submit="refresh" />
        <VCardText class="d-flex flex-column gap-y-4">
          <div
            v-for="invoice in invoiceList"
            :key="invoice.id"
            class="bg-var-theme-background pa-4"
          >
            <div class="d-flex align-center flex-wrap mb-3">
              <h6 class="text-h6 mb-0 me-3">
                {{ invoice.id }}
              </h6>
              <VChip
                v-if="invoice.isSudahBayar"
                label
                color="success"
                size="small"
              >
                Lunas
              </VChip>
              <div v-else>
                <TagihanBayarDialog
                  :id="invoice.id"
                  @submit="refresh"
                />
              </div>
            </div>
            <p class="text-base font-weight-medium">
              <span class="me-3">{{ invoice.namaJenis }}</span>
            </p>
            <p>
              <span>Tagihan dibuat pada {{ invoice.createdAt.split('T')[0] }} {{ invoice.createdAt.split('T')[1].substring(0, 5) }}</span>
            </p>
            <div v-if="invoice.idKelas">
              <p class="text-base font-weight-medium">
                <span class="me-3">Kelas: {{ invoice.kelas.id }}</span>
              </p>
              <p class="text-base font-weight-medium">
                <span class="me-3">Waktu: {{ invoice.kelas.tanggal }} {{ invoice.kelas.jam.substring(0, 5) }}</span>
              </p>
              <p class="text-base font-weight-medium">
                <span class="me-3">{{ invoice.idJenis === 1 ? 'Pengajar' : 'Penguji' }}: {{ invoice.kelas.namaPengajar }}</span>
              </p>
            </div>
            <TagihanPilihKelasDialog
              v-else-if="invoice.isSudahBayar && [1, 2].includes(invoice.idJenis)"
              :id="invoice.id"
              :id-jenis="invoice.idJenis"
              :nama-jenis="invoice.namaJenis"
              @submit="refresh"
            />
            <VAlert
              v-if="!invoice.isSudahBayar"
              prominent
              type="info"
            >
              Tagihan akan muncul pada aplikasi siakad cloud atau edlink setelah 1 hari kerja.
            </VAlert>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
