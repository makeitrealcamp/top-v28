import { faker } from '@faker-js/faker';

export const getUser = (overrides = {}) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return Object.assign(
    {
      name: faker.person.fullName({
        firstName,
        lastName,
      }),
      email: faker.internet.email({
        firstName,
        lastName,
      }),
      username: faker.internet.userName({
        firstName,
        lastName,
      }),
    },
    overrides,
  );
};
