import type { KeycloakConfig } from 'keycloak-js'
import Keycloak from 'keycloak-js'
import { useKeycloakStore } from '@/stores/keycloak'

export default defineNuxtPlugin(async nuxtApp => {
  const runtimeConfig = useRuntimeConfig()

  const initOptions: KeycloakConfig = {
    url: runtimeConfig.public.keycloakUrl as string,
    realm: runtimeConfig.public.keycloakRealm as string,
    clientId: runtimeConfig.public.keycloakClient as string,
  }

  const keycloak = new Keycloak(initOptions)

  nuxtApp.$keycloak = keycloak

  try {
    const authenticated = await keycloak.init({ onLoad: 'login-required' })
    if (authenticated) {
      console.debug('User is authenticated')
      if (!keycloak.realmAccess?.roles.includes('MHS')) {
        console.debug('Access denied')
        await keycloak.logout()
      }
    }
    else {
      console.debug('User is not authenticated')
    }
  }
  catch (error) {
    console.error('Failed to initialize adapter:', error)
  }

  try {
    const profile = await keycloak.loadUserProfile()
    const keycloakStore = useKeycloakStore()

    keycloakStore.setNim(profile.username)
    keycloakStore.setNama(profile.firstName, profile.lastName)

    // console.debug('Retrieved user profile:', profile)
  }
  catch (error) {
    console.error('Failed to load user profile:', error)
  }

  // try {
  //   await keycloak.updateToken(200)
  // }
  // catch (error) {
  //   console.error('Failed to refresh token:', error)
  // }

  setInterval(() => {
    keycloak
      .updateToken(70)
      .then(refreshed => {
        if (refreshed) {
          console.debug(`Token refreshed ${refreshed}`)
        }
        else {
          console.debug(
            `Token not refreshed, valid for ${
              Math.round(
                keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000,
              )
            } seconds`,
          )
        }
      })
      .catch(() => {
        console.error('Failed to refresh token')
      })
  }, 60000)
})
