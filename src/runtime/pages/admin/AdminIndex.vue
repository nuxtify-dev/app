<script setup lang="ts">
import { collection, getCountFromServer } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useHead, usersColName } from '#imports'

// App state
const db = useFirestore()

// Page info
useHead({
  title: 'Admin - Dashboard',
})

// Users
const usersColRef = collection(db, usersColName)
const totalUsersSnap = await getCountFromServer(usersColRef)
const totalUsers = totalUsersSnap.data().count
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="4"
      >
        <h2 class="text-h5 mb-2">
          Dashboard
        </h2>

        <v-card>
          <v-card-title>App Statistics</v-card-title>
          <v-list>
            <v-list-item to="/admin/users">
              <v-list-item-title>Total users</v-list-item-title>
              <v-list-item-subtitle>{{ totalUsers }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
