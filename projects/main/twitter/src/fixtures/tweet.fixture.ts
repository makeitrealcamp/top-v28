import { faker } from '@faker-js/faker';
import { getUser } from './user.fixture';
import { TweetType } from '../api/tweets/types';

export function getTweet(overrides = {}): TweetType {
  const user = getUser();
  return Object.assign(
    {
      id: faker.string.uuid(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
      user,
      userId: user.id || '',
      commentsCount: faker.number.int({ min: 0 }),
      likesCount: faker.number.int({ min: 0 }),
      isLiked: faker.datatype.boolean(),
    },
    overrides,
  );
}
