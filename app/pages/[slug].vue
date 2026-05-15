<script setup lang="ts">
const route = useRoute()
const path = `/pages/${route.params.slug}`

const { data: page } = await useAsyncData('page-' + path, () =>
  queryCollection('pages').path(path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => page.value?.title ?? '',
  description: () => page.value?.description ?? '',
})
</script>

<template>
  <UPage v-if="page">
    <UPageHeader :title="page.title" :description="page.description" />
    <UPageBody>
      <ContentRenderer :value="page" />
    </UPageBody>
  </UPage>
</template>
