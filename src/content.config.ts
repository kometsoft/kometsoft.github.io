import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/aws' }),
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

