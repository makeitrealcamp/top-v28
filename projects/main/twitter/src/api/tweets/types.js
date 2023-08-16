import { z } from 'zod';
import { UserOutput } from '../users/types';

export const TweetOutput = z.object({
  content: z.string(),
  user: UserOutput,
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.nullable(z.string()),
  userId: z.string(),
});
