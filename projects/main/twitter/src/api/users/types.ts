import { z } from 'zod';

export const UserOutput = z.object({
  id: z.string().optional(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  biography: z.string().optional(),
  location: z.string().optional(),
  profilePhoto: z.string().nullable().optional(),
});

export type UserType = z.infer<typeof UserOutput>;
