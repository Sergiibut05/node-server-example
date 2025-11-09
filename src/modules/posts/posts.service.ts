import { prisma } from '../../config/db.js';
import type { CreatePostInput, UpdatePostInput } from './posts.schema.js';

export async function listPosts() {
  return prisma.post.findMany({
    include: {
      author: {
        select: { id: true, email: true, name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function findPostById(id: number) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: { id: true, email: true, name: true },
      },
    },
  });
}

export async function createPost(authorId: number, data: CreatePostInput) {
  return prisma.post.create({
    data: {
      authorId,
      title: data.title,
      content: data.content ?? null, // Ensure "content" is nullable, as required by Prisma
      ...(typeof data.published === 'boolean' ? { published: data.published } : {}),
    },
    include: {
      author: {
        select: { id: true, email: true, name: true },
      },
    },
  });
}

export async function updatePost(id: number, authorId: number, data: UpdatePostInput) {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw Object.assign(new Error('Post no encontrado'), { code: 'NOT_FOUND' });
  if (post.authorId !== authorId) throw Object.assign(new Error('No autorizado'), { code: 'FORBIDDEN' });

  return prisma.post.update({
    where: { id },
    data: {
      ...(typeof data.title !== 'undefined' ? 
            { title: data.title } : {}),
      ...(typeof data.content !== 'undefined' ? 
            { content: data.content } : {}),
      ...(typeof data.published !== 'undefined' ? 
            { published: data.published } : {}),
    },
    include: {
      author: {
        select: { id: true, email: true, name: true },
      },
    },
  });
}

export async function deletePost(id: number, authorId: number) {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw Object.assign(new Error('Post no encontrado'), { code: 'NOT_FOUND' });
  if (post.authorId !== authorId) throw Object.assign(new Error('No autorizado'), { code: 'FORBIDDEN' });

  await prisma.post.delete({ where: { id } });
}