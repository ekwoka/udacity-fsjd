import { User, UserStore } from '../../models';
import dotenv from 'dotenv';
import { verifyJWT } from '../../utils/crypto/jwt';

dotenv.config();

describe('UserStore Model', () => {
  const { index, get, create, update, remove, authenticate } = UserStore;

  describe('has functional methods', () => {
    it('indexes users', async () => {
      expect(index).toBeDefined();
      const items = await index();
      expect(items).toBeDefined();
      expect(items).toEqual([]);
    });
    let testID: number;
    it('creates new user', async () => {
      expect(create).toBeDefined();
      const token = await create({
        username: 'testcreate',
        password: 'badpassword',
        email: 'test@test.com',
      });
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      const { id } = (await verifyJWT(token as string)) as User;
      testID = id as number;
    });
    it('gets user', async () => {
      expect(get).toBeDefined();
      const { username } = await get(testID);
      expect(username).toBeDefined();
      expect(username).toBe('testcreate');
    });
    it('updates user', async () => {
      expect(update).toBeDefined();
      const token = await update({
        id: testID,
        username: 'test update',
        password: 'worsepassword',
        email: 'test@test.com',
      });
      const { username } = await get(testID);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(username).toBeDefined();
      expect(username).toBe('test update');
    });
    it('authenticates correct passwords and returns JWT', async () => {
      expect(authenticate).toBeDefined();
      const response = await authenticate({
        email: 'test@test.com',
        password: 'worsepassword',
      });
      expect(response).not.toBeNull();
      expect(typeof response).toBe('string');
      const decoded = await verifyJWT(response as string);
      expect(decoded).toBeTruthy();
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
      const item = await remove(testID);
      expect(item).toBeDefined();
      expect(item.id).toBe(testID);
    });
  });
});
