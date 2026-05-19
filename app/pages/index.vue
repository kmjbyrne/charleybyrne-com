<script setup lang="ts">
useSeoMeta({
  title: 'Charley Byrne',
  description: 'Writing on engineering, leadership, and the craft of software.',
})

const { data: posts } = await useAsyncData('posts', () =>
  usePublicPosts(queryCollection('posts'))
    .order('date', 'DESC')
    .all(),
)

const featured = computed(() => posts.value?.[0] ?? null)
const rail = computed(() => posts.value?.slice(1, 3) ?? [])
const grid = computed(() => posts.value?.slice(3) ?? [])

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <UContainer class="py-12">
    <div v-if="featured">
      <div class="grid grid-cols-1 gap-0 lg:grid-cols-5 lg:divide-x lg:divide-default">
        <NuxtLink
          :to="featured.path"
          class="group flex flex-col justify-between gap-6 pb-10 lg:col-span-3 lg:pb-0 lg:pr-10"
        >
          <div class="flex flex-col gap-5">
            <img
              v-if="featured.image"
              :src="featured.image"
              :alt="featured.title"
              class="w-full rounded aspect-[16/9] object-cover"
            />
            <p class="text-dimmed text-sm">{{ formatDate(featured.date) }}</p>

            <h2 class="text-highlighted text-3xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary sm:text-4xl">
              {{ featured.title }}
            </h2>

            <div v-if="featured.category" class="flex flex-wrap gap-2">
              <span class="text-dimmed text-xs font-semibold uppercase tracking-widest">
                {{ featured.category }}
              </span>
            </div>

            <p class="text-muted text-base leading-relaxed">
              {{ featured.description }}
            </p>
          </div>

          <span class="text-highlighted inline-flex w-fit items-center rounded-full border border-default px-4 py-2 text-sm font-medium transition-colors group-hover:border-primary group-hover:text-primary">
            Continue Reading
          </span>
        </NuxtLink>

        <div
          v-if="rail.length"
          class="flex flex-col divide-y divide-default border-t border-default pt-10 lg:col-span-2 lg:border-t-0 lg:pl-10 lg:pt-0"
        >
          <NuxtLink
            v-for="post in rail"
            :key="post.path"
            :to="post.path"
            class="group flex flex-col gap-3 py-6 first:pt-0 last:pb-0"
          >
            <img
              v-if="post.image"
              :src="post.image"
              :alt="post.title"
              class="w-full rounded aspect-[16/9] object-cover"
            />
            <p class="text-dimmed text-xs">{{ formatDate(post.date) }}</p>
            <h3 class="text-highlighted text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
              {{ post.title }}
            </h3>
            <span
              v-if="post.category"
              class="text-dimmed text-xs font-semibold uppercase tracking-widest"
            >
              {{ post.category }}
            </span>
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="grid.length"
        class="mt-10 grid grid-cols-1 gap-px border-t border-default pt-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        <NuxtLink
          v-for="post in grid"
          :key="post.path"
          :to="post.path"
          class="group flex flex-col gap-3 p-6 transition-colors hover:bg-elevated/50 rounded"
        >
          <p class="text-dimmed text-xs">{{ formatDate(post.date) }}</p>
          <h3 class="text-highlighted text-base font-semibold leading-snug transition-colors group-hover:text-primary">
            {{ post.title }}
          </h3>
          <p class="text-muted line-clamp-2 text-sm leading-relaxed">
            {{ post.description }}
          </p>
          <span
            v-if="post.category"
            class="text-dimmed mt-auto text-xs font-semibold uppercase tracking-widest"
          >
            {{ post.category }}
          </span>
        </NuxtLink>
      </div>
    </div>

    <div v-else class="py-32 text-center">
      <p class="text-dimmed text-sm">No posts yet.</p>
    </div>
  </UContainer>
</template>
