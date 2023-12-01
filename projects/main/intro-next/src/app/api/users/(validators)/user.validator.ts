import { z } from 'zod';
import { ZodValidationAdapter } from '../../(adapters)/Zod.adapter';
import { User } from '../(domain)/entities/user.entity';

export const UserSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().email(),
    emailVerified: z.date().optional(),
    image: z.string().optional(),
    password: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

export const userValidator = (data: unknown): User =>
  ZodValidationAdapter.validate<User>(data, UserSchema);
