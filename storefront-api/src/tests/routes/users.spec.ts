import supertest from 'supertest';
import { app } from '../../server';
import { createJWT, verifyJWT } from '../../utils/crypto/jwt';
import { database } from '../helpers/databaseSetup';

describe('/users route', () => {
  let token: string;
  beforeAll(async () => {
    await database();
    token = await createJWT({
      id: 1,
      first_name: 'Tony',
      last_name: 'Monstana',
      role: 'admin',
      email: 'tony@montana.com',
    });
  });
  it('should return all users', async () => {
    const { status, body } = await supertest(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
    expect(Array.isArray(body)).toBeTrue();
    expect(body[0].id).toBeDefined();
  });
  it('should return a specific user', async () => {
    const { status, body } = await supertest(app)
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
    expect(body.id).toBeDefined();
  });
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
  describe('requires Auth on select Routes', () => {
    it('should return all users', async () => {
      const { status } = await supertest(app).get('/users');
      expect(status).toBe(401);
    });
    it('should return a specific user', async () => {
      const { status } = await supertest(app).get('/users/1');
      expect(status).toBe(401);
    });
  });
});
