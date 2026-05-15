import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        category: z.string().optional(),
        image: z.string().optional(),
        imageCredit: z.string().optional(),
        imageCreditUrl: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/**',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
  },
})
