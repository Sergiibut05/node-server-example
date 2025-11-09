import type { Request, Response } from 'express';
import { createPostSchema, updatePostSchema } from './posts.schema.js';
import { listPosts, findPostById, createPost, updatePost, deletePost } from './posts.service.js';

export async function listPostsCtrl(_req: Request, res: Response) {
  const posts = await listPosts();
  res.json(posts);
}

export async function getPostCtrl(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  const post = await findPostById(id);
  if (!post) return res.status(404).json({ message: 'Post no encontrado' });

  res.json(post);
}

export async function createPostCtrl(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'No autorizado' });

  const payload = createPostSchema.parse(req.body);
  const post = await createPost(req.user.sub, payload);
  res.status(201).json(post);
}

export async function updatePostCtrl(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'No autorizado' });

  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    const payload = updatePostSchema.parse(req.body);
    const post = await updatePost(id, req.user.sub, payload);
    res.json(post);
  } catch (error: any) {
    if (error.code === 'NOT_FOUND') return res.status(404).json({ message: error.message });
    if (error.code === 'FORBIDDEN') return res.status(403).json({ message: error.message });
    return res.status(400).json({ message: error.message });
  }
}

export async function deletePostCtrl(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'No autorizado' });

  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

  try {
    await deletePost(id, req.user.sub);
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'NOT_FOUND') return res.status(404).json({ message: error.message });
    if (error.code === 'FORBIDDEN') return res.status(403).json({ message: error.message });
    return res.status(400).json({ message: error.message });
  }
}