export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const nim = getRouterParam(event, 'id')

  try {
    return await $fetch(`${runtimeConfig.public.siserkomApiUrl}/mahasiswa/${nim}/matakuliah`, {
      method: 'POST',
      headers: {
        'apikey': runtimeConfig.siserkomApiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }
  catch (error) {
    return error
  }
})
