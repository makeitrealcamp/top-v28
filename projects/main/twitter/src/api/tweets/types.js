import { z } from 'zod';
import { UserOutput } from '../users/types';

export const TweetOutput = z.object({
  id: z.string(),
  content: z.string(),
  photo: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  userId: z.string(),
  user: UserOutput,
  _count: z.object({ comments: z.number() }).optional(),
});
