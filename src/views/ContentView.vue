<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHero from '@/components/PageHero.vue'
import ContentBlocks from '@/components/ContentBlocks.vue'
import SectionNav from '@/components/SectionNav.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import Reveal from '@/components/Reveal.vue'
import { getBreadcrumbs, getSectionNav, loadPageByPath } from '@/content/site'
import type { PageContent } from '@/content/types'
import { publicUrl } from '@/utils/publicUrl'

const route = useRoute()
const page = ref<PageContent | null>(null)
const loading = ref(true)

watch(
  () => route.path,
  async (path) => {
    const next = await loadPageByPath(path)
    page.value = next ?? null
    loading.value = false
  },
  { immediate: true },
)

const sectionNav = computed(() => (page.value ? getSectionNav(page.value) : null))
const crumbs = computed(() => (page.value ? getBreadcrumbs(page.value) : []))
const isSectionRoot = computed(
  () => !!page.value && !!sectionNav.value && page.value.id === sectionNav.value.root.id,
)
const cleanTitle = computed(() => page.value?.title.replace(/^🏕️\s*/, '') ?? 'Page')
const heroImage = computed(() => page.value?.images[0] || publicUrl('images/hero-lake.jpg'))
const subtitle = computed(() => {
  if (!page.value) return ''
  if (page.value.excerpt) return page.value.excerpt
  const first = page.value.blocks.find((b) => b.type === 'paragraph' && b.text)
  return first?.text?.slice(0, 160) ?? ''
})
</script>

<template>
  <div v-if="loading" class="loading section">
    <div class="container">
      <p>Loading…</p>
    </div>
  </div>

  <div v-else-if="page" class="content-page">
    <SectionNav
      v-if="sectionNav"
      :root="sectionNav.root"
      :items="sectionNav.items"
      :current-path="page.path"
    />

    <PageHero
      v-if="isSectionRoot || !sectionNav"
      :title="cleanTitle"
      :subtitle="subtitle"
      :image="heroImage"
      eyebrow="Camp Barney Medintz"
      compact
    />

    <div id="page-body" class="page-body">
      <header v-if="sectionNav && !isSectionRoot" class="page-title container">
        <nav v-if="crumbs.length > 1" class="breadcrumbs" aria-label="Breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <template v-for="crumb in crumbs" :key="crumb.id">
            <span aria-hidden="true">/</span>
            <RouterLink :to="crumb.path">
              {{ crumb.title.replace(/^🏕️\s*/, '') }}
            </RouterLink>
          </template>
        </nav>
        <h1>{{ cleanTitle }}</h1>
      </header>

      <section class="section content-section">
        <div class="container">
          <nav
            v-if="(!sectionNav || isSectionRoot) && crumbs.length > 1"
            class="breadcrumbs"
            aria-label="Breadcrumb"
          >
            <RouterLink to="/">Home</RouterLink>
            <template v-for="crumb in crumbs" :key="crumb.id">
              <span aria-hidden="true">/</span>
              <RouterLink :to="crumb.path">{{ crumb.title.replace(/^🏕️\s*/, '') }}</RouterLink>
            </template>
          </nav>

          <Reveal>
            <ContentBlocks
              :html="page.contentHtml"
              :blocks="page.blocks"
              :text="page.contentText"
            />
          </Reveal>

          <div v-if="!page.contentHtml && page.images.length > 1" class="gallery">
            <img
              v-for="(src, i) in page.images.slice(0, 4)"
              :key="src"
              :src="src"
              :alt="`${cleanTitle} photo ${i + 1}`"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>

    <CtaBanner />
  </div>

  <div v-else class="loading section">
    <div class="container">
      <p>Trail not found.</p>
      <RouterLink class="btn btn-primary" to="/">Back to home</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.page-body {
  scroll-margin-top: calc(var(--header-h) + 3.5rem);
}

.page-title {
  padding-top: clamp(1.75rem, 4vw, 2.5rem);
}

.page-title h1 {
  font-size: clamp(1.85rem, 4vw, 2.6rem);
  margin-bottom: 0;
  max-width: none;
}

.content-section {
  padding-top: clamp(1.5rem, 3vw, 2.25rem);
}

.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--ink-soft);
}

.breadcrumbs a {
  text-decoration: none;
  color: var(--lake-deep);
}

.breadcrumbs a:hover {
  color: var(--pine);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 2rem;
}

.gallery img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 1rem;
}

.loading {
  min-height: 40vh;
}
</style>
