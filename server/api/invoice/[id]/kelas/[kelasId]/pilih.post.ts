export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const noInvoice = getRouterParam(event, 'id')
  const kelasId = getRouterParam(event, 'kelasId')
  const body = await readBody(event)

  try {
    return await $fetch(`${runtimeConfig.public.siserkomApiUrl}/invoice/${noInvoice}/kelas/${kelasId}`, {
      method: 'POST',
      headers: {
        apikey: runtimeConfig.siserkomApiKey,
      },
      body,
    })
  }
  catch (error: any) {
    return error
  }
})
