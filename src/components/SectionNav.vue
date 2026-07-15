<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import type { PageMeta } from '@/content/types'

const props = defineProps<{
  root: PageMeta
  items: PageMeta[]
  currentPath: string
}>()

const scroller = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function clean(title: string) {
  return title.replace(/^🏕️\s*/, '').replace(/\s*🎵\s*$/, '').trim()
}

/** Prefer the longest matching section path so nested pages highlight correctly. */
function activeItemPath(current: string): string | null {
  if (current === props.root.path) return null
  let best: string | null = null
  for (const item of props.items) {
    if (current === item.path || current.startsWith(`${item.path}/`)) {
      if (!best || item.path.length > best.length) best = item.path
    }
  }
  return best
}

function isChipActive(path: string) {
  return activeItemPath(props.currentPath) === path
}

function updateOverflow() {
  const track = scroller.value
  if (!track) {
    canScrollLeft.value = false
    canScrollRight.value = false
    return
  }
  const max = track.scrollWidth - track.clientWidth
  canScrollLeft.value = track.scrollLeft > 4
  canScrollRight.value = max > 4 && track.scrollLeft < max - 4
}

function scrollByDir(dir: -1 | 1) {
  const track = scroller.value
  if (!track) return
  track.scrollBy({ left: dir * Math.max(180, track.clientWidth * 0.55), behavior: 'smooth' })
}

function scrollChipIntoView(path: string | null, behavior: ScrollBehavior = 'smooth') {
  const track = scroller.value
  if (!track || !path) {
    updateOverflow()
    return
  }
  const chip = Array.from(track.querySelectorAll<HTMLElement>('[data-path]')).find(
    (el) => el.dataset.path === path,
  )
  if (!chip) {
    updateOverflow()
    return
  }

  const chipLeft = chip.offsetLeft
  const chipRight = chipLeft + chip.offsetWidth
  const viewLeft = track.scrollLeft
  const viewRight = viewLeft + track.clientWidth
  const pad = 24

  // Only nudge if the chip is clipped — don't re-center every click
  if (chipLeft < viewLeft + pad) {
    track.scrollTo({ left: Math.max(0, chipLeft - pad), behavior })
  } else if (chipRight > viewRight - pad) {
    track.scrollTo({ left: chipRight - track.clientWidth + pad, behavior })
  }
  updateOverflow()
}

async function syncToCurrent(behavior: ScrollBehavior = 'smooth') {
  await nextTick()
  scrollChipIntoView(activeItemPath(props.currentPath), behavior)
  updateOverflow()
}

function onChipClick(event: MouseEvent, path: string) {
  // Bring the chip the user actually clicked into view immediately
  const chip = event.currentTarget as HTMLElement
  const track = scroller.value
  if (!track || !chip) return
  const chipLeft = chip.offsetLeft
  const chipRight = chipLeft + chip.offsetWidth
  const viewLeft = track.scrollLeft
  const viewRight = viewLeft + track.clientWidth
  const pad = 24
  if (chipLeft < viewLeft + pad) {
    track.scrollTo({ left: Math.max(0, chipLeft - pad), behavior: 'smooth' })
  } else if (chipRight > viewRight - pad) {
    track.scrollTo({ left: chipRight - track.clientWidth + pad, behavior: 'smooth' })
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const track = scroller.value
  if (track) {
    track.addEventListener('scroll', updateOverflow, { passive: true })
    resizeObserver = new ResizeObserver(() => updateOverflow())
    resizeObserver.observe(track)
  }
  syncToCurrent('auto')
  window.addEventListener('resize', updateOverflow)
})

onUnmounted(() => {
  scroller.value?.removeEventListener('scroll', updateOverflow)
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateOverflow)
})

watch(
  () => props.currentPath,
  () => {
    // Wait until active classes reflect the new page, then gently reveal if needed
    syncToCurrent('smooth')
  },
)
</script>

<template>
  <nav class="section-nav" aria-label="Section navigation">
    <div class="container section-nav-inner">
      <RouterLink class="overview" :to="root.path" :class="{ active: currentPath === root.path }">
        {{ clean(root.title) }}
      </RouterLink>

      <div class="track-wrap" :class="{ 'has-left': canScrollLeft, 'has-right': canScrollRight }">
        <button
          v-show="canScrollLeft"
          type="button"
          class="scroll-btn left"
          aria-label="Scroll section links left"
          @click="scrollByDir(-1)"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div ref="scroller" class="track">
          <RouterLink
            v-for="item in items"
            :key="item.id"
            :to="item.path"
            class="chip"
            :data-path="item.path"
            :class="{ active: isChipActive(item.path) }"
            @click="onChipClick($event, item.path)"
          >
            {{ clean(item.title) }}
          </RouterLink>
        </div>

        <button
          v-show="canScrollRight"
          type="button"
          class="scroll-btn right"
          aria-label="Scroll section links right"
          @click="scrollByDir(1)"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.section-nav {
  position: sticky;
  top: var(--header-h);
  z-index: 40;
  background: rgba(251, 252, 251, 0.94);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.section-nav-inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 3.25rem;
  padding-block: 0.45rem;
}

.overview {
  flex-shrink: 0;
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--pine);
  padding: 0.4rem 0.75rem 0.4rem 0;
  border-right: 1px solid var(--line);
  margin-right: 0.15rem;
  white-space: nowrap;
  max-width: 11rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.overview.active {
  color: var(--lake-deep);
}

.track-wrap {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
}

.track-wrap::before,
.track-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2rem;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s var(--ease);
}

.track-wrap::before {
  left: 0;
  background: linear-gradient(90deg, rgba(251, 252, 251, 0.98), transparent);
}

.track-wrap::after {
  right: 0;
  background: linear-gradient(270deg, rgba(251, 252, 251, 0.98), transparent);
}

.track-wrap.has-left::before,
.track-wrap.has-right::after {
  opacity: 1;
}

.track {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding-block: 0.15rem;
  padding-inline: 0.15rem;
  scroll-padding-inline: 2.5rem;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}

.track::-webkit-scrollbar {
  display: none;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 999px;
  border: 1px solid rgba(12, 51, 38, 0.14);
  background: white;
  color: var(--pine);
  box-shadow: 0 4px 14px rgba(12, 51, 38, 0.12);
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 0;
  font-size: 1.25rem;
  line-height: 1;
  transition:
    background 0.2s var(--ease),
    transform 0.2s var(--ease);
}

.scroll-btn:hover {
  background: var(--mist);
}

.scroll-btn.left {
  left: 0.1rem;
}

.scroll-btn.right {
  right: 0.1rem;
}

.scroll-btn span {
  display: block;
  margin-top: -0.1rem;
}

.chip {
  flex-shrink: 0;
  text-decoration: none;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--ink-soft);
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  border: 1px solid transparent;
  white-space: nowrap;
  transition:
    background 0.2s var(--ease),
    color 0.2s var(--ease),
    border-color 0.2s var(--ease);
}

.chip:hover {
  color: var(--pine);
  background: rgba(12, 51, 38, 0.06);
}

.chip.active {
  color: var(--pine);
  background: white;
  border-color: rgba(12, 51, 38, 0.16);
  box-shadow: 0 4px 14px rgba(12, 51, 38, 0.08);
}

@media (max-width: 640px) {
  .overview {
    max-width: 7.5rem;
    font-size: 0.82rem;
  }

  .chip {
    font-size: 0.8rem;
    padding: 0.4rem 0.7rem;
  }
}
</style>
