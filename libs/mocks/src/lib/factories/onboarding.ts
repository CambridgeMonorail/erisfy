import { faker } from '@faker-js/faker';
import { IOnboarding } from '@erisfy/api';

export const createOnboarding = (override?: Partial<IOnboarding>): IOnboarding => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  userId: faker.string.uuid(),
  hasViewed: faker.datatype.boolean(),
  chosenOptions: faker.helpers.arrayElements(['stocks', 'crypto', 'forex', 'commodities'], { min: 1, max: 4 }),
  ...override
});
