import { prisma } from '../../../database/prismaConnection.js'; from '../app/database.js';
import { getUser } from './fixtures/user.fixture.js';
import { getTweet } from './fixtures/tweet.fixture.js';
import { encryptPassword } from '../app/api/v1/users/model.js';

export const setup = async () => {
  const user = getUser();
  const password = await encryptPassword('12345678');

  const data = await prisma.user.create({
    data: {
      ...user,
      password,
    },
  });

  const { id: userId } = data;

  await prisma.tweet.createMany({
    data: [
      getTweet({}, userId),
      getTweet({}, userId),
      getTweet({}, userId),
      getTweet({}, userId),
      getTweet({}, userId),
    ],
  });
};
