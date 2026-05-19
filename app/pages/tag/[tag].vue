<script setup lang="ts">
const route = useRoute()
const tag = route.params.tag as string

useSeoMeta({
  title: `#${tag} — Charley Byrne`,
  description: `Posts tagged with ${tag}.`,
})

const { data: posts } = await useAsyncData('tag-' + tag, () =>
  usePublicPosts(queryCollection('posts'))
    .where('tags', 'LIKE', `%${tag}%`)
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
    <div class="mb-10 flex items-baseline gap-3">
      <h1 class="text-highlighted text-2xl font-semibold tracking-tight">
        #{{ tag }}
      </h1>
      <span class="text-dimmed text-sm">{{ posts?.length ?? 0 }} post{{ posts?.length === 1 ? '' : 's' }}</span>
    </div>

    <div class="flex flex-col divide-y divide-default">
      <NuxtLink
        v-for="post in posts"
        :key="post.path"
        :to="post.path"
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
          <div class="flex items-center gap-2">
            <NuxtLink
              v-if="post.category"
              :to="`/category/${post.category.toLowerCase()}`"
              class="text-dimmed hover:text-default text-xs font-semibold uppercase tracking-widest transition-colors"
              @click.stop
            >
              {{ post.category }}
            </NuxtLink>
            <span v-if="post.category" class="text-dimmed text-xs">·</span>
            <span class="text-dimmed text-xs">{{ formatDate(post.date) }}</span>
          </div>
          <h2 class="text-highlighted text-base font-semibold leading-snug transition-colors group-hover:text-primary">
            {{ post.title }}
          </h2>
          <p class="text-muted line-clamp-2 text-sm leading-relaxed">
            {{ post.description }}
          </p>
          <div v-if="post.tags?.length" class="mt-1 flex flex-wrap gap-1.5">
            <NuxtLink
              v-for="t in post.tags"
              :key="t"
              :to="`/tag/${t}`"
              class="text-dimmed hover:text-default border border-default hover:border-accented rounded px-2 py-0.5 text-xs transition-colors"
              :class="{ 'border-accented text-default': t === tag }"
              @click.stop
            >
              {{ t }}
            </NuxtLink>
          </div>
        </div>
      </NuxtLink>

      <div v-if="!posts?.length" class="py-16 text-center">
        <p class="text-dimmed text-sm">No posts tagged with "{{ tag }}".</p>
      </div>
    </div>
  </UContainer>
</template>
