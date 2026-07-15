<script setup lang="ts">
import { publicUrl } from '@/utils/publicUrl'

defineProps<{
  title: string
  eyebrow?: string
  subtitle?: string
  image?: string
  compact?: boolean
}>()

const fallbackHero = publicUrl('images/hero-explore.jpg')
</script>

<template>
  <section class="hero" :class="{ compact }">
    <div class="hero-media" aria-hidden="true">
      <img
        :src="image || fallbackHero"
        alt=""
        loading="eager"
      />
      <div class="hero-shade" />
      <div class="hero-grain" />
    </div>
    <div class="container hero-copy">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      <div v-if="$slots.actions" class="actions">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: min(78vh, 720px);
  display: grid;
  align-items: end;
  color: white;
  overflow: hidden;
}

.hero.compact {
  min-height: min(48vh, 420px);
}

.hero-media {
  position: absolute;
  inset: 0;
}

.hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.04);
  animation: drift 18s var(--ease) infinite alternate;
}

.hero-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(10, 42, 32, 0.25) 0%, rgba(10, 42, 32, 0.55) 45%, rgba(10, 42, 32, 0.88) 100%),
    linear-gradient(90deg, rgba(10, 42, 32, 0.55), transparent 55%);
}

.hero-grain {
  position: absolute;
  inset: 0;
  opacity: 0.18;
  background:
    radial-gradient(circle at 20% 20%, rgba(240, 180, 41, 0.25), transparent 35%),
    radial-gradient(circle at 80% 30%, rgba(23, 111, 143, 0.28), transparent 40%);
  mix-blend-mode: screen;
}

.hero-copy {
  position: relative;
  z-index: 1;
  padding: clamp(3rem, 8vw, 5.5rem) 0 clamp(2.5rem, 6vw, 4rem);
  max-width: 920px;
}

.eyebrow {
  color: var(--sun);
}

h1 {
  color: white;
  font-size: clamp(2.6rem, 7vw, 4.8rem);
  max-width: 14ch;
  margin-bottom: 0.55rem;
  text-wrap: balance;
}

.subtitle {
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  max-width: 42ch;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

@keyframes drift {
  from {
    transform: scale(1.04) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.08) translate3d(-1.5%, -1%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-media img {
    animation: none;
  }
}
</style>
