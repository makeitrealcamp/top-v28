import { faker } from '@faker-js/faker';

export const getTweet = (overrides = {}, userId) => {
  return Object.assign(
    {
      content: faker.lorem.paragraph(1),
      userId,
    },
    overrides,
  );
};
