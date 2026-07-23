<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth?: number
  children?: TocLink[]
}

withDefaults(
  defineProps<{
    links: TocLink[]
    level?: number
  }>(),
  {
    level: 0,
  },
)

const emit = defineEmits<{
  navigate: []
}>()
</script>

<template>
  <template
    v-for="link in links"
    :key="link.id"
  >
    <a
      :href="`#${link.id}`"
      class="text-muted hover:text-highlighted block py-2 text-sm transition-colors"
      :style="{ paddingLeft: `${level}rem` }"
      @click="emit('navigate')"
    >
      {{ link.text }}
    </a>
    <TocLinks
      v-if="link.children?.length"
      :links="link.children"
      :level="level + 1"
      @navigate="emit('navigate')"
    />
  </template>
</template>
