<script setup lang="ts">
import { computed } from 'vue'
import type { ContentBlock } from '@/content/types'

const props = defineProps<{
  html?: string
  blocks?: ContentBlock[]
  text?: string
}>()

const hasHtml = computed(() => !!props.html?.trim())
const hasBlocks = computed(() => !!props.blocks?.length)

const paragraphs = computed(() => {
  if (!props.text?.trim()) return []
  return props.text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && p !== '-->')
})
</script>

<template>
  <div v-if="hasHtml" class="rich-content" v-html="html" />

  <div v-else-if="hasBlocks" class="rich-content">
    <template v-for="(block, i) in blocks" :key="i">
      <component
        :is="block.level === 3 ? 'h3' : 'h2'"
        v-if="block.type === 'heading' && block.text"
      >
        {{ block.text }}
      </component>
      <p v-else-if="block.type === 'paragraph' && block.text">{{ block.text }}</p>
      <ul v-else-if="block.type === 'list' && block.items?.length">
        <li v-for="(item, j) in block.items" :key="j">{{ item }}</li>
      </ul>
    </template>
  </div>

  <div v-else-if="paragraphs.length" class="rich-content">
    <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
  </div>

  <p v-else class="rich-content empty">Content for this page is being refreshed. Please check back soon.</p>
</template>

<style scoped>
.rich-content {
  font-size: 1.05rem;
  color: var(--ink-soft);
  line-height: 1.7;
  width: 100%;
  max-width: none;
}

.rich-content.empty {
  opacity: 0.8;
}

.rich-content :deep(h2),
.rich-content :deep(h3),
.rich-content :deep(h4) {
  color: var(--pine);
  font-family: var(--font-display);
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 1.6em 0 0.55em;
  scroll-margin-top: 7rem;
}

.rich-content :deep(h2) {
  font-size: clamp(1.55rem, 3vw, 2rem);
}

.rich-content :deep(h3) {
  font-size: clamp(1.25rem, 2.4vw, 1.55rem);
}

.rich-content :deep(h4) {
  font-size: 1.1rem;
  margin-top: 1.35em;
}

.rich-content :deep(p) {
  margin: 0 0 1em;
}

.rich-content :deep(a) {
  color: var(--lake-deep);
  font-weight: 600;
  text-underline-offset: 0.18em;
}

.rich-content :deep(ul),
.rich-content :deep(ol) {
  padding-left: 1.25rem;
  margin: 0 0 1.1em;
}

.rich-content :deep(li) {
  margin-bottom: 0.4rem;
}

/* Hide leftover empty bullets from old WP sliders/galleries */
.rich-content :deep(li:empty),
.rich-content :deep(ul:not(:has(li:not(:empty)))),
.rich-content :deep(ol:not(:has(li:not(:empty)))) {
  display: none;
}

.rich-content :deep(blockquote) {
  margin: 1.25rem 0;
  padding: 0.85rem 1.1rem;
  border-left: 3px solid var(--sun);
  background: rgba(238, 245, 241, 0.7);
  border-radius: 0 0.75rem 0.75rem 0;
  color: var(--ink);
}

.rich-content :deep(.photo-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
  margin: 1rem 0 1.5rem;
  width: 100%;
}

.rich-content :deep(.photo-grid img) {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  margin: 0;
  border-radius: 0.85rem;
  box-shadow: 0 8px 22px rgba(12, 51, 38, 0.1);
}

/* Default content images — never stretch full page width */
.rich-content :deep(img) {
  display: block;
  width: auto;
  max-width: min(100%, 360px);
  height: auto;
  border-radius: 1rem;
  margin: 0.75rem 0 1.15rem;
  box-shadow: 0 12px 30px rgba(12, 51, 38, 0.1);
}

.rich-content :deep(img.content-logo),
.rich-content :deep(a:not(:has(.media-photo, .staff-photo)) > img:not(.media-photo):not(.staff-photo)) {
  max-width: min(100%, 220px);
  border-radius: 0.5rem;
  box-shadow: none;
  margin: 0.5rem 1.25rem 0.75rem 0;
}

.rich-content :deep(p > a > img:not(.media-photo):not(.staff-photo)),
.rich-content :deep(p > img:not(.media-photo):not(.staff-photo)) {
  display: inline-block;
  vertical-align: middle;
  margin: 0.35rem 1rem 0.35rem 0;
}

.rich-content :deep(.staff-photo),
.rich-content :deep(.media-photo) {
  display: block;
}

.rich-content :deep(.embed-media) {
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  margin: 0.85rem 0 1.25rem;
  border-radius: 1rem;
  overflow: hidden;
  background: #0b1f18;
  box-shadow: 0 14px 34px rgba(12, 51, 38, 0.16);
}

.rich-content :deep(.embed-media + .embed-media) {
  margin-left: 0;
}

.rich-content :deep(.embed-media iframe) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.rich-content :deep(.staff-card) {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 1.35rem 1.75rem;
  align-items: start;
  margin: 0 0 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--line);
}

.rich-content :deep(.staff-card:last-child) {
  border-bottom: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}

.rich-content :deep(.staff-photo) {
  width: 200px;
  max-width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center top;
  border-radius: 1rem;
  margin: 0;
  box-shadow: 0 10px 26px rgba(12, 51, 38, 0.12);
}

.rich-content :deep(.staff-bio) {
  min-width: 0;
}

.rich-content :deep(.staff-bio h2) {
  margin-top: 0;
  font-size: clamp(1.2rem, 2.2vw, 1.55rem);
}

.rich-content :deep(.staff-bio p:first-of-type) {
  margin-top: 0.15rem;
}

.rich-content :deep(.media-card) {
  display: grid;
  grid-template-columns: minmax(200px, 280px) minmax(0, 1fr);
  gap: 1.25rem 1.75rem;
  align-items: start;
  margin: 0 0 2rem;
}

.rich-content :deep(.media-card.media-left) {
  grid-template-columns: minmax(200px, 280px) minmax(0, 1fr);
}

.rich-content :deep(.media-card.media-right) {
  grid-template-columns: minmax(0, 1fr) minmax(200px, 280px);
}

.rich-content :deep(.media-card.media-right) .media-photo {
  order: 2;
}

.rich-content :deep(.media-card.media-right) .media-copy {
  order: 1;
}

.rich-content :deep(.media-photo) {
  width: 100%;
  max-width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 1rem;
  margin: 0;
  box-shadow: 0 10px 26px rgba(12, 51, 38, 0.12);
}

/* Partner logos inside media cards should stay compact */
.rich-content :deep(.media-card a .media-photo),
.rich-content :deep(.media-photo[src*='logo' i]),
.rich-content :deep(.media-photo[src*='one-happy-camper' i]) {
  aspect-ratio: auto;
  width: auto;
  max-width: 200px;
  max-height: 140px;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: none;
  background: transparent;
}

.rich-content :deep(.media-card:has(a .media-photo), .media-card:has(.media-photo[src*='logo' i])) {
  grid-template-columns: minmax(140px, 200px) minmax(0, 1fr);
  align-items: center;
}

.rich-content :deep(.media-copy) {
  min-width: 0;
}

.rich-content :deep(.media-copy h2),
.rich-content :deep(.media-copy h3) {
  margin-top: 0;
}

.rich-content :deep(.media-copy > :first-child) {
  margin-top: 0;
}

@media (max-width: 720px) {
  .rich-content :deep(.staff-card),
  .rich-content :deep(.media-card),
  .rich-content :deep(.media-card.media-right) {
    grid-template-columns: 1fr;
  }

  .rich-content :deep(.staff-photo) {
    width: min(220px, 55vw);
  }

  .rich-content :deep(.media-card.media-right) .media-photo,
  .rich-content :deep(.media-card.media-right) .media-copy {
    order: initial;
  }
}

.rich-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0 1.4rem;
  font-size: 0.98rem;
  overflow-x: auto;
  display: block;
}

.rich-content :deep(th),
.rich-content :deep(td) {
  border: 1px solid var(--line);
  padding: 0.65rem 0.75rem;
  text-align: left;
}

.rich-content :deep(th) {
  background: var(--mist);
  color: var(--pine);
}

.rich-content :deep(strong),
.rich-content :deep(b) {
  color: var(--ink);
}

.rich-content :deep(em) {
  color: var(--ink-soft);
}
</style>
