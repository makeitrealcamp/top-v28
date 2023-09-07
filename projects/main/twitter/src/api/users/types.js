import { z } from "zod";

export const UserOutput = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string(),
  photo: z.string().nullable().optional(),
});
