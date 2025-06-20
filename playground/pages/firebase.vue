<script setup lang="ts">
import { doc } from 'firebase/firestore'

// Firebase
const db = useFirestore()

// Connect to Firestore
const docRef = doc(db, 'test', '123')

// Page info
useSeoMeta({
  title: 'Firebase',
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1>Firebase</h1>
            </v-col>
          </v-row>

          <!-- Firebase File Upload Dialog -->
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4">
                <h2>FirebaseFileUploadDialog</h2>
                <FirebaseFileUploadDialog
                  :doc-ref
                  :upload-path="`test/123`"
                  upload-field-name="test"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
