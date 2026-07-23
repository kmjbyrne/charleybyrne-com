/**
 * Converts a stored content path like /blog/security/slug
 * into a flat URL like /blog/slug for clean routing.
 */
export function useFlatBlogPath(contentPath: string): string {
  const parts = contentPath.split('/')
  return `/blog/${parts[parts.length - 1]}`
}
