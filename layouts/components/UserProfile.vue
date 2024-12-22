<script setup lang="ts">
import type Keycloak from 'keycloak-js'
import avatar1 from '@images/avatars/avatar-1.png'
import { useKeycloakStore } from '@/stores/keycloak'

const runtimeConfig = useRuntimeConfig()

const nuxtApp = useNuxtApp()
const keycloak = nuxtApp.$keycloak as Keycloak
const nama = ref('')
const keycloakStore = useKeycloakStore()

nama.value = keycloakStore.nama

function onSetting() {
  navigateTo(`${runtimeConfig.public.keycloakUrl}/realms/${runtimeConfig.public.keycloakRealm}/account/`, {
    open: {
      target: '_blank',
    },
  })
}
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
    bordered
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ nama }}
            </VListItemTitle>
            <VListItemSubtitle>Mahasiswa</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Settings -->
          <VListItem
            link
            @click="onSetting"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-cog"
                size="22"
              />
            </template>

            <VListItemTitle>Akun SSO</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="keycloak.logout()">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="bx-log-out"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
