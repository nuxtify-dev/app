<script setup lang="ts">
import { doc } from 'firebase/firestore'
import { useFirebaseApp, useFirestore, useDocument } from 'vuefire'
import { computed } from 'vue'
import { mdiAccount, mdiArrowTopRight } from '@mdi/js'
import type { UserDoc } from '../../../../types/firestore'
import {
  useDisplay,
  usersColName,
  fullName,
  formatDate,
  booleanToText,
  getCloudStorageConsoleUrl,
  getFirestoreConsoleUrl,
} from '#imports'

// PROPS
const props = defineProps<{
  uid: string
}>()

// STATE - GLOBAL
const { xs } = useDisplay()
const firebaseApp = useFirebaseApp()
const db = useFirestore()

// Get user from database
const userDocRef = doc(db, usersColName, props.uid)
const userDoc = useDocument<UserDoc>(userDocRef)
const firestoreConsoleUrl = computed(() =>
  getFirestoreConsoleUrl(
    firebaseApp.options.projectId as string,
    [usersColName, props.uid],
  ),
)
const cloudStorageConsoleUrl = computed(() =>
  getCloudStorageConsoleUrl(
    firebaseApp.options.storageBucket as string,
    `${usersColName}/${props.uid}`,
  ),
)
</script>

<template>
  <div v-if="userDoc">
    <!-- Name and avatar -->
    <v-row class="mt-md-2">
      <v-col
        cols="12"
        md="8"
        offset-xl="2"
        xl="4"
      >
        <v-row>
          <v-col cols="4">
            <v-avatar
              color="secondary"
              :size="xs ? 75 : 100"
            >
              <v-img
                v-if="userDoc.photoURL"
                :src="userDoc.photoURL"
                :alt="
                  fullName(userDoc.firstName, userDoc.lastName)
                    ?? 'User avatar'
                "
              />
              <v-icon
                v-else
                :icon="mdiAccount"
                :size="xs ? 60 : 85"
              />
            </v-avatar>
          </v-col>
          <v-col cols="8">
            <div class="text-h5 text-md-h4 mt-2 mt-md-4">
              {{ fullName(userDoc.firstName, userDoc.lastName) }}
            </div>
            <div class="text-h6 text-md-h5">
              {{ userDoc.email }}
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        offset-xl="2"
        xl="8"
      >
        <div class="text-h5 mb-3">
          Other
        </div>
        <v-card>
          <!-- Meta -->
          <div class="text-h6 font-weight-bold pl-4 pt-4">
            Meta
          </div>

          <v-list>
            <v-list-item>
              <v-list-item-title>Last Active</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDate(userDoc.lastActivity.toDate(), { type: 'datetime' }) }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Created</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDate(userDoc.created.toDate(), { type: 'datetime' }) }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Last Updated</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDate(userDoc.lastUpdated.toDate(), { type: 'datetime' }) }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>ID</v-list-item-title>
              <div class="text-medium-emphasis text-body-2">
                {{ userDoc.id }}
              </div>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Disabled</v-list-item-title>
              <v-list-item-subtitle>
                {{ booleanToText(userDoc.disabled) }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Firestore Console</v-list-item-title>
              <v-list-item-subtitle>
                <NuxtLink
                  :to="firestoreConsoleUrl"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Firestore
                  <v-icon
                    :icon="mdiArrowTopRight"
                    size="small"
                    color="grey"
                    class="mb-1"
                  />
                </NuxtLink>
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Cloud Storage Console</v-list-item-title>
              <v-list-item-subtitle>
                <NuxtLink
                  :to="cloudStorageConsoleUrl"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Cloud Storage
                  <v-icon
                    :icon="mdiArrowTopRight"
                    size="small"
                    color="grey"
                    class="mb-1"
                  />
                </NuxtLink>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="css" scoped>
a {
  color: rgb(var(--v-theme-secondary));
  text-decoration: none;
}
a:hover {
  color: rgb(var(--v-theme-secondary));
  text-decoration: underline;
}
</style>
