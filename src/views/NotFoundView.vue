<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="missing section">
    <div class="container">
      <p class="eyebrow">404</p>
      <h1>Trail not found</h1>
      <p class="prose">
        That page isn’t on our map. Head back to camp and explore from the home page.
      </p>
      <RouterLink class="btn btn-primary" to="/">Back to home</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.missing {
  min-height: 60vh;
  display: grid;
  align-items: center;
}

h1 {
  font-size: clamp(2.4rem, 6vw, 4rem);
}
</style>
