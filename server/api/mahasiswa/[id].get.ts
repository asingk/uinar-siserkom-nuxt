export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const nim = getRouterParam(event, 'id')

  try {
    return await $fetch(`${runtimeConfig.public.siserkomApiUrl}/mahasiswa/${nim}`)
  }
  catch (error: any) {
    if (error.data.status === 404) {
      try {
        const respCreate = await $fetch(`${runtimeConfig.public.siserkomApiUrl}/mahasiswa/${nim}`, {
          method: 'POST',
          headers: {
            apikey: runtimeConfig.siserkomApiKey,
          },
        })

        await $fetch(`${runtimeConfig.public.siserkomApiUrl}/mahasiswa/${nim}/matakuliah`, {
          method: 'POST',
          headers: {
            apikey: runtimeConfig.siserkomApiKey,
          },
        })

        return respCreate
      }
      catch (errorCreate: any) {
        return errorCreate
      }
    }
    else {
      return error
    }
  }
})
