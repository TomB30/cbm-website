<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Reveal from '@/components/Reveal.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import { site } from '@/content/site'
import { publicUrl } from '@/utils/publicUrl'

const highlights = [
  {
    title: 'Camp Builds Character',
    text: 'Belonging, kindness, independence — see what campers and parents say about a CBM summer.',
    to: '/explore/camp-builds-character',
    image: publicUrl('images/families.jpg'),
  },
  {
    title: 'See Camp in Action',
    text: 'Watch the magic: lakes, cabins, friendships, and the joy of Our Summer Place.',
    to: '/explore/camp-videos',
    image: publicUrl('images/beach-run.jpg'),
  },
  {
    title: 'Take a Tour',
    text: 'Join us on campus for Aug 6 or Sept 9 tours — or explore our virtual tour anytime.',
    to: '/explore/camptours',
    image: publicUrl('images/hero-lake.jpg'),
  },
]

const programs = [
  { title: '4-Week Sessions', text: 'Rising 3rd–11th grade — the classic CBM summer.', to: '/explore/our-programs' },
  { title: '2-Week Sessions', text: 'Rising 3rd–5th grade options across the summer.', to: '/explore/our-programs' },
  { title: 'CBM Experience', text: 'A 1-week taste of camp for rising 2nd & 3rd graders.', to: '/explore/cbm-experience' },
]
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <img :src="publicUrl('images/hero-explore.jpg')" alt="" />
        <div class="shade" />
      </div>
      <div class="container hero-content">
        <p class="brand-signal">Camp Barney Medintz</p>
        <h1>
          <span>{{ site.tagline }}</span>
        </h1>
        <p class="lede">
          Jewish overnight camp on 500+ acres in the North Georgia mountains — lifelong friends,
          adventure, and Jewish identity for rising 1st through 11th graders.
        </p>
        <div class="hero-actions">
          <RouterLink class="btn btn-primary" to="/enroll">Enroll for 2026</RouterLink>
          <RouterLink class="btn btn-secondary" to="/explore">Explore Camp</RouterLink>
        </div>
      </div>
    </section>

    <section class="section newsweek">
      <div class="container">
        <Reveal>
          <p class="eyebrow">America’s Best Summer Camps</p>
          <h2>See why Newsweek selected Camp Barney Medintz</h2>
          <p class="prose">
            For six decades, Camp Barney Medintz has provided the most magical Jewish summer overnight
            camping adventure for boys and girls. Surrounded by more than 500 acres in the picturesque
            North Georgia mountains, campers make lifelong friends, challenge themselves with new
            activities, and gain self-confidence and independence — while deepening their Jewish
            identity every day.
          </p>
        </Reveal>
      </div>
    </section>

    <section class="section-tight">
      <div class="container sessions">
        <Reveal>
          <p class="eyebrow">Summer 2026</p>
          <h2>Session dates</h2>
        </Reveal>
        <div class="session-grid">
          <Reveal v-for="session in site.sessions" :key="session.label">
            <article class="session">
              <h3>{{ session.label }}</h3>
              <p class="date">{{ session.date }}</p>
              <p>{{ session.detail }}</p>
            </article>
          </Reveal>
        </div>
        <RouterLink class="text-link" to="/explore/dates-and-rates">View all dates & rates →</RouterLink>
      </div>
    </section>

    <section class="section features">
      <div class="container">
        <Reveal>
          <p class="eyebrow">Start here</p>
          <h2>Experience the magic</h2>
        </Reveal>
        <div class="feature-grid">
          <Reveal v-for="item in highlights" :key="item.to">
            <RouterLink class="feature" :to="item.to">
              <div class="feature-img">
                <img :src="item.image" :alt="item.title" loading="lazy" />
              </div>
              <div class="feature-copy">
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
                <span>Learn more</span>
              </div>
            </RouterLink>
          </Reveal>
        </div>
      </div>
    </section>

    <section class="section programs">
      <div class="container split">
        <Reveal>
          <p class="eyebrow">Explore our programs</p>
          <h2>A summer sized for every camper</h2>
          <p class="prose">
            From first-time 1-week experiences to full 4-week sessions, Camp Barney offers options
            throughout the summer for rising 1st through 11th graders — with units based on rising grade.
          </p>
          <RouterLink class="btn btn-outline" to="/explore/our-programs">View programs</RouterLink>
        </Reveal>
        <div class="program-list">
          <Reveal v-for="p in programs" :key="p.title">
            <RouterLink class="program" :to="p.to">
              <h3>{{ p.title }}</h3>
              <p>{{ p.text }}</p>
            </RouterLink>
          </Reveal>
        </div>
      </div>
    </section>

    <section class="section atmosphere">
      <div class="container-wide mosaic">
        <img :src="publicUrl('images/horse.jpg')" alt="Camper with a horse at Camp Barney" loading="lazy" />
        <img :src="publicUrl('images/beach-run.jpg')" alt="Campers running on the beach" loading="lazy" />
        <img :src="publicUrl('images/families.jpg')" alt="Camp Barney community" loading="lazy" />
        <div class="mosaic-copy">
          <p class="eyebrow">Jewish overnight camp</p>
          <h2>Friendship. Adventure. Belonging.</h2>
          <p>
            Activities are endless and counselors are stellar — but the Camp Barney experience is about
            lifelong friendships, independence, and a lasting connection to Jewish identity.
          </p>
          <RouterLink class="btn btn-primary" to="/explore/why">Why families choose CBM</RouterLink>
        </div>
      </div>
    </section>

    <CtaBanner />
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: end;
  color: white;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: drift 20s var(--ease) infinite alternate;
}

.shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8, 32, 24, 0.2) 0%, rgba(8, 32, 24, 0.45) 40%, rgba(8, 32, 24, 0.92) 100%),
    linear-gradient(90deg, rgba(8, 32, 24, 0.65) 0%, transparent 60%);
}

.hero-content {
  position: relative;
  z-index: 1;
  padding: 0 0 clamp(3rem, 8vw, 5rem);
}

.brand-signal {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.35rem, 3.5vw, 2rem);
  letter-spacing: -0.03em;
  color: var(--sun);
  margin-bottom: 0.35rem;
}

h1 {
  color: white;
  font-size: clamp(3.2rem, 10vw, 6.5rem);
  margin: 0 0 0.75rem;
  max-width: 10ch;
}

.lede {
  max-width: 38ch;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  color: rgba(255, 255, 255, 0.92);
  margin-bottom: 1.5rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.newsweek h2 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  max-width: 18ch;
}

.session-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 1rem;
}

.session {
  padding: 1.35rem 1.4rem;
  border-radius: var(--radius);
  background: white;
  border: 1px solid var(--line);
  box-shadow: 0 10px 30px rgba(12, 51, 38, 0.05);
}

.session h3 {
  font-size: 1.15rem;
  margin-bottom: 0.35rem;
}

.date {
  font-weight: 700;
  color: var(--pine);
  margin-bottom: 0.2rem;
}

.text-link {
  font-weight: 700;
  text-decoration: none;
  color: var(--lake-deep);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.15rem;
  margin-top: 1.75rem;
}

.feature {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-radius: calc(var(--radius) + 0.15rem);
  overflow: hidden;
  background: white;
  border: 1px solid var(--line);
  transition:
    transform 0.3s var(--ease),
    box-shadow 0.3s var(--ease);
}

.feature:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.feature-img {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.feature-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s var(--ease);
}

.feature:hover .feature-img img {
  transform: scale(1.05);
}

.feature-copy {
  padding: 1.2rem 1.25rem 1.4rem;
}

.feature-copy h3 {
  font-size: 1.25rem;
  margin-bottom: 0.4rem;
}

.feature-copy p {
  color: var(--ink-soft);
  margin-bottom: 0.75rem;
  font-size: 0.98rem;
}

.feature-copy span {
  font-weight: 700;
  color: var(--lake-deep);
}

.programs {
  background:
    linear-gradient(180deg, transparent, rgba(217, 238, 247, 0.45) 40%, transparent);
}

.split {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: start;
}

.program-list {
  display: grid;
  gap: 0.85rem;
}

.program {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1.2rem 1.25rem;
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--line);
  transition: border-color 0.2s var(--ease), transform 0.2s var(--ease);
}

.program:hover {
  border-color: rgba(23, 111, 143, 0.35);
  transform: translateX(4px);
}

.program h3 {
  font-size: 1.15rem;
  margin-bottom: 0.25rem;
}

.program p {
  margin: 0;
  color: var(--ink-soft);
}

.mosaic {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr;
  grid-template-rows: 220px 280px;
  gap: 0.85rem;
}

.mosaic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius);
}

.mosaic img:nth-child(1) {
  grid-row: 1 / 3;
}

.mosaic-copy {
  grid-column: 2 / 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  border-radius: var(--radius);
  background: linear-gradient(145deg, var(--pine), var(--lake-deep));
  color: white;
}

.mosaic-copy .eyebrow {
  color: var(--sun);
}

.mosaic-copy h2 {
  color: white;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
}

.mosaic-copy p {
  color: rgba(255, 255, 255, 0.88);
  max-width: 42ch;
}

@keyframes drift {
  from {
    transform: scale(1.05);
  }
  to {
    transform: scale(1.1) translate(-1%, -1%);
  }
}

@media (max-width: 900px) {
  .feature-grid,
  .split,
  .session-grid {
    grid-template-columns: 1fr;
  }

  .mosaic {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .mosaic img:nth-child(1) {
    grid-row: auto;
    min-height: 240px;
  }

  .mosaic-copy {
    grid-column: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-bg img {
    animation: none;
  }
}
</style>
