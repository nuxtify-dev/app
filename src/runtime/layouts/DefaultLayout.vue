<script setup lang="ts">
import { doc, onSnapshot } from 'firebase/firestore'
import { onMounted } from 'vue'
import { useFirestore, getCurrentUser } from 'vuefire'
import type { UserDoc } from '../../types/firestore'
import {
  useNuxtifyConfig,
  useNuxtifySiteTitle,
  useUserDoc,
  usersColName,
} from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()
const currentUser = await getCurrentUser()
const db = useFirestore()
const userDoc = useUserDoc()

// Page info
useNuxtifySiteTitle()

onMounted(() => {
  // Hydrate user state
  if (currentUser) {
    const userDocRef = doc(db, usersColName, currentUser.uid)
    onSnapshot(userDocRef, (doc) => {
      userDoc.value = {
        id: doc.id,
        ...doc.data(),
      } as UserDoc
    })
  }
})
</script>

<template>
  <v-app>
    <!-- Accessibility -->
    <NuxtRouteAnnouncer />

    <AppAnnouncement v-if="nuxtifyConfig.announcement?.show" />

    <AppBar class="d-print-none" />

    <AppNavigation class="d-print-none" />

    <v-main>
      <slot />
    </v-main>

    <AppToast class="d-print-none" />

    <AppDialog class="d-print-none" />
  </v-app>
</template>

<style>
.link-hover {
  text-decoration: none;
}
.link-hover:hover {
  text-decoration: underline;
}
</style>
