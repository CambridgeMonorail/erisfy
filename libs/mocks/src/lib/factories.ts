// libs/mocks/src/factories.ts
import { faker } from '@faker-js/faker';

export const createUser = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    avatar: faker.image.avatar(),
  };
};
