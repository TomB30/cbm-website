export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list'
  text?: string
  level?: number
  items?: string[]
}

export interface PageMeta {
  id: number
  slug: string
  path: string
  title: string
  parent: number
  excerpt: string
  menuOrder: number
}

export interface PageContent extends PageMeta {
  blocks: ContentBlock[]
  images: string[]
  contentText: string
  contentHtml?: string
}
