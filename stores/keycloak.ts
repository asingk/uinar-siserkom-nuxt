export const useKeycloakStore = defineStore('keycloak', () => {
  const nim = ref('')
  const nama = ref('')
  function setNim(id: string | undefined) {
    if (id)
      nim.value = id
  }
  function setNama(firstname: string | undefined, lastname: string | undefined) {
    if (firstname && lastname)
      nama.value = `${firstname} ${lastname}`
  }

  return { nim, setNim, nama, setNama }
})
