import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import { registry } from '@/content/site'

function normalizePath(path: string): string {
  if (!path || path === '/') return '/'
  return '/' + path.replace(/^\/+|\/+$/g, '')
}

const contentRoutes = registry
  .filter((page) => normalizePath(page.path) !== '/')
  .map((page) => ({
    path: normalizePath(page.path),
    name: `page-${page.id}`,
    component: () => import('@/views/ContentView.vue'),
    meta: { title: page.title },
  }))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: { title: 'Camp Barney Medintz | Jewish Overnight Camp in Georgia' },
        },
        ...contentRoutes,
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/views/NotFoundView.vue'),
          meta: { title: 'Page Not Found' },
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    return new Promise((resolve) => {
      // Wait for the new page content to paint, then ease back to the top
      requestAnimationFrame(() => {
        setTimeout(() => {
          resolve({ top: 0, behavior: 'smooth' })
        }, 50)
      })
    })
  },
})

router.afterEach((to) => {
  const title = (to.meta.title as string) || 'Camp Barney Medintz'
  document.title = title.includes('Camp Barney') ? title : `${title} | Camp Barney Medintz`
})

export default router
