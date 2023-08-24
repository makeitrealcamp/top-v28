import { prisma } from '../../app/database.js';

export const resetDb = async () => {
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.tweet.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
