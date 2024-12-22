export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  try {
    return await $fetch(`${runtimeConfig.public.siserkomApiUrl}/invoice/${id}/bayar`, {
      method: 'POST',
      headers: {
        apikey: runtimeConfig.siserkomApiKey,
      },
    })
  }
  catch (error: any) {
    return error
  }
})
