import { app } from '../../server';
import supertest from 'supertest';
import {
  Item,
  ItemStore,
  Order,
  OrderStore,
  User,
  UserStore,
} from '../../models';
import { verifyJWT } from '../../utils';

describe('/orders Route', () => {
  const testOrders: Order[] = [];
  let testItem: Item;
  let testUser: User;
  beforeAll(async () => {
    const user = await UserStore.create({
      username: 'Repunzel',
      password: '12345',
      email: 'long@hair.com',
    });
    testUser = (await verifyJWT(user as string)) as User;
    testItem = (await ItemStore.index())[0];
    await Promise.all(
      Array.from({ length: 3 }, async () =>
        testOrders.push(
          (await OrderStore.create(testUser.id as number)) as Order
        )
      )
    );
  });
  it('GET / should return array of orders', async () => {
    const { status, body } = await supertest(app).get('/orders');
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });
  it('GET /:id returns an order', async () => {
    const { id } = testOrders[0];
    const { status, body } = await supertest(app).get(`/orders/${id}`);
    expect(status).toBe(200);
    expect(body.id).toBe(id);
  });
  it('POST / creates an order', async () => {
    const { status, body } = await supertest(app)
      .post('/orders')
      .send({ user_id: testUser.id });
    expect(status).toBe(200);
    expect(body.status).toBe('open');
  });
  it('PUT /:id updates an order', async () => {
    const { id } = testOrders[0];
    const { status, body } = await supertest(app)
      .put(`/orders/${id}`)
      .send({ item_id: testItem.id, quantity: 1 });
    expect(status).toBe(200);
    expect(body.items.length).toBe(1);
  });
});
