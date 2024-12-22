export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig()
  const nim = getRouterParam(event, 'id')

  try {
    return await $fetch(`${runtimeConfig.public.siserkomApiUrl}/mahasiswa/${nim}/matakuliah`)
  }
  catch (error) {
    return error
  }
})
