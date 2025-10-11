<script setup lang="ts">
import { collection, query } from 'firebase/firestore'
import { useFirebaseApp, useFirestore, useCollection } from 'vuefire'
import { provide, computed } from 'vue'
import type { UserDoc } from '../../../../types/firestore'
import {
  useNuxtifyConfig,
  usersColName,
  fullName,
  getFirebaseConsoleUrl,
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
  const firebaseConsoleUrl = computed(() =>
    getFirebaseConsoleUrl(
      firebaseApp.options.projectId as string,
      usersColName,
      item.id,
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
    firebaseConsoleUrl: firebaseConsoleUrl.value,
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
    title: 'Firebase Console',
    key: 'firebaseConsoleUrl',
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
  />
</template>
