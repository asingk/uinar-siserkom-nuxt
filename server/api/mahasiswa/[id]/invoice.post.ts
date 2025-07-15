export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const nim = getRouterParam(event, 'id')
  const headers = getRequestHeaders(event)
  const authHeader = headers['token']
  const body = await readBody(event)

  try {
    return await $fetch(`${runtimeConfig.public.siserkomApiUrl}/mahasiswa/${nim}/invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${authHeader}`,
      },
      body: new URLSearchParams(body),
    })
  }
  catch (error) {
    return error
  }
})
