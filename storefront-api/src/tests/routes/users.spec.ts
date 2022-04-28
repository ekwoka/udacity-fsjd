import supertest from 'supertest';
import { app } from '../../server';

describe('/users route', () => {
  it('should register new users', async () => {
    const { status, body } = await supertest(app).post('/users/register').send({
      username: 'test',
      password: 'test',
      email: 'test@test.com',
    });
    expect(status).toBe(200);
    expect(body).toBeDefined();
  });

  it('should not register users with missing fields', async () => {
    const { status, body } = await supertest(app).post('/users/register').send({
      username: 'test',
      password: 'test',
    });
    expect(status).toBe(400);
    expect(body.error).toBeDefined();
  });

  describe('should authenticate users', () => {
    it('with correct credentials', async () => {
      const { status, body } = await supertest(app)
        .post('/users/authenticate')
        .send({
          email: 'test@test.com',
          password: 'test',
        });
      expect(status).toBe(200);
      expect(body).toBeDefined();
    });
    it('with incorrect credentials', async () => {
      const { status, body } = await supertest(app)
        .post('/users/authenticate')
        .send({
          email: 'test@test.com',
          password: 'badpassword',
        });
      expect(status).toBe(401);
      expect(body.error).toBeDefined();
    });
  });
});
