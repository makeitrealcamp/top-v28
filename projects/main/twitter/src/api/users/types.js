import { z } from 'zod';

export const UserOutput = z.object({
  name: z.string(),
  nickname: z.string(),
  email: z.string(),
  picture: z.string().nullable().optional(),
});
