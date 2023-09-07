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

    photo: z.string().optional(),
    location:
      //validation
      z
        .string()
        .trim()
        .min(3)
        .max(256)
        .toLowerCase()
        .transform(function (value) {
          return escape(value);
        }),
    biography: z
      .string()
      .trim()
      .min(3)
      .max(256)
      .toLowerCase()
      .transform(function (value) {
        return escape(value);
      }),
  })
  .strict();

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

export const UserSchema = PersonSchema.merge(LoginSchema);

export const fields = [
  ...Object.keys(UserSchema.shape),
  'id',
  'createdAt',
  'updatedAt',
];

export const encryptPassword = (password) => {
  return hash(password, 10);
};

export const verifyPassword = (password, encryptPassword) => {
  return compare(password, encryptPassword);
};
