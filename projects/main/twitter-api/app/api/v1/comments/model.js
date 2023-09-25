import { z } from 'zod';
import escape from 'validator/lib/escape.js';

export const CommentSchema = z
  .object({
    content: z
      // Validation
      .string()
      .trim()
      .max(128)
      // Sanitize
      .transform(function (value) {
        return escape(value);
      }),
    photo: z.string().optional(),
    tweetId: z.string(),
  })
  .strict();

export const fields = [
  ...Object.keys(CommentSchema.shape),
  'id',
  'createdAt',
  'updatedAt',
];
