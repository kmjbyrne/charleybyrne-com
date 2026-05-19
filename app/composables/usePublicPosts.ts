import type { Collections, CollectionQueryBuilder } from '@nuxt/content'

/**
 * Wraps a posts query to exclude non-public posts in production.
 * In dev mode all posts are returned so you can preview drafts.
 */
export function usePublicPosts(
  query: CollectionQueryBuilder<Collections['posts']>,
): CollectionQueryBuilder<Collections['posts']> {
  if (import.meta.dev) return query
  return query.where('public', '=', true)
}
