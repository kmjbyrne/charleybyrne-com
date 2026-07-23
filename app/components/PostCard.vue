<script setup lang="ts">
import type { Collections } from '@nuxt/content'

type Post = Collections['posts']

const props = defineProps<{
  post: Post
  variant: 'featured' | 'rail' | 'grid'
}>()

const formattedDate = computed(() =>
  new Date(props.post.date).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)
</script>

<template>
  <NuxtLink
    :to="useFlatBlogPath(post.path)"
    :class="{
      'group flex w-64 shrink-0 flex-col gap-3 rounded border border-default p-4 transition-colors hover:bg-elevated/50': variant === 'featured',
      'group flex flex-col gap-3 py-6 first:pt-0 last:pb-0': variant === 'rail',
      'group flex flex-col gap-3 rounded p-6 transition-colors hover:bg-elevated/50': variant === 'grid',
    }"
  >
    <img
      v-if="post.image"
      :src="post.image"
      :alt="post.title"
      class="aspect-[16/9] w-full rounded object-cover"
    >
    <p class="text-dimmed text-xs">
      {{ formattedDate }}
    </p>
    <h3
      :class="{
        'text-highlighted text-sm font-semibold leading-snug transition-colors group-hover:text-primary': variant === 'featured',
        'text-highlighted text-lg font-semibold leading-snug transition-colors group-hover:text-primary': variant === 'rail',
        'text-highlighted text-base font-semibold leading-snug transition-colors group-hover:text-primary': variant === 'grid',
      }"
    >
      {{ post.title }}
    </h3>
    <p
      v-if="post.description && variant !== 'rail'"
      :class="{
        'text-muted line-clamp-3 text-xs leading-relaxed': variant === 'featured',
        'text-muted line-clamp-2 text-sm leading-relaxed': variant === 'grid',
      }"
    >
      {{ post.description }}
    </p>
    <span
      v-if="post.category"
      class="text-dimmed mt-auto text-xs font-semibold uppercase tracking-widest"
    >
      {{ post.category }}
    </span>
  </NuxtLink>
</template>
