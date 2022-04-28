import { UserStore } from '../../models';
import dotenv from 'dotenv';

dotenv.config();

describe('ItemStore Model', () => {
  const { index, get, create, update, remove, authenticate } = UserStore;

  describe('has functional methods', () => {
    it('indexes users', async () => {
      expect(index).toBeDefined();
      const items = await index();
      expect(items).toBeDefined();
      expect(items).toEqual([]);
    });
    it('creates new user', async () => {
      expect(create).toBeDefined();
      const token = await create({
        username: 'testcreate',
        password: 'badpassword',
        email: 'test@test.com',
      });
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
    it('gets user', async () => {
      expect(get).toBeDefined();
      const { username } = await get(1);
      expect(username).toBeDefined();
      expect(username).toBe('testcreate');
    });
    it('updates user', async () => {
      expect(update).toBeDefined();
      const token = await update({
        id: 1,
        username: 'test update',
        password: 'worsepassword',
        email: 'test@test.com',
      });
      const { username } = await get(1);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(username).toBeDefined();
      expect(username).toBe('test update');
    });
    it('authenticates correct passwords', async () => {
      expect(authenticate).toBeDefined();
      const response = await authenticate({
        email: 'test@test.com',
        password: 'worsepassword',
      });
      expect(response).not.toBeNull();
    });
    it('refuses to authenticate incorrect passwords', async () => {
      expect(authenticate).toBeDefined();
      const response = await authenticate({
        email: 'test@test.com',
        password: 'badpassword',
      });
      expect(response).toBeNull();
    });
    it('removes user', async () => {
      expect(remove).toBeDefined();
      const item = await remove(1);
      expect(item).toBeDefined();
      expect(item.id).toBe(1);
    });
  });
});
