<script setup lang="ts">
import { useNuxtifyConfig } from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()
</script>

<template>
  <div v-if="nuxtifyConfig.credits">
    <small v-if="nuxtifyConfig.credits">
      <!-- Credits -->
      <span class="text-medium-emphasis">
        © {{ nuxtifyConfig.credits.prependText }}
      </span>
      <span v-if="nuxtifyConfig.credits.creator">
        <a
          v-if="nuxtifyConfig.credits.creator.domain"
          id="brand-name"
          :href="`https://${nuxtifyConfig.credits.creator.domain}/?utm_source=${nuxtifyConfig.brand?.domain}&utm_medium=referral`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-decoration-none text-black font-weight-bold"
        >{{ nuxtifyConfig.credits.creator.name }}</a><span v-else>{{ nuxtifyConfig.credits.creator.name }}</span>.
      </span>

      <!-- Message -->
      <div class="text-medium-emphasis">
        {{ nuxtifyConfig.credits.appendText }}
      </div>
    </small>
  </div>
</template>

<style scoped>
#brand-name {
  opacity: 0.7;
}
#brand-name:hover {
  opacity: 1;
}
</style>
