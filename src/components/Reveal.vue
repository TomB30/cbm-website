<script setup lang="ts">
import { onMounted, ref } from 'vue'

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const node = el.value
  if (!node) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    node.classList.add('is-visible')
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )
  io.observe(node)
})
</script>

<template>
  <div ref="el" class="reveal">
    <slot />
  </div>
</template>
