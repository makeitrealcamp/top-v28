import { z } from "zod";
import { UserOutput } from "../users/types";

export const TweetCount = z.object({
  comments: z.number(),
});

export const TweetOutput = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.nullable(z.string()),
  userId: z.string(),
  user: UserOutput.optional(),
  _count: TweetCount.optional(),
});

// export const TweetOutputCreate = z.object({
//   id: z.string(),
//   content: z.string(),
//   createdAt: z.string(),
//   updatedAt: z.nullable(z.string()),
//   userId: z.string(),
// });
