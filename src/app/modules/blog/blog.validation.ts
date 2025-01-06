import { z } from 'zod';
// Define the blog shcema
const createBlogSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    content: z.string().nonempty('Content is required'),
    author: z.string().nonempty('Author is required'),
    isPublished: z.boolean().optional().default(true),
  }),
});
const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required').optional(),
    content: z.string().nonempty('Content is required').optional(),
    author: z.string().nonempty('Author is required').optional(),
    isPublished: z.boolean().optional().default(true).optional(),
  }),
});

export const BlogValidation = {
  createBlogSchema,
  updateBlogSchema,
};
