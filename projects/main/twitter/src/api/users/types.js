import { z } from 'zod';

export const UserOutput = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
});
