export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const nim = getRouterParam(event, 'id')
  const headers = getRequestHeaders(event)
  const authHeader = headers['token']

  try {
    return await $fetch(`${runtimeConfig.public.siserkomApiUrl}/mahasiswa/${nim}/sertifikat`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authHeader}`,
      },
    })
  }
  catch (error) {
    return error
  }
})
