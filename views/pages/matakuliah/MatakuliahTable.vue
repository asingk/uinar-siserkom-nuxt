<script setup lang="ts">
const page = ref(1)
const searchString = ref('')
const debouncedSearchString = ref('')
const matkulList = ref()

const debouncedFn = useDebounceFn(newVal => {
  debouncedSearchString.value = newVal
  page.value = 1
}, 1000, { maxWait: 5000 })

watch(searchString, newVal => {
  debouncedFn(newVal)
})

interface Matakuliah {
  id: string
  nama: string
}

interface MatakuliahList {
  _embedded: {
    mataKuliahModelList: Matakuliah[]
  }
  page: {
    totalPages: number
  }
}

const url = computed(() => {
  return `/api/matakuliah?page=${page.value - 1}&size=20&searchString=${debouncedSearchString.value}&disabled=false`
})

const { data } = await useFetch<MatakuliahList>(url)

watchEffect(() => {
  console.log(page.value)
  matkulList.value = data?.value?._embedded?.mataKuliahModelList
})
</script>

<template>
  <VRow justify="end">
    <VCol
      cols="12"
      md="6"
      lg="4"
    >
      <VTextField
        v-model="searchString"
        label="Cari Kode / Nama"
        append-inner-icon="bx-search"
        class="ma-2"
      />
    </VCol>
  </VRow>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          Kode
        </th>
        <th>
          Nama
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in matkulList"
        :key="item.id"
      >
        <td>
          {{ item.id }}
        </td>
        <td>
          {{ item.nama }}
        </td>
      </tr>
    </tbody>
  </VTable>
  <div class="text-center">
    <VRow justify="center">
      <VCol cols="8">
        <VContainer class="max-width">
          <VPagination
            v-model="page"
            :length="data?.page.totalPages"
            class="my-4"
          />
        </VContainer>
      </VCol>
    </VRow>
  </div>
</template>
