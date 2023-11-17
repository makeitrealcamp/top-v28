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
    parentId: z.string().optional(),
  })
  .strict();

export const fields = [
  ...Object.keys(TweetSchema.shape),
  'id',
  'createdAt',
  'updatedAt',
];

export const transformTweet = (tweet) => ({
  ...tweet,
  commentsCount: tweet.children.length,
  likesCount: tweet._count.likes,
  isLiked: tweet.likes.length > 0,
  _count: undefined,
  children: undefined,
  likes: undefined,
});
