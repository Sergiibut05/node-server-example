import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio').optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: 'Debes enviar al menos un campo para actualizar',
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;