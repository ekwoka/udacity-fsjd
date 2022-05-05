import { app } from '../../server';
import supertest from 'supertest';
import { Item, ItemPartial, ItemStore } from '../../models/items';
import { createJWT } from '../../utils';
import { database } from '../helpers/databaseSetup';

describe('/items Route', () => {
  const { index } = ItemStore;
  let testItems: Item[];
  let testItem: Item;
  let token: string;
  beforeAll(async () => {
    await database();
    testItems = await index();
    token = await createJWT({
      id: 1,
      first_name: 'test',
      last_name: 'user',
      email: 'jwt@test.com',
      role: 'user',
    });
  });
  it('should return a 200 response', () => {
    supertest(app).get('/items').expect(200);
  });
  it('GET / should return array of items', async () => {
    const { status, body } = await supertest(app).get('/items');
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });
  it('GET /:id returns an item', async () => {
    const { id, name, description } = testItems[0];
    const { status, body } = await supertest(app).get(`/items/${id}`);
    expect(status).toBe(200);
    expect(body.id).toBe(id);
    expect(body.name).toBe(name);
    expect(body.description).toBe(description);
  });
  it('POST / creates an item', async () => {
    const test: ItemPartial = {
      name: 'test Post create',
      description: 'testing the create method',
    };
    const { status, body } = await supertest(app)
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send(test);
    expect(status).toBe(200);
    expect(body.name).toBe(test.name);
    testItem = body;
  });
  it('PUT /:id updates an item', async () => {
    const { id } = testItem;
    const test: ItemPartial = {
      name: 'test update',
      description: 'testing the update method',
    };
    const { status, body } = await supertest(app)
      .put(`/items/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(test);
    expect(status).toBe(200);
    expect(body.name).toBe(test.name);
    expect(body.description).toBe(test.description);
    testItem = body;
  });
  it('DELETE /:id removes an item', async () => {
    const { id, name, description } = testItem;
    const { status, body } = await supertest(app)
      .delete(`/items/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
    expect(body.id).toBe(id);
    expect(body.name).toBe(name);
    expect(body.description).toBe(description);
  });
  describe('Rejects unauthorized requests', () => {
    it('POST', async () => {
      const testItem: ItemPartial = {
        name: 'test Post create',
        description: 'testing the create method',
      };
      const { status } = await supertest(app).post('/items').send(testItem);
      expect(status).toBe(401);
    });
    it('PUT', async () => {
      const { id } = testItems[1];
      const testItem: ItemPartial = {
        name: 'test update',
        description: 'testing the update method',
      };
      const { status } = await supertest(app)
        .put(`/items/${id}`)
        .send(testItem);
      expect(status).toBe(401);
    });
    it('DELETE', async () => {
      const { id } = testItems[0];
      const { status } = await supertest(app).delete(`/items/${id}`);
      expect(status).toBe(401);
    });
  });
});
