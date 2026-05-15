<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
  title?: string
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <figure class="my-8">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      class="w-full rounded"
    />
    <figcaption
      v-if="title"
      class="text-dimmed mt-2 text-right text-xs"
    >
      {{ title }}
    </figcaption>
  </figure>
</template>
