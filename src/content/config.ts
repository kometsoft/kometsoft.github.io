import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image().nullable(),
    }),
})

export const collections = { blog }
