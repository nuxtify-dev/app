<script setup lang="ts">
// Quick search
const quickSearchValue = ref('')
const searchGroups = [
  {
    title: 'Fruits',
    items: ['Apple', 'Banana', 'Orange', 'Pear', 'Strawberry', 'Watermelon', 'Pineapple'],
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
</template>
