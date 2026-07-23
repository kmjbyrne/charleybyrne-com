<script setup lang="ts">
const props = defineProps<{
  path: string
  title?: string
  image?: string
}>()

const isExternal = computed(() => /^https?:\/\//.test(props.path))

const resolvedTitle = computed(() => props.title ?? '')

const faviconUrl = computed(() => {
  if (!isExternal.value) return null
  const domain = new URL(props.path).hostname
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
})

const resolvedImage = computed(() => props.image ?? (isExternal.value ? faviconUrl.value : null))

const isIcon = computed(() => resolvedImage.value === faviconUrl.value)
</script>

<template>
  <NuxtLink
    v-if="resolvedTitle"
    :to="path"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="not-prose group my-8 block max-w-2xl border-y border-default py-5 transition-colors hover:border-accented"
  >
    <p class="text-dimmed mb-3 text-xs font-semibold uppercase tracking-widest">
      Related Post
    </p>
    <div class="flex items-center gap-4">
      <img
        v-if="resolvedImage"
        :src="resolvedImage"
        :alt="resolvedTitle"
        :class="isIcon
          ? 'h-10 w-10 shrink-0 rounded object-contain'
          : 'h-16 w-24 shrink-0 rounded object-cover'"
      >
      <p class="text-highlighted text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
        {{ resolvedTitle }}
      </p>
    </div>
  </NuxtLink>
</template>
