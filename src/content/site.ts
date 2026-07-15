import type { PageContent, PageMeta } from './types'
import registryData from './registry.json'

export const registry = registryData as PageMeta[]

const modules = import.meta.glob('./pages/*.json') as Record<
  string,
  () => Promise<{ default: PageContent }>
>

const cache = new Map<string, PageContent>()

export function normalizePath(path: string): string {
  if (!path || path === '/') return '/'
  return '/' + path.replace(/^\/+|\/+$/g, '')
}

function fileKeyForPath(path: string): string | undefined {
  const normalized = normalizePath(path)
  const safe = normalized === '/' ? 'home' : normalized.replace(/^\//, '').replace(/\//g, '__')
  const key = `./pages/${safe}.json`
  return modules[key] ? key : undefined
}

export async function loadPageByPath(path: string): Promise<PageContent | undefined> {
  const normalized = normalizePath(path)
  if (cache.has(normalized)) return cache.get(normalized)

  const key = fileKeyForPath(normalized)
  if (!key) return undefined

  const mod = await modules[key]!()
  const page = { ...mod.default, path: normalizePath(mod.default.path) }
  cache.set(normalized, page)
  return page
}

export function getChildren(parentId: number): PageMeta[] {
  return registry
    .filter((p) => p.parent === parentId)
    .map((p) => ({ ...p, path: normalizePath(p.path) }))
    .sort((a, b) => a.menuOrder - b.menuOrder || a.title.localeCompare(b.title))
}

export function getBreadcrumbs(page: PageMeta): PageMeta[] {
  const crumbs: PageMeta[] = []
  let current: PageMeta | undefined = page
  const guard = new Set<number>()
  while (current && !guard.has(current.id)) {
    guard.add(current.id)
    crumbs.unshift({ ...current, path: normalizePath(current.path) })
    current = current.parent ? registry.find((p) => p.id === current!.parent) : undefined
  }
  return crumbs
}

export function getPageMetaById(id: number): PageMeta | undefined {
  const page = registry.find((p) => p.id === id)
  return page ? { ...page, path: normalizePath(page.path) } : undefined
}

/** Top-level section hub for a page (e.g. Explore, Current Families). */
export function getSectionRoot(page: PageMeta): PageMeta | undefined {
  const crumbs = getBreadcrumbs(page)
  return crumbs[0]
}

/** Persistent section links: overview + children of the section hub. */
export function getSectionNav(page: PageMeta): { root: PageMeta; items: PageMeta[] } | null {
  const root = getSectionRoot(page)
  if (!root) return null
  const items = getChildren(root.id)
  if (!items.length) return null
  return { root, items }
}

/** Sibling pages under the same parent (for nested local context). */
export function getSiblings(page: PageMeta): PageMeta[] {
  if (!page.parent) return []
  return getChildren(page.parent)
}

export const site = {
  name: 'Camp Barney Medintz',
  tagline: 'Our Summer Place',
  description:
    'Jewish overnight camp on more than 500 acres in the North Georgia mountains — friendship, adventure, and Jewish identity for rising 1st through 11th graders.',
  phone: '678.812.3844',
  emails: {
    general: 'info@campbarney.org',
  },
  addresses: {
    winter: {
      label: 'Winter (Aug 15 – May 15)',
      lines: ['5342 Tilly Mill Road', 'Dunwoody, GA 30338-4499'],
    },
    summer: {
      label: 'Summer (May 15 – Aug 15)',
      lines: ['4165 Highway 129 N.', 'Cleveland, GA 30528-2309'],
    },
  },
  social: {
    facebook: 'https://www.facebook.com/CampBarneyMedintz',
    instagram: 'https://www.instagram.com/camp.barney.medintz/?hl=en',
    linkedin: 'https://www.linkedin.com/company/campbarneymedintz',
    spotify: 'https://open.spotify.com/user/campbarney',
  },
  accountLogin: 'https://barneymedintz.campintouch.com/v2/login/login.aspx',
  mjcca: 'https://www.atlantajcc.org/',
  dayCamps: 'https://www.mjccadaycamps.org/',
  sessions: [
    { label: 'First Session', date: 'Sunday, June 7, 2026', detail: 'to Thursday, July 2, 2026' },
    { label: 'Second Session', date: 'Monday, July 6, 2026', detail: 'to Friday, July 31, 2026' },
  ],
  nav: [
    {
      label: 'Explore CBM',
      to: '/explore',
      children: [
        { label: 'Why Camp Barney', to: '/explore/why' },
        { label: 'Our Programs', to: '/explore/our-programs' },
        { label: 'Activities', to: '/explore/activities' },
        { label: 'Jewish Life', to: '/explore/jewish-life' },
        { label: 'Dates & Rates', to: '/explore/dates-and-rates' },
        { label: 'Camp Tours', to: '/explore/camptours' },
        { label: 'Camp Videos', to: '/explore/camp-videos' },
        { label: 'Virtual Tour', to: '/explore/virtual-tour' },
        { label: 'FAQs', to: '/explore/faqs' },
        { label: 'Meet Our Staff', to: '/explore/meet-our-directors' },
      ],
    },
    {
      label: 'Current Families',
      to: '/current-families',
      children: [
        { label: 'Dates & Rates', to: '/current-families/dates-and-rates' },
        { label: 'First-time Families', to: '/current-families/first-time-families' },
        { label: 'Before Camp', to: '/current-families/before-camp' },
        { label: 'During Camp', to: '/current-families/during-camp' },
        { label: 'Handbook & Forms', to: '/current-families/handbook-forms' },
        { label: 'Financial Assistance', to: '/current-families/financial-assistance-grants' },
        { label: 'Camp Store', to: '/current-families/camp-store' },
      ],
    },
    {
      label: 'Work at Camp',
      to: '/staff',
      children: [
        { label: 'Positions', to: '/staff/positions' },
        { label: 'How to Apply', to: '/staff/how-to-apply' },
        { label: 'Staff FAQs', to: '/staff/faqs' },
      ],
    },
    { label: 'Alumni', to: '/alumni' },
  ],
  utility: [
    { label: 'Enroll', to: '/enroll', primary: true },
    { label: 'Contact', to: '/contact' },
    { label: 'Donate', to: '/donate' },
  ],
}
