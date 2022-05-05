import { app } from '../../server';
import supertest from 'supertest';
import {
  ProductDB,
  ProductStore,
  Order,
  OrderStore,
  UserReturn,
  UserStore,
} from '../../models';
import { database } from '../helpers/databaseSetup';
import { createJWT } from '../../utils';

describe('/orders Route', () => {
  let testOrders: Order[];
  let testProduct: ProductDB;
  let testUser: UserReturn;
  let token: string;
  beforeAll(async () => {
    await database();
    testUser = (await UserStore.index())[0];
    testProduct = (await ProductStore.index())[0];
    testOrders = await OrderStore.index();
    token = await createJWT(testUser);
  });
  it('GET / should return orders from user', async () => {
    const { status, body } = await supertest(app)
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toEqual(
      testOrders.filter((order) => order.user_id === testUser.id).length
    );
  });
  it('GET /:id returns a specific order', async () => {
    const { id } = testOrders[0];
    const { status, body } = await supertest(app)
      .get(`/orders/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
    expect(body.id).toBe(id);
  });
  it('POST / creates an order', async () => {
    const { status, body } = await supertest(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: testUser.id });
    expect(status).toBe(200);
    expect(body.status).toBe('active');
  });
  it('PUT /:id updates an order', async () => {
    const { id } = testOrders[0];
    const { status, body } = await supertest(app)
      .put(`/orders/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ order_id: id, item_id: testProduct.id, quantity: 1 });
    expect(status).toBe(200);
    expect(body.items.length).toBe(1);
  });
});
