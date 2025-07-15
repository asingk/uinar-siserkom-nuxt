export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const headers = getRequestHeaders(event)
  const authHeader = headers['token']

  try {
    return await $fetch(`${runtimeConfig.public.siserkomApiUrl}/invoice/${id}/bayar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authHeader}`,
      },
    })
  }
  catch (error: any) {
    return error
  }
})
