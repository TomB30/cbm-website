/** Resolve a path under `public/` with the correct Vite/GitHub Pages base. */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const clean = path.replace(/^\/+/, '')
  return `${base}${clean}`
}
