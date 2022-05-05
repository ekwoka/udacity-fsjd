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

describe('/orders Route', () => {
  let testOrders: Order[];
  let testProduct: ProductDB;
  let testUser: UserReturn;
  beforeAll(async () => {
    await database();
    testUser = (await UserStore.index())[0];
    testProduct = (await ProductStore.index())[0];
    testOrders = await OrderStore.index();
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
      .send({ order_id: id, item_id: testProduct.id, quantity: 1 });
    expect(status).toBe(200);
    expect(body.items.length).toBe(1);
  });
});
