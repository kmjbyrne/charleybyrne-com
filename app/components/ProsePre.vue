<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import OriginalProsePre from '#ui/components/prose/Pre.vue'

const props = defineProps<{
  icon?: string
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  hideHeader?: boolean
  meta?: string
  class?: string
  ui?: object
}>()

const isMermaid = computed(() => props.language === 'mermaid')
const mermaidRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!isMermaid.value || !mermaidRef.value) return

  const { default: mermaid } = await import('mermaid')
  const isDark = document.documentElement.classList.contains('dark')
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
  })

  const source = props.code || ''
  const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
  const { svg } = await mermaid.render(id, source.trim())
  mermaidRef.value.innerHTML = svg
})
</script>

<template>
  <div v-if="isMermaid" ref="mermaidRef" class="my-6 flex justify-center" />
  <OriginalProsePre
    v-else
    :icon="icon"
    :code="code"
    :language="language"
    :filename="filename"
    :highlights="highlights"
    :hide-header="hideHeader"
    :meta="meta"
    :class="props.class"
    :ui="ui"
  >
    <slot />
  </OriginalProsePre>
</template>
