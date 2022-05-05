import {
  ProductStore,
  Order,
  OrderStore,
  UserCreate,
  UserReturn,
  UserStore,
} from '../../models';
import { ProductData } from '../../models';
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

const testProducts: ProductData[] = [
  {
    name: 'Iron Suit',
    price: 100.5,
  },
  {
    name: 'Green Gloves',
    price: 50.5,
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
const performSetup = async (): Promise<void> => {
  if (inprogress) return;
  inprogress = true;
  console.log('Populating Database for Test Environment...');
  console.time('🗃');
  testProducts.map(ProductStore.create);
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
  await Promise.all(testProducts);
  console.timeEnd('🗃');

  complete = true;
  inprogress = false;
  queue.forEach((res) => res());
};

database();
