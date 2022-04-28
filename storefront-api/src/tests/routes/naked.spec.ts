import supertest from 'supertest';
import { app } from '../../server';

describe('/ Naked Route', () => {
  it('should return a 200 response', () => {
    supertest(app).get('/').expect(200);
  });
});
