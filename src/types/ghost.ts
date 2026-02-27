export interface GhostPost {
  id: string
  uuid: string
  title: string
  slug: string
  html?: string
  excerpt?: string
  feature_image?: string | null
  featured: boolean
  published_at: string
  updated_at?: string
  created_at?: string
  url: string
  reading_time?: number
  primary_tag?: GhostTag | null
  tags?: GhostTag[]
  primary_author?: GhostAuthor
  authors?: GhostAuthor[]
}

export interface GhostTag {
  id: string
  name: string
  slug: string
  description?: string
  feature_image?: string | null
  visibility: string
  url: string
}

export interface GhostAuthor {
  id: string
  name: string
  slug: string
  profile_image?: string | null
  bio?: string
  url: string
}

export interface GhostPagination {
  page: number
  limit: number
  pages: number
  total: number
  next: number | null
  prev: number | null
}

export interface GhostPostsResponse {
  posts: GhostPost[]
  meta: {
    pagination: GhostPagination
  }
}

export interface GhostSettings {
  title: string
  description: string
  logo?: string
  icon?: string
  accent_color?: string
  cover_image?: string
  facebook?: string
  twitter?: string
  lang: string
  timezone: string
  navigation: { label: string; url: string }[]
  url: string
}
