import { ItemStore, Order, OrderStore, User, UserStore } from '../../models';
import { ItemPartial } from '../../models/items';
import { JWT, verifyJWT } from '../../utils';

const testUsers: User[] = [
  {
    username: 'test',
    email: 'test@test.com',
    password: 'test',
  },
  {
    username: 'Tony Stark',
    email: 'Tony@StarkIndustries.com',
    password: 'iamironman',
  },
  {
    username: 'Bruce Banner',
    email: 'Bruce@StarkPsychiatricHospital.org',
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
    return verifyJWT(token as string) as Promise<JWT>;
  });
  const users = await Promise.all(userPromises);

  await Promise.all(
    users.map(
      ({ id }: JWT): Promise<Order> => OrderStore.create(id) as Promise<Order>
    )
  );
  await Promise.all(testItems);
  console.timeEnd('🗃');

  complete = true;
  inprogress = false;
  queue.forEach((res) => res());
};

database();
