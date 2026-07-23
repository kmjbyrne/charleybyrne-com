<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    icon?: string
  }>(),
  {
    title: 'An aside',
    icon: 'i-lucide-lightbulb',
  },
)
</script>

<template>
  <details
    class="group my-10 border-l-2 border-accented bg-elevated/50 py-4 pl-4 pr-4 text-sm"
  >
    <summary
      class="text-muted flex cursor-pointer list-none items-center gap-2 font-semibold uppercase tracking-wide [&::-webkit-details-marker]:hidden"
    >
      <UIcon
        :name="icon"
        class="size-4 shrink-0 text-amber-500 dark:text-amber-400"
      />
      {{ title }}
      <UIcon
        name="i-lucide-chevron-right"
        class="ml-auto size-4 shrink-0 transition-transform group-open:rotate-90"
      />
    </summary>
    <div class="text-dimmed mt-2 [&>p]:my-0 [&>p+p]:mt-2 italic leading-relaxed">
      <slot />
    </div>
  </details>
</template>
