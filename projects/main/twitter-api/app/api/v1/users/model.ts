import { hash, compare } from 'bcrypt';
import { z } from 'zod';
import escape from 'validator/lib/escape.js';
// import isAlphanumeric from 'validator/lib/isAlphanumeric.js';

export const PersonSchema = z
  .object({
    name: z
      // Validation
      .string()
      .trim()
      .max(256)
      // Sanitize
      .transform(function (value) {
        return escape(value);
      }),
    username: z
      // Validation
      .string()
      .trim()
      .min(3)
      .max(256)
      .toLowerCase()
      // Sanitize
      // .refine(isAlphanumeric)
      .transform(function (value) {
        return escape(value);
      }),
  })
  .strict();

type PersonSchemaType = z.infer<typeof PersonSchema>;

export const LoginSchema = z
  .object({
    email: z
      // Validation
      .string()
      .email()
      .trim()
      .max(256),
    password: z
      // Validation
      .string()
      .trim()
      .min(6)
      .max(16),
  })
  .strict();

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const UserSchema = PersonSchema.merge(LoginSchema);

export type User = z.infer<typeof UserSchema>;

export const fields = [
  ...Object.keys(UserSchema.shape),
  'id',
  'createdAt',
  'updatedAt',
];

export const encryptPassword = (password: string) => {
  return hash(password, 10);
};

export const verifyPassword = (password: string, encryptPassword: string) => {
  return compare(password, encryptPassword);
};
