<template>
  <blockquote class="my-8 flex gap-4 rounded-r border-l-4 border-primary bg-elevated/50 px-5 py-4 not-italic">
    <UIcon name="i-lucide-quote" class="text-primary mt-0.5 size-5 shrink-0 opacity-60" />
    <div class="text-toned text-base leading-relaxed [&>p]:m-0">
      <slot />
    </div>
  </blockquote>
</template>
