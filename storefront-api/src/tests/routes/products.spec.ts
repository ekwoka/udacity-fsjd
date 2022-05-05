import { app } from '../../server';
import supertest from 'supertest';
import {
  ProductDB,
  ProductData,
  ProductStore,
  ProductUpdate,
} from '../../models';
import { createJWT } from '../../utils';
import { database } from '../helpers/databaseSetup';

describe('/products Route', () => {
  const { index } = ProductStore;
  let testProducts: ProductDB[];
  let testProduct: ProductDB;
  let token: string;
  beforeAll(async () => {
    await database();
    testProducts = await index();
    token = await createJWT({
      id: 1,
      first_name: 'test',
      last_name: 'user',
      email: 'jwt@test.com',
      role: 'user',
    });
  });
  it('should return a 200 response', () => {
    supertest(app).get('/products').expect(200);
  });
  it('GET / should return array of items', async () => {
    const { status, body } = await supertest(app).get('/products');
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });
  it('GET /:id returns an item', async () => {
    const { id, name, price } = testProducts[0];
    const { status, body } = await supertest(app).get(`/products/${id}`);
    expect(status).toBe(200);
    expect(body.id).toBe(id);
    expect(body.name).toBe(name);
    expect(body.price).toBe(price);
  });
  it('POST / creates an item', async () => {
    const test: ProductData = {
      name: 'test Post create',
      price: 15.68,
    };
    const { status, body } = await supertest(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send(test);
    expect(status).toBe(200);
    expect(body.name).toBe(test.name);
    testProduct = body;
  });
  it('PUT /:id updates an item', async () => {
    const { id } = testProduct;
    const test: ProductUpdate = {
      id,
      name: 'test update',
    };
    const { status, body } = await supertest(app)
      .put(`/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(test);
    expect(status).toBe(200);
    expect(body.name).toBe(test.name);
    expect(body.price).toBe(testProduct.price);
    testProduct = body;
  });
  it('DELETE /:id removes an item', async () => {
    const { id, name, price } = testProduct;
    const { status, body } = await supertest(app)
      .delete(`/products/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
    expect(body.id).toBe(id);
    expect(body.name).toBe(name);
    expect(body.price).toBe(price);
  });
  describe('Rejects unauthorized requests', () => {
    it('POST', async () => {
      const testProduct: ProductData = {
        name: 'test Post create',
        price: 3.5,
      };
      const { status } = await supertest(app)
        .post('/products')
        .send(testProduct);
      expect(status).toBe(401);
    });
    it('PUT', async () => {
      const { id } = testProducts[1];
      const testProduct: ProductUpdate = {
        id,
        name: 'test update',
      };
      const { status } = await supertest(app)
        .put(`/products/${id}`)
        .send(testProduct);
      expect(status).toBe(401);
    });
    it('DELETE', async () => {
      const { id } = testProducts[0];
      const { status } = await supertest(app).delete(`/products/${id}`);
      expect(status).toBe(401);
    });
  });
});
