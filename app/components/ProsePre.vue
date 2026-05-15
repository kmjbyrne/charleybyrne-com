<script setup lang="ts">
import mermaid from 'mermaid'

const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()

const el = ref<HTMLElement>()
const svg = ref<string>('')

if (props.language === 'mermaid' && props.code) {
  onMounted(async () => {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
    const id = `mermaid-${Math.random().toString(36).slice(2)}`
    const { svg: rendered } = await mermaid.render(id, props.code!)
    svg.value = rendered
  })
}
</script>

<template>
  <div v-if="language === 'mermaid'" ref="el" class="my-6 flex justify-center overflow-x-auto" v-html="svg" />

  <div v-else class="group relative">
    <button
      v-if="code"
      type="button"
      class="absolute right-3 top-3 z-10 rounded p-1.5 opacity-0 transition-opacity group-hover:opacity-100 bg-elevated hover:bg-accented"
      :aria-label="'Copy code'"
      @click="navigator.clipboard.writeText(code)"
    >
      <UIcon name="i-lucide-copy" class="size-3.5 text-muted" />
    </button>
    <slot />
  </div>
</template>
