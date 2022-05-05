import supertest from 'supertest';
import { app } from '../../../server';

describe('/services routes', () => {
  it('GET /most_expensive', async (): Promise<void> => {
    const { status, body } = await supertest(app).get(
      '/services/most_expensive'
    );
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBeTrue();
    expect(body[0].price).toBeDefined();
  });
  it('GET /active_users', async (): Promise<void> => {
    const { status, body } = await supertest(app).get('/services/active_users');
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBeTrue();
    expect(body[0].user_id).toBeDefined();
  });
});
