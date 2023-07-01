import { faker } from '@faker-js/faker';
import { getUser } from './user.fixture';

export function getTweet(overrides = {}) {
  const user = getUser();
  return Object.assign(
    {
      id: faker.string.uuid(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.recent().toISOString(),
      user,
    },
    overrides,
  );
}
