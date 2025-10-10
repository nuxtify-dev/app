<script setup lang="ts">
// App state
const nuxtifyConfig = useNuxtifyConfig()
const dialog = useDialog()
const toast = useToast()

// Page info
useSeoMeta({
  title: `${nuxtifyConfig.brand?.name} playground`,
  description: `This is the ${nuxtifyConfig.brand?.name} playground.`,
})

// Functions
const clickDialog = () => {
  // Dialog
  dialog.value.title = 'This is a dialog!'
  dialog.value.message = 'It can have fun messages.'
  dialog.value.action.function = () => {
    dialog.value.show = false
  }
  dialog.value.show = true
}
const clickToast = () => {
  // Toast
  toast.value.message = 'This is a toast!'
  toast.value.show = true
}

// Quick search
const quickSearchValue = ref('')
const searchGroups = [
  {
    title: 'Fruits',
    items: ['Apple', 'Banana', 'Orange'],
  },
  {
    title: 'Vegetables',
    items: ['Carrot', 'Broccoli', 'Spinach'],
  },
]
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1>{{ nuxtifyConfig.brand?.name }} playground</h1>
            </v-col>
          </v-row>

          <!-- Nuxtify config -->
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4">
                <h2>nuxtifyConfig</h2>
                <pre>{{ nuxtifyConfig }}</pre>
              </v-card>
            </v-col>
          </v-row>

          <!-- App dialog -->
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4">
                <h2>AppDialog</h2>
                <v-btn
                  class="mt-2"
                  @click="clickDialog"
                >
                  Show Dialog
                </v-btn>
              </v-card>
            </v-col>
          </v-row>

          <!-- App toast -->
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4">
                <h2>AppToast</h2>
                <v-btn
                  class="mt-2"
                  @click="clickToast"
                >
                  Show Toast
                </v-btn>
              </v-card>
            </v-col>
          </v-row>

          <!-- App loading -->
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4">
                <h2>AppLoading</h2>
                <AppLoading />
              </v-card>
            </v-col>
          </v-row>

          <!-- App logo -->
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4">
                <h2>AppLogo</h2>
                <AppLogo />
              </v-card>
            </v-col>
          </v-row>

          <!-- Quick search -->
          <v-row>
            <v-col cols="12">
              <v-card class="pa-4">
                <h2>QuickSearch</h2>
                <p class="mb-2">
                  Selected: {{ quickSearchValue || 'none' }}
                </p>
                <QuickSearch
                  v-model="quickSearchValue"
                  :search-groups="searchGroups"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
