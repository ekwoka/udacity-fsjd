import {
  ItemStore,
  Order,
  OrderStore,
  UserCreate,
  UserReturn,
  UserStore,
} from '../../models';
import { ItemPartial } from '../../models/items';
import { verifyJWT } from '../../utils';

const testUsers: UserCreate[] = [
  {
    first_name: 'test',
    last_name: 'user',
    email: 'test@test.com',
    role: 'user',
    password: 'test',
  },
  {
    first_name: 'Tony',
    last_name: 'Stark',
    email: 'Tony@StarkIndustries.com',
    role: 'admin',
    password: 'iamironman',
  },
  {
    first_name: 'Bruce',
    last_name: 'Banner',
    email: 'Bruce@StarkPsychiatricHospital.org',
    role: 'admin',
    password: 'youwontlikemewhenimangry',
  },
];

const testItems: ItemPartial[] = [
  {
    name: 'Iron Suit',
    description: 'A suit made of iron',
  },
  {
    name: 'Green Gloves',
    description: 'A pair of gloves made of green',
  },
];

const queue: ((value?: unknown) => void)[] = [];
let complete = false;
export const database = () => {
  if (complete) return;
  return new Promise((res) => {
    queue.push(res);
    performSetup();
  });
};

let inprogress = false;
const performSetup = async () => {
  if (inprogress) return;
  inprogress = true;
  console.log('Populating Database for Test Environment...');
  console.time('🗃');
  testItems.map(ItemStore.create);
  const userPromises = testUsers.map(async (test) => {
    const token = await UserStore.create(test);
    return verifyJWT(token as string) as Promise<UserReturn>;
  });
  const users = await Promise.all(userPromises);

  await Promise.all(
    users.map(
      ({ id }: UserReturn): Promise<Order> =>
        OrderStore.create(id) as Promise<Order>
    )
  );
  await Promise.all(testItems);
  console.timeEnd('🗃');

  complete = true;
  inprogress = false;
  queue.forEach((res) => res());
};

database();
