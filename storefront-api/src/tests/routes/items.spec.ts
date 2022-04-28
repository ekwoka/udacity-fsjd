import { app } from '../../server';
import supertest from 'supertest';
import { Item, ItemStore } from '../../models/items';

describe('/items Route', () => {
  const { create } = ItemStore;
  let testItems: Item[];
  beforeAll(async () => {
    const testItem: Item = {
      name: 'before all items',
      description: 'testing the server api',
    };
    testItems = await Promise.all(
      Array.from({ length: 3 }, async () => create(testItem))
    );
  });
  it('should return a 200 response', () => {
    supertest(app).get('/items').expect(200);
  });
  it('GET / should return array of items', async () => {
    const { status, body } = await supertest(app).get('/items');
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.some((item: Item) => item.name === 'before all items')).toBe(
      true
    );
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
    const testItem: Item = {
      name: 'test Post create',
      description: 'testing the create method',
    };
    const { status, body } = await supertest(app).post('/items').send(testItem);
    expect(status).toBe(200);
    expect(body.name).toBe(testItem.name);
  });
  it('PUT /:id updates an item', async () => {
    const { id } = testItems[1];
    const testItem: Item = {
      name: 'test update',
      description: 'testing the update method',
    };
    const { status, body } = await supertest(app)
      .put(`/items/${id}`)
      .send(testItem);
    expect(status).toBe(200);
    expect(body.name).toBe(testItem.name);
    expect(body.description).toBe(testItem.description);
  });
  it('DELETE /:id removes an item', async () => {
    const { id, name, description } = testItems[2];
    const { status, body } = await supertest(app).delete(`/items/${id}`);
    expect(status).toBe(200);
    expect(body.id).toBe(id);
    expect(body.name).toBe(name);
    expect(body.description).toBe(description);
  });
});
