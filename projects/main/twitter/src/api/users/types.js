import { z } from 'zod';

export const UserOutput = z.object({
  name: z.string().optional(),
  nickname: z.string().optional(),
  email: z.string().optional(),
  picture: z.string().nullable().optional(),
});
