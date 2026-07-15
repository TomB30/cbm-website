<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { site } from '@/content/site'
</script>

<template>
  <footer class="footer">
    <div class="footer-glow" aria-hidden="true" />
    <div class="container footer-grid">
      <div class="brand-block">
        <p class="eyebrow">Camp Barney Medintz</p>
        <h2>{{ site.tagline }}</h2>
        <p>
          Owned and operated by the
          <a :href="site.mjcca" target="_blank" rel="noopener">Marcus Jewish Community Center of Atlanta</a>.
        </p>
        <div class="social">
          <a :href="site.social.instagram" target="_blank" rel="noopener">Instagram</a>
          <a :href="site.social.facebook" target="_blank" rel="noopener">Facebook</a>
          <a :href="site.social.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a :href="site.social.spotify" target="_blank" rel="noopener">Spotify</a>
        </div>
      </div>

      <div>
        <h3>Quick Links</h3>
        <ul>
          <li><RouterLink to="/explore">Explore CBM</RouterLink></li>
          <li><RouterLink to="/current-families">Current Families</RouterLink></li>
          <li><RouterLink to="/staff">Work at Camp</RouterLink></li>
          <li><RouterLink to="/alumni">Alumni</RouterLink></li>
          <li><RouterLink to="/enroll">Enroll</RouterLink></li>
          <li><RouterLink to="/donate">Donate</RouterLink></li>
          <li><RouterLink to="/emails">Email Updates</RouterLink></li>
          <li><a :href="site.accountLogin" target="_blank" rel="noopener">Account Login</a></li>
        </ul>
      </div>

      <div>
        <h3>{{ site.addresses.winter.label }}</h3>
        <p v-for="line in site.addresses.winter.lines" :key="line">{{ line }}</p>
        <p class="phone"><a :href="`tel:${site.phone.replace(/\./g, '')}`">{{ site.phone }}</a></p>
        <h3 class="mt">{{ site.addresses.summer.label }}</h3>
        <p v-for="line in site.addresses.summer.lines" :key="line">{{ line }}</p>
      </div>

      <div>
        <h3>Next Steps</h3>
        <div class="cta-stack">
          <RouterLink class="btn btn-primary" to="/enroll">Enroll</RouterLink>
          <RouterLink class="btn btn-outline light" to="/request-info">Request More Info</RouterLink>
          <RouterLink class="btn btn-outline light" to="/contact">Contact Us</RouterLink>
        </div>
        <p class="mjcca-note">
          More MJCCA summer options:
          <a :href="site.dayCamps" target="_blank" rel="noopener">MJCCA Day Camps</a>
        </p>
      </div>
    </div>

    <div class="container inclusion">
      <p>
        The MJCCA’s Inclusion Program strives to provide the necessary accommodations and flexibility
        for youth who require additional support so they may access the transformative opportunities
        available at the MJCCA. Our Inclusion Team collaborates with parents, educators, and staff to
        determine if successful program placement is possible.
      </p>
    </div>

    <div class="container legal">
      <p>© {{ new Date().getFullYear() }} Camp Barney Medintz. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  margin-top: auto;
  background: linear-gradient(165deg, #0a2a20 0%, var(--pine) 45%, #0d3d4f 100%);
  color: rgba(255, 255, 255, 0.86);
  padding: 4.5rem 0 2rem;
  overflow: hidden;
}

.footer-glow {
  position: absolute;
  width: 28rem;
  height: 28rem;
  right: -8rem;
  top: -10rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(240, 180, 41, 0.22), transparent 65%);
  pointer-events: none;
}

.footer-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.1fr 1fr;
  gap: 2rem;
}

.brand-block h2 {
  color: white;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  margin-bottom: 0.75rem;
}

.brand-block .eyebrow {
  color: var(--sun);
}

.footer a {
  color: rgba(255, 255, 255, 0.88);
}

.footer a:hover {
  color: var(--sun);
}

.social {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.25rem;
}

.social a {
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  padding-bottom: 0.1rem;
}

h3 {
  color: white;
  font-size: 1rem;
  margin-bottom: 0.85rem;
}

.mt {
  margin-top: 1.5rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: 0.45rem;
}

li a {
  text-decoration: none;
  font-weight: 500;
}

.phone {
  margin-top: 0.75rem;
  font-weight: 700;
}

.cta-stack {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  align-items: stretch;
}

.light {
  color: white;
  border-color: rgba(255, 255, 255, 0.35);
}

.light:hover {
  background: white;
  color: var(--pine);
}

.mjcca-note {
  margin-top: 1.25rem;
  font-size: 0.92rem;
}

.inclusion {
  position: relative;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.65);
  max-width: 900px;
}

.legal {
  position: relative;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.55);
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
