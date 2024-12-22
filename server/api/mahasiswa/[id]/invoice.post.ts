export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const nim = getRouterParam(event, 'id')
  const body = await readBody(event)

  try {
    return await $fetch(`${runtimeConfig.public.siserkomApiUrl}/mahasiswa/${nim}/invoice`, {
      method: 'POST',
      headers: {
        'apikey': runtimeConfig.siserkomApiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      query: body,
    })
  }
  catch (error) {
    return error
  }
})
