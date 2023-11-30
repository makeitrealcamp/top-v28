import { z } from 'zod';

const UserSchema = z
  .object({
    id: z.number(),
    email: z.string().email(),
    password: z.string(),
    createdAt: z.date().optional(),
  })
  .strict();

export type User = z.infer<typeof UserSchema>;

export const UserInputSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export type UserInput = z.infer<typeof UserInputSchema>;
