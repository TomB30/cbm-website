<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { site } from '@/content/site'

const route = useRoute()
const open = ref(false)
const scrolled = ref(false)
const openMenu = ref<string | null>(null)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function close() {
  open.value = false
  openMenu.value = null
}

function toggleMenu(label: string) {
  openMenu.value = openMenu.value === label ? null : label
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

watch(
  () => route.fullPath,
  () => {
    close()
  },
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="header" :class="{ scrolled, open }">
    <div class="header-bar">
      <div class="container-wide header-inner">
        <RouterLink class="brand" to="/" @click="close">
          <span class="brand-mark" aria-hidden="true">CBM</span>
          <span class="brand-text">
            <strong>Camp Barney Medintz</strong>
            <em>{{ site.tagline }}</em>
          </span>
        </RouterLink>

        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="open"
          aria-controls="primary-nav"
          @click="open = !open"
        >
          <span class="sr-only">Menu</span>
          <span /><span /><span />
        </button>

        <nav id="primary-nav" class="nav desktop-nav" aria-label="Primary">
          <ul class="nav-main">
            <li v-for="item in site.nav" :key="item.label" class="nav-item">
              <div class="nav-link-row">
                <RouterLink
                  :to="item.to"
                  class="nav-link"
                  :class="{ active: route.path === item.to || route.path.startsWith(item.to + '/') }"
                >
                  {{ item.label }}
                </RouterLink>
              </div>
              <ul v-if="item.children?.length" class="submenu">
                <li v-for="child in item.children" :key="child.to">
                  <RouterLink :to="child.to">{{ child.label }}</RouterLink>
                </li>
              </ul>
            </li>
          </ul>

          <div class="nav-utility">
            <a class="login" :href="site.accountLogin" target="_blank" rel="noopener">Account Login</a>
            <RouterLink
              v-for="item in site.utility"
              :key="item.to"
              :to="item.to"
              class="btn"
              :class="item.primary ? 'btn-primary' : 'btn-outline util'"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </nav>
      </div>
    </div>

    <div class="mobile-panel" :class="{ open }" :aria-hidden="!open">
      <nav class="mobile-nav" aria-label="Mobile">
        <ul class="nav-main">
          <li v-for="item in site.nav" :key="item.label" class="nav-item">
            <div class="nav-link-row">
              <RouterLink
                :to="item.to"
                class="nav-link"
                :class="{ active: route.path === item.to || route.path.startsWith(item.to + '/') }"
                @click="close"
              >
                {{ item.label }}
              </RouterLink>
              <button
                v-if="item.children?.length"
                class="chevron"
                type="button"
                :aria-expanded="openMenu === item.label"
                @click="toggleMenu(item.label)"
              >
                <span class="sr-only">Show {{ item.label }} submenu</span>
                ▾
              </button>
            </div>
            <ul
              v-if="item.children?.length"
              class="submenu"
              :class="{ show: openMenu === item.label }"
            >
              <li v-for="child in item.children" :key="child.to">
                <RouterLink :to="child.to" @click="close">{{ child.label }}</RouterLink>
              </li>
            </ul>
          </li>
        </ul>

        <div class="nav-utility">
          <a class="login" :href="site.accountLogin" target="_blank" rel="noopener">Account Login</a>
          <RouterLink
            v-for="item in site.utility"
            :key="`m-${item.to}`"
            :to="item.to"
            class="btn"
            :class="item.primary ? 'btn-primary' : 'btn-outline util'"
            @click="close"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-bar {
  position: relative;
  z-index: 2;
  height: var(--header-h);
  background: rgba(251, 252, 251, 0.88);
  backdrop-filter: blur(14px);
  transition:
    background 0.3s var(--ease),
    box-shadow 0.3s var(--ease);
}

.header.scrolled .header-bar,
.header.open .header-bar {
  background: rgba(251, 252, 251, 0.96);
  box-shadow: 0 1px 0 var(--line);
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--pine);
  min-width: 0;
}

.brand-mark {
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 0.85rem;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, var(--pine-mid), var(--lake));
  color: white;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  min-width: 0;
}

.brand-text strong {
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 2.2vw, 1.15rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.brand-text em {
  font-style: normal;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--lake);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.menu-toggle {
  display: none;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  background: transparent;
  padding: 0.65rem;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  cursor: pointer;
  z-index: 3;
}

.menu-toggle span {
  display: block;
  height: 2px;
  background: var(--pine);
  border-radius: 2px;
  transition: 0.25s var(--ease);
}

.header.open .menu-toggle span:nth-child(2) {
  transform: translateY(7px) rotate(45deg);
}
.header.open .menu-toggle span:nth-child(3) {
  opacity: 0;
}
.header.open .menu-toggle span:nth-child(4) {
  transform: translateY(-7px) rotate(-45deg);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.nav-main {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link-row {
  display: flex;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--ink-soft);
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.55rem 0.7rem;
  border-radius: 999px;
  transition: 0.2s var(--ease);
}

.nav-link:hover,
.nav-link.active {
  color: var(--pine);
  background: rgba(12, 51, 38, 0.06);
}

.chevron {
  border: 0;
  background: transparent;
  color: var(--ink-soft);
  cursor: pointer;
  padding: 0.35rem;
  display: inline-flex;
  font-size: 1rem;
}

.submenu {
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  min-width: 15rem;
  background: white;
  border: 1px solid var(--line);
  border-radius: 1rem;
  padding: 0.55rem;
  list-style: none;
  margin: 0;
  box-shadow: var(--shadow);
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition: 0.2s var(--ease);
}

.nav-item:hover .submenu {
  opacity: 1;
  pointer-events: auto;
  transform: none;
}

.submenu a {
  display: block;
  text-decoration: none;
  color: var(--ink-soft);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.65rem;
}

.submenu a:hover {
  background: var(--mist);
  color: var(--pine);
}

.nav-utility {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.login {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ink-soft);
  text-decoration: none;
  margin-right: 0.25rem;
}

.login:hover {
  color: var(--pine);
}

.util {
  min-height: 2.5rem;
  padding: 0.45rem 0.95rem;
  font-size: 0.85rem;
}

.mobile-panel {
  display: none;
}

@media (max-width: 980px) {
  .menu-toggle {
    display: flex;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-panel {
    display: block;
    position: fixed;
    top: var(--header-h);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(251, 252, 251, 0.98);
    transform: translateX(100%);
    transition: transform 0.35s var(--ease);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .mobile-panel.open {
    transform: none;
  }

  .mobile-nav {
    padding: 1rem 1.25rem 2.5rem;
  }

  .mobile-nav .nav-main {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }

  .mobile-nav .submenu {
    position: static;
    opacity: 1;
    pointer-events: auto;
    transform: none;
    display: none;
    box-shadow: none;
    border: 0;
    background: transparent;
    padding: 0.25rem 0 0.5rem 0.75rem;
  }

  .mobile-nav .submenu.show {
    display: block;
  }

  .mobile-nav .nav-utility {
    flex-wrap: wrap;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--line);
  }
}
</style>
