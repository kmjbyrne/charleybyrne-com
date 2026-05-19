<script setup lang="ts">
const route = useRoute()
const slugSegments = Array.isArray(route.params.slug)
  ? route.params.slug
  : [route.params.slug]
const slug = slugSegments[slugSegments.length - 1]
const path = `/blog/${slug}`

const { data: post } = await useAsyncData('post-' + path, () =>
  usePublicPosts(queryCollection('posts')).where('path', 'LIKE', `%/${slug}`).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: allPosts } = await useAsyncData('all-posts-nav', () =>
  usePublicPosts(queryCollection('posts')).order('date', 'DESC').select('path', 'title', 'date').all(),
)

const { data: allTags } = await useAsyncData('all-tags', async () => {
  const posts = await usePublicPosts(queryCollection('posts')).select('tags').all()
  const counts = posts.reduce<Record<string, number>>((acc, p) => {
    for (const tag of p.tags ?? []) {
      acc[tag] = (acc[tag] ?? 0) + 1
    }
    return acc
  }, {})
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ name: tag, count }))
})

const currentIndex = computed(() =>
  allPosts.value?.findIndex((p) => p.path === path) ?? -1,
)
const prevPost = computed(() =>
  currentIndex.value < (allPosts.value?.length ?? 0) - 1
    ? allPosts.value![currentIndex.value + 1]
    : null,
)
const nextPost = computed(() =>
  currentIndex.value > 0 ? allPosts.value![currentIndex.value - 1] : null,
)
const recentPosts = computed(() =>
  allPosts.value?.filter((p) => p.path !== path).slice(0, 4) ?? [],
)

const relatedPosts = computed(() => {
  if (!post.value?.tags?.length && !post.value?.category) return []
  return (
    allPosts.value
      ?.filter((p) => p.path !== path)
      .filter((p: { path: string; title: string; date: string }) => {
        const full = allPosts.value?.find((x) => x.path === p.path) as
          | { tags?: string[]; category?: string }
          | undefined
        const sharedTag = post.value?.tags?.some((t) =>
          full?.tags?.includes(t),
        )
        return sharedTag
      })
      .slice(0, 3) ?? []
  )
})

function extractText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  if (node && typeof node === 'object' && 'children' in node) {
    return extractText((node as { children: unknown }).children)
  }
  return ''
}

const readingTime = computed(() => {
  if (!post.value?.body) return null
  const text = extractText(post.value.body.value)
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
})

onMounted(() => {
  window.disqus_config = function () {
    this.page.url = window.location.href
    this.page.identifier = slugSegments.join('/')
  }

  const s = document.createElement('script')
  s.src = 'https://charleybyrne-com.disqus.com/embed.js'
  s.setAttribute('data-timestamp', String(+new Date()))
  ;(document.head || document.body).appendChild(s)
})

const scrollProgress = ref(0)
const tocOpen = ref(false)
const activeId = ref<string>('')

onMounted(() => {
  const onScroll = () => {
    const el = document.documentElement
    const scrolled = el.scrollTop
    const total = el.scrollHeight - el.clientHeight
    scrollProgress.value = total > 0 ? (scrolled / total) * 100 : 0
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  const headings = document.querySelectorAll('h2[id], h3[id]')
  if (headings.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id
          }
        }
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0,
      },
    )
    headings.forEach((h) => observer.observe(h))
    onUnmounted(() => observer.disconnect())
  }

})

useSeoMeta({
  title: () => post.value?.title ?? '',
  description: () => post.value?.description ?? '',
  ogTitle: () => post.value?.title ?? '',
  ogDescription: () => post.value?.description ?? '',
  ogImage: () => post.value?.image ?? undefined,
})

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div v-if="post">
    <div
      class="fixed top-(--ui-header-height) left-0 z-50 h-0.5 bg-primary transition-all duration-100"
      :style="{ width: `${scrollProgress}%` }"
    />

    <USlideover
      v-if="post.body?.toc?.links?.length"
      v-model:open="tocOpen"
      side="left"
      title="On this page"
      class="lg:hidden"
    >
      <template #body>
        <nav class="flex flex-col gap-1 px-1">
          <template v-for="link in post.body.toc.links" :key="link.id">
            <a
              :href="`#${link.id}`"
              class="text-muted hover:text-highlighted py-2 text-sm transition-colors"
              @click="tocOpen = false"
            >
              {{ link.text }}
            </a>
            <a
              v-for="child in link.children ?? []"
              :key="child.id"
              :href="`#${child.id}`"
              class="text-muted hover:text-highlighted py-2 pl-4 text-sm transition-colors"
              @click="tocOpen = false"
            >
              {{ child.text }}
            </a>
          </template>
        </nav>
      </template>
    </USlideover>

    <button
      v-if="post.body?.toc?.links?.length"
      type="button"
      class="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-inverted px-4 py-2.5 text-inverted shadow-lg text-xs font-semibold uppercase tracking-widest"
      @click="tocOpen = true"
    >
      <UIcon name="i-lucide-list" class="size-4" />
      Contents
    </button>

    <UContainer>
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_16rem]">
        <article class="min-w-0 py-12">
          <div v-if="post.image" class="mb-10 max-w-2xl">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full rounded aspect-[16/9] object-cover"
            />
            <p v-if="post.imageCredit" class="text-dimmed mt-2 text-xs text-right">
              Photo:
              <a
                v-if="post.imageCreditUrl"
                :href="post.imageCreditUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-default underline underline-offset-2 transition-colors"
              >{{ post.imageCredit }}</a>
              <span v-else>{{ post.imageCredit }}</span>
            </p>
          </div>

          <header class="mb-10 max-w-2xl">
            <div class="mb-4 flex flex-wrap items-center gap-2">
              <NuxtLink
                v-if="post.category"
                :to="`/category/${post.category.toLowerCase()}`"
                class="text-dimmed hover:text-default text-xs font-semibold uppercase tracking-widest transition-colors"
              >
                {{ post.category }}
              </NuxtLink>
              <span v-if="post.category" class="text-dimmed text-xs">·</span>
              <span class="text-dimmed text-sm">{{ formatDate(post.date) }}</span>
              <span v-if="readingTime" class="text-dimmed text-xs">·</span>
              <span v-if="readingTime" class="text-dimmed text-sm">{{ readingTime }}</span>
            </div>
            <h1 class="text-highlighted mb-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {{ post.title }}
            </h1>
            <p v-if="post.description" class="text-muted text-lg leading-relaxed font-light">
              {{ post.description }}
            </p>

            <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
              <NuxtLink
                v-for="tag in post.tags"
                :key="tag"
                :to="`/tag/${tag}`"
                class="text-dimmed hover:text-default border border-default hover:border-accented rounded px-2 py-0.5 text-xs transition-colors"
              >
                {{ tag }}
              </NuxtLink>
            </div>
          </header>


          <div class="prose prose-neutral dark:prose-invert max-w-2xl">
            <ContentRenderer :value="post" />
          </div>

          <div v-if="relatedPosts.length" class="mt-16 max-w-2xl border-t border-default pt-10">
            <p class="text-highlighted mb-6 text-xs font-semibold uppercase tracking-widest">
              Related Posts
            </p>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <NuxtLink
                v-for="r in relatedPosts"
                :key="r.path"
                :to="r.path"
                class="group flex flex-col gap-2"
              >
                <p class="text-highlighted text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                  {{ r.title }}
                </p>
                <p class="text-dimmed text-xs">{{ formatDate(r.date) }}</p>
              </NuxtLink>
            </div>
          </div>

          <div class="mt-10 max-w-2xl border-t border-default pt-8">
            <div class="flex items-center justify-between gap-4">
              <NuxtLink
                v-if="prevPost"
                :to="prevPost.path"
                class="group flex max-w-[45%] flex-col gap-1"
              >
                <span class="text-dimmed flex items-center gap-1 text-xs">
                  <UIcon name="i-lucide-arrow-left" class="size-3" />
                  Previous
                </span>
                <span class="text-muted group-hover:text-highlighted text-sm font-medium leading-snug transition-colors">
                  {{ prevPost.title }}
                </span>
              </NuxtLink>
              <div v-else />

              <NuxtLink
                v-if="nextPost"
                :to="nextPost.path"
                class="group flex max-w-[45%] flex-col items-end gap-1"
              >
                <span class="text-dimmed flex items-center gap-1 text-xs">
                  Next
                  <UIcon name="i-lucide-arrow-right" class="size-3" />
                </span>
                <span class="text-muted group-hover:text-highlighted text-sm font-medium leading-snug text-right transition-colors">
                  {{ nextPost.title }}
                </span>
              </NuxtLink>
              <div v-else />
            </div>
          </div>

          <div v-if="false" id="disqus_thread" class="mt-16 max-w-2xl border-t border-default pt-10" />
        </article>

        <aside class="hidden lg:block py-12">
          <div class="sticky top-[calc(var(--ui-header-height)+2rem)] flex flex-col gap-8">
            <div v-if="post.body?.toc?.links?.length" class="flex flex-col gap-3">
              <p class="text-highlighted text-xs font-semibold uppercase tracking-widest">
                On this page
              </p>
              <nav class="flex flex-col">
                <template v-for="link in post.body.toc.links" :key="link.id">
                  <a
                    :href="`#${link.id}`"
                    class="py-1 text-sm transition-colors"
                    :class="activeId === link.id ? 'text-highlighted font-medium' : 'text-muted hover:text-highlighted'"
                  >
                    {{ link.text }}
                  </a>
                  <a
                    v-for="child in link.children ?? []"
                    :key="child.id"
                    :href="`#${child.id}`"
                    class="py-1 pl-4 text-sm transition-colors"
                    :class="activeId === child.id ? 'text-highlighted font-medium' : 'text-muted hover:text-highlighted'"
                  >
                    {{ child.text }}
                  </a>
                </template>
              </nav>
            </div>

            <div v-if="recentPosts.length" class="flex flex-col gap-3">
              <p class="text-highlighted text-xs font-semibold uppercase tracking-widest">
                Recent Articles
              </p>
              <div class="flex flex-col gap-4">
                <NuxtLink
                  v-for="r in recentPosts"
                  :key="r.path"
                  :to="r.path"
                  class="group flex flex-col gap-1"
                >
                  <span class="text-muted group-hover:text-highlighted text-sm leading-snug transition-colors">
                    {{ r.title }}
                  </span>
                  <span class="text-dimmed text-xs">{{ formatDate(r.date) }}</span>
                </NuxtLink>
              </div>
            </div>

            <div v-if="allTags?.length" class="flex flex-col gap-3">
              <p class="text-highlighted flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest">
                <UIcon name="i-lucide-tag" class="size-3.5" />
                Tags
              </p>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="tag in allTags"
                  :key="tag.name"
                  :to="`/tag/${tag.name}`"
                  class="text-dimmed hover:text-default border border-default hover:border-accented rounded px-2 py-0.5 text-xs transition-colors"
                  :class="{ 'border-accented text-default': post.tags?.includes(tag.name) }"
                >
                  {{ tag.name }}
                  <span class="text-dimmed/60">({{ tag.count }})</span>
                </NuxtLink>
              </div>
            </div>

          </div>
        </aside>
      </div>
    </UContainer>
  </div>
</template>
