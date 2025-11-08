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

const aws = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.string(),
      icon: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      image: image().nullable().optional(),
    }),
})

export const collections = { blog, aws }
