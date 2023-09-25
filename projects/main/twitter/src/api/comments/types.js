import { z } from 'zod';
import { UserOutput } from '../users/types';

export const CommentOutput = z.object({
  id: z.string(),
  content: z.string(),
  photo: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  userId: z.string(),
  user: UserOutput,
  tweetId: z.string(),
});
