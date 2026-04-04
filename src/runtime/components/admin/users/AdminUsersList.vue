<script setup lang="ts">
import { collection, query } from 'firebase/firestore'
import { useFirebaseApp, useFirestore, useCollection } from 'vuefire'
import { provide, computed } from 'vue'
import { mdiAccount } from '@mdi/js'
import type { UserDoc } from '../../../../types/firestore'
import {
  useNuxtifyConfig,
  usersColName,
  formatDate,
  fullName,
  getFirestoreConsoleUrl,
  getCloudStorageConsoleUrl,
} from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()
const firebaseApp = useFirebaseApp()
const db = useFirestore()

// Provide
provide(
  'exportFilename',
  `${nuxtifyConfig.brand?.name} Users Export - ${new Date().toISOString()}`,
)

// Get users from database
const usersColRef = collection(db, usersColName)
const q = query(usersColRef)
const users = useCollection<UserDoc>(q, {
  ssrKey: 'users-col',
})

// Format data
const formatData = (item: (typeof users.data.value)[number]) => {
  const firestoreConsoleUrl = computed(() =>
    getFirestoreConsoleUrl(
      firebaseApp.options.projectId as string,
      [usersColName, item.id],
    ),
  )
  const cloudStorageConsoleUrl = computed(() =>
    getCloudStorageConsoleUrl(
      firebaseApp.options.storageBucket as string,
      `${usersColName}/${item.id}`,
    ),
  )

  return {
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    name: fullName(item.firstName, item.lastName),
    email: item.email,
    photoURL: item.photoURL,
    disabled: item.disabled,
    lastActivity: item.lastActivity,
    created: item.created,
    lastUpdated: item.lastUpdated,
    firestoreConsoleUrl: firestoreConsoleUrl.value,
    cloudStorageConsoleUrl: cloudStorageConsoleUrl.value,
  }
}
const formattedData = computed(() => users.data.value.map(formatData))

// Define headers
const headers = [
  {
    title: '',
    sortable: false,
    filterable: false,
    key: 'photoURL',
  },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  {
    title: 'Last Activity',
    key: 'lastActivity',
    filterable: false,
  },
  {
    title: 'Created',
    key: 'created',
    filterable: false,
  },
  {
    title: 'Firestore Console',
    key: 'firestoreConsoleUrl',
    sortable: false,
    filterable: false,
  },
  {
    title: 'GCS Console',
    key: 'cloudStorageConsoleUrl',
    sortable: false,
    filterable: false,
  },
]

// Define search groups
const searchGroups = [
  {
    title: 'Role',
    items: ['Admin', 'User'],
  },
  {
    title: 'Status',
    items: ['Active', 'Inactive'],
  },
]
</script>

<template>
  <FirebaseListTable
    :formatted-data="formattedData"
    :headers="headers"
    :sort-by="[{ key: 'lastActivity', order: 'desc' }]"
    :col-ref="usersColRef"
    root-url="/admin/users"
    name="user"
    disable-create
    disable-delete
    :export-formats="['CSV']"
    :search-groups
  >
    <template #item.photoURL="{ item }">
      <v-avatar color="primary">
        <v-img
          v-if="item.photoURL"
          :src="item.photoURL"
          :alt="fullName(item.firstName, item.lastName) ?? 'User avatar'"
        />
        <v-icon
          v-else
          :icon="mdiAccount"
        />
      </v-avatar>
    </template>
    <template #item.name="{ item }">
      <NuxtLink
        :to="`/admin/users/${item.id}`"
        class="text-body-2 text-secondary link-hover"
      >{{
        item.name || '(blank)'
      }}</NuxtLink>
    </template>
    <template #item.signupCompleted="{ item }">
      {{ formatDate(item.signupCompleted.toDate(), { type: 'datetime' }) }}
    </template>
    <template #item.firstActivity="{ item }">
      {{ formatDate(item.firstActivity.toDate(), { type: 'datetime' }) }}
    </template>
    <template #item.lastActivity="{ item }">
      {{ formatDate(item.lastActivity.toDate(), { type: 'datetime' }) }}
    </template>
    <template #item.subscribed="{ item }">
      {{ formatDate(item.subscribed.toDate(), { type: 'datetime' }) }}
    </template>
  </FirebaseListTable>
</template>
