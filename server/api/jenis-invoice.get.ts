export default defineEventHandler(() => {
  const runtimeConfig = useRuntimeConfig()

  return $fetch(`${runtimeConfig.public.siserkomApiUrl}/jenis-invoice`)
})
