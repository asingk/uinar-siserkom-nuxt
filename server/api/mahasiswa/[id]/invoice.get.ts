import type { InvoiceList } from '@/types/invoice'

export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const nim = getRouterParam(event, 'id')

  try {
    const resp = await $fetch<InvoiceList>(`${runtimeConfig.public.siserkomApiUrl}/mahasiswa/${nim}/invoice`)
    if (resp._embedded) {
      for (const item of resp?._embedded?.invoiceModelList) {
        if (item?.idKelas) {
          try {
            item.kelas = await $fetch(`${runtimeConfig.public.siserkomApiUrl}/kelas/${item.idKelas}`)
          }
          catch (errorKelas) {
            console.error(errorKelas)
          }
        }
      }
    }

    return resp
  }
  catch (error) {
    return error
  }
})
