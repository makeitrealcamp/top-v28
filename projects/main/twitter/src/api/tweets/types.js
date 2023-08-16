import { z } from 'zod';
import { UserOutput } from '../users/types';

export const TweetOutput = z.object({
    content: z.string(),
    createdAt: z.string(),
    id: z.string(),
    updatedAt: z.string().nullable(), 
    userId: z.string(),
    // The _count property is not on our database
    // It is sent when requesting ALL tweets but
    // It doesn't get send when requesting ONE tweet
    _count: z.object({ comments: z.number() }).optional(),
    user: UserOutput,
});