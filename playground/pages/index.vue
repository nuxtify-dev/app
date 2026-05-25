<script setup lang="ts">
// STATE - GLOBAL
const nuxtifyConfig = useNuxtifyConfig()

// PAGE INFO
useSeoMeta({
  title: `${nuxtifyConfig.brand?.name} playground`,
  description: `This is the ${nuxtifyConfig.brand?.name} playground.`,
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1>Welcome to the {{ nuxtifyConfig.brand?.name }} playground!</h1>
              <p class="text-body-1 text-medium-emphasis">
                Explore the core functionalities and configuration of the <strong>{{ nuxtifyConfig.brand?.name }}</strong> module.
              </p>
            </v-col>
          </v-row>
        </v-container>

        <DemoCore />
      </v-col>
    </v-row>
  </v-container>
</template>
