import { prisma } from '../../../database/prismaConnection.js'; from '../../app/database.js';

export const resetDb = async () => {
  await prisma.$transaction([
    prisma.comment.deleteMany(),
    prisma.tweet.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
