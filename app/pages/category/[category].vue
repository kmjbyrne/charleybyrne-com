<script setup lang="ts">
const route = useRoute()
const category = route.params.category as string
const displayName = category.charAt(0).toUpperCase() + category.slice(1)

useSeoMeta({
  title: `${displayName} — Charley Byrne`,
  description: `Posts in ${displayName}.`,
})

const { data: posts } = await useAsyncData('category-' + category, () =>
  usePublicPosts(queryCollection('posts'))
    .where('category', '=', displayName)
    .order('date', 'DESC')
    .all(),
)

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <UContainer class="py-16">
    <div class="mb-10">
      <h1 class="text-highlighted text-2xl font-semibold tracking-tight">
        {{ displayName }}
      </h1>
    </div>

    <div class="flex flex-col divide-y divide-default">
      <NuxtLink
        v-for="post in posts"
        :key="post.path"
        :to="useFlatBlogPath(post.path)"
        class="group flex gap-4 py-6"
      >
        <div
          v-if="post.image"
          class="bg-muted size-20 shrink-0 overflow-hidden rounded"
        >
          <img
            :src="post.image"
            :alt="post.title"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div v-else class="bg-muted size-20 shrink-0 rounded" />

        <div class="flex flex-col gap-1.5">
          <span class="text-dimmed text-xs">{{ formatDate(post.date) }}</span>
          <h2
            class="text-highlighted text-base font-semibold leading-snug transition-colors group-hover:text-primary"
          >
            {{ post.title }}
          </h2>
          <p class="text-muted line-clamp-2 text-sm leading-relaxed">
            {{ post.description }}
          </p>
        </div>
      </NuxtLink>

      <div v-if="!posts?.length" class="py-16 text-center">
        <p class="text-dimmed text-sm">No posts in this category yet.</p>
      </div>
    </div>
  </UContainer>
</template>
