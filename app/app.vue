<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
})

const MAX_PINNED = 4

const { data: nav } = await useAsyncData('nav-categories', async () => {
  const posts = await queryCollection('posts').select('category').all()

  const counts = posts.reduce<Record<string, number>>((acc, p) => {
    const cat = p.category
    if (cat) acc[cat] = (acc[cat] ?? 0) + 1
    return acc
  }, {})

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const pinned = sorted.slice(0, MAX_PINNED).map(([cat]) => cat)
  const overflow = sorted.slice(MAX_PINNED).map(([cat]) => cat)

  return { pinned, overflow }
})

const navItems = computed<NavigationMenuItem[]>(() => {
  const items: NavigationMenuItem[] = (nav.value?.pinned ?? []).map((cat) => ({
    label: cat,
    to: `/category/${cat.toLowerCase()}`,
  }))

  if ((nav.value?.overflow ?? []).length > 0) {
    items.push({
      label: 'More',
      children: (nav.value?.overflow ?? []).map((cat) => ({
        label: cat,
        to: `/category/${cat.toLowerCase()}`,
      })),
    })
  }

  return items
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #title>
        <NuxtLink
          to="/"
          class="text-base font-semibold tracking-tight text-highlighted"
        >
          Charley Byrne
        </NuxtLink>
      </template>

      <UNavigationMenu :items="navItems" />

      <template #right>
        <UColorModeSelect size="sm" />
      </template>

      <template #body>
        <UNavigationMenu
          :items="navItems"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-dimmed text-sm">
          © {{ new Date().getFullYear() }} Charley Byrne
        </p>
      </template>

      <template #right>
        <div class="flex items-center gap-4">
          <a
            href="mailto:keithmbyrne+blog@gmail.com"
            class="text-dimmed hover:text-default text-sm transition-colors"
          >
            Get in touch
          </a>
          <a
            href="https://www.linkedin.com/in/keith-byrne-88ab01a1/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dimmed hover:text-default flex items-center transition-colors"
            aria-label="LinkedIn"
          >
            <UIcon name="i-simple-icons-linkedin" class="size-4" />
          </a>
          <a
            href="https://www.instagram.com/keithmbyrne"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dimmed hover:text-default flex items-center transition-colors"
            aria-label="Instagram (keithmbyrne)"
          >
            <UIcon name="i-simple-icons-instagram" class="size-4" />
          </a>
          <a
            href="https://www.instagram.com/charleymbyrne"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dimmed hover:text-default flex items-center transition-colors"
            aria-label="Instagram (charleymbyrne)"
          >
            <UIcon name="i-simple-icons-instagram" class="size-4" />
          </a>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
