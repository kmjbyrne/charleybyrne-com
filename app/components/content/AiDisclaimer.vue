<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'AI Disclaimer',
  },
)

const slots = useSlots()
const hasContent = computed(() => !!slots.default)
</script>

<template>
  <aside
    class="my-10 border-l-2 border-primary/40 bg-primary/5 py-4 pl-4 pr-4 text-sm"
    role="note"
    aria-label="AI usage disclosure"
  >
    <p class="text-primary mb-2 flex items-center gap-2 font-semibold uppercase tracking-wide">
      <UIcon
        name="i-lucide-sparkles"
        class="size-4 shrink-0"
      />
      {{ title }}
    </p>
    <div class="text-dimmed [&>p]:my-0 [&>p+p]:mt-2 italic leading-relaxed">
      <slot v-if="hasContent" />
      <p v-else>
        I used AI to help research the studies linked in this piece and to review
        drafts for clarity. Every thought, argument and sentence here is my own.
        The taste, for better or worse, is human.
      </p>
    </div>
  </aside>
</template>
