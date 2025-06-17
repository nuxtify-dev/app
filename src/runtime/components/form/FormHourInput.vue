<script setup lang="ts">
import { computed, ref, watch, defineProps, defineEmits } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined,
  },
  label: {
    type: String,
    default: '',
  },
  hourItems: {
    type: Array<number>,
    default: [...Array(9).keys()],
  },
  isDirtyForm: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])
const hoursValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

// General state
const isError = computed(() => props.isDirtyForm && !hoursValue.value)
const hours = ref(hoursValue.value ? Math.floor(hoursValue.value) : 0)
const minutes = ref(hoursValue.value ? (hoursValue.value % 1) * 60 : 0)

// Handle hour changes
watch(hours, () => {
  hoursValue.value = hours.value + minutes.value / 60
})

// Handle minute changes
watch(minutes, () => {
  hoursValue.value = hours.value + minutes.value / 60
})
</script>

<template>
  <div
    v-if="label"
    class="text-medium-emphasis mb-2"
  >
    {{ label }}
  </div>

  <v-row dense>
    <v-col cols="6">
      <v-select
        v-model="hours"
        label="Hour(s)"
        :items="hourItems"
        :menu-props="{ maxHeight: 500 }"
        :error="isError"
      />
    </v-col>
    <v-col cols="6">
      <v-select
        v-model="minutes"
        label="Minutes"
        :items="[0, 15, 30, 45]"
        :error="isError"
      />
    </v-col>
  </v-row>

  <div
    v-if="isError"
    class="text-error text-caption mx-4 mb-2 mt-n6"
  >
    Required
  </div>
</template>
