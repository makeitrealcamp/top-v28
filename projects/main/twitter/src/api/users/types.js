import { z } from 'zod';

export const UserOutput = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
  biography: z.string().optional(),
  location: z.string().optional(),
  profilePhoto: z.string().nullable().optional(),
});
