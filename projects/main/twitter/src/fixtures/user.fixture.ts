import { faker } from '@faker-js/faker';
import { UserType } from '../api/users/types';

export function getUser(overrides = {}): UserType {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return Object.assign(
    {
      id: faker.string.uuid(),
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
      photo: faker.image.avatar(),
    },
    overrides,
  );
}
