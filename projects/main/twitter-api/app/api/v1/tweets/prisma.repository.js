import { prisma } from '../../../database/prismaConnection.js';

export const createTweet = async (userId, data) => {
    return await prisma.tweet.create({
        data: {
          ...data,
          userId,
        },
        include: {
          user: {
            select: {
              name: true,
              username: true,
              email: true,
              profilePhoto: true,
            },
          },
          // Count the number of likes
          _count: {
            select: {
              likes: true,
            },
          },
          // isLiked
          likes: {
            select: {
              userId: true,
            },
            where: {
              userId,
            },
          },
          // Collection of comments
          children: {
            select: {
              id: true,
            },
          },
        },
      });
};