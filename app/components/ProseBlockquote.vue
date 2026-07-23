<template>
  <blockquote
    class="text-toned relative my-10 border-0 pl-8 pr-4 text-lg italic leading-relaxed [&>p]:m-0 [&>p+p]:mt-2"
  >
    <span
      aria-hidden="true"
      class="text-muted pointer-events-none absolute -top-1 left-0 font-serif text-3xl font-bold leading-none select-none"
      >&rdquo;</span
    >
    <span
      aria-hidden="true"
      class="border-accented absolute top-8 bottom-0 left-[5px] border-l"
    ></span>
    <slot />
  </blockquote>
</template>
