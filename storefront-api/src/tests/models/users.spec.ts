import { UserReturn, UserStore } from '../../models';
import dotenv from 'dotenv';
import { verifyJWT } from '../../utils/crypto/jwt';

dotenv.config();

describe('UserStore Model', () => {
  const { index, get, create, update, remove, authenticate } = UserStore;

  describe('has functional methods', () => {
    it('indexes users', async (): Promise<void> => {
      expect(index).toBeDefined();
      const items = await index();
      expect(items).toBeDefined();
      expect(Array.isArray(items)).toBeTrue();
    });
    let testID: number;
    it('creates new user', async (): Promise<void> => {
      expect(create).toBeDefined();
      const token = await create({
        first_name: 'test',
        last_name: 'create',
        password: 'badpassword',
        role: 'user',
        email: 'test@Jasmine.com',
      });
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      const { id } = (await verifyJWT(token as string)) as UserReturn;
      testID = id as number;
    });
    it('gets user', async (): Promise<void> => {
      expect(get).toBeDefined();
      const { last_name } = (await get(testID)) as UserReturn;
      expect(last_name).toBeDefined();
      expect(last_name).toBe('create');
    });
    it('updates user', async (): Promise<void> => {
      expect(update).toBeDefined();
      const token = await update({
        id: testID,
        last_name: 'update',
      });
      const { last_name } = (await get(testID)) as UserReturn;
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(last_name).toBeDefined();
      expect(last_name).toBe('update');
    });
    it('authenticates correct passwords and returns JWT', async (): Promise<void> => {
      expect(authenticate).toBeDefined();
      const response = await authenticate({
        email: 'test@Jasmine.com',
        password: 'badpassword',
      });
      expect(response).not.toBeNull();
      expect(typeof response).toBe('string');
      const decoded = await verifyJWT(response as string);
      expect(decoded).toBeTruthy();
    });
    it('refuses to authenticate incorrect passwords', async (): Promise<void> => {
      expect(authenticate).toBeDefined();
      const response = await authenticate({
        email: 'test@test.com',
        password: 'worsepassword',
      });
      expect(response).toBeNull();
    });
    it('removes user', async (): Promise<void> => {
      expect(remove).toBeDefined();
      const item = (await remove(testID)) as UserReturn;
      expect(item).toBeDefined();
      expect(item.id).toBe(testID);
    });
  });
});
