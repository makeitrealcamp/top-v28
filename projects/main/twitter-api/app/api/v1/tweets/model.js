import { z } from 'zod';
import escape from 'validator/lib/escape.js';

export const TweetSchema = z
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
  })
  .strict();

// export const validateCreate = function (data) {
//   return TweetSchema.safeParseAsync(data);
// };

// export const validateUpdate = function (data) {
//   return TweetSchema.partial().safeParseAsync(data);
// };

// export const validate = function (partial = false) {
//   return function (data) {
//     if (partial) {
//       return TweetSchema.partial().safeParseAsync(data);
//     } else {
//       return TweetSchema.safeParseAsync(data);
//     }
//   };
// };

export const fields = [
  ...Object.keys(TweetSchema.shape),
  'id',
  'createdAt',
  'updatedAt',
];
