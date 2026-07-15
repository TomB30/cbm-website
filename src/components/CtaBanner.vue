<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    title?: string
    text?: string
  }>(),
  {
    title: 'Ready for Our Summer Place?',
    text: 'Registration for Summer 2026 is open. Take a tour, explore programs, or enroll today.',
  },
)
</script>

<template>
  <section class="cta section">
    <div class="container panel">
      <div>
        <h2>{{ title }}</h2>
        <p>{{ text }}</p>
      </div>
      <div class="actions">
        <RouterLink class="btn btn-primary" to="/enroll">Enroll Now</RouterLink>
        <RouterLink class="btn btn-secondary" to="/explore/camptours">Tour Camp</RouterLink>
        <RouterLink class="btn btn-secondary" to="/request-info">Request Info</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-top: 0;
}

.panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1.75rem, 4vw, 2.5rem);
  border-radius: calc(var(--radius) + 0.35rem);
  background:
    radial-gradient(600px 200px at 100% 0%, rgba(240, 180, 41, 0.28), transparent 55%),
    linear-gradient(135deg, var(--pine) 0%, #114d3a 55%, var(--lake-deep) 100%);
  color: white;
  box-shadow: var(--shadow);
}

h2 {
  color: white;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin-bottom: 0.4rem;
}

p {
  margin: 0;
  max-width: 42ch;
  color: rgba(255, 255, 255, 0.88);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}
</style>
