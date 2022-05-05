import supertest from 'supertest';
import { app } from '../../server';
import { verifyJWT } from '../../utils/crypto/jwt';

describe('/users route', () => {
  it('should register new users', async () => {
    const { status, body } = await supertest(app).post('/users/register').send({
      first_name: 'test',
      last_name: 'route',
      password: 'test',
      role: 'user',
      email: 'test@route.com',
    });
    expect(status).toBe(200);
    expect(body).toBeDefined();
  });

  it('should return JWT on registration', async () => {
    const { body } = await supertest(app).post('/users/register').send({
      first_name: 'tester',
      last_name: 'testing',
      role: 'user',
      password: 'testing',
      email: 'test2@testing.com',
    });
    expect(body.token).toBeDefined();
    const decoded = await verifyJWT(body.token);
    expect(decoded).toBeTruthy();
  });

  it('should not register users with missing fields', async () => {
    const { status, body } = await supertest(app).post('/users/register').send({
      first_name: 'test',
      last_name: 'no email',
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
          email: 'test@route.com',
          password: 'test',
        });
      expect(status).toBe(200);
      expect(body).toBeDefined();
    });
    it('with incorrect credentials', async () => {
      const { status, body } = await supertest(app)
        .post('/users/authenticate')
        .send({
          email: 'test@route.com',
          password: 'badpassword',
        });
      expect(status).toBe(401);
      expect(body.error).toBeDefined();
    });
    it('should return JWT on successful auth', async () => {
      const { body } = await supertest(app).post('/users/authenticate').send({
        email: 'test@route.com',
        password: 'test',
      });
      expect(body.token).toBeDefined();
      const decoded = await verifyJWT(body.token);
      expect(decoded).toBeTruthy();
    });
  });
});
