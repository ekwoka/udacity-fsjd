import { ItemStore, Order, OrderStore, UserStore } from '../../models';
import dotenv from 'dotenv';

dotenv.config();

describe('OrderStore Model', () => {
  const { get, create, update, remove, addItem } = OrderStore;

  describe('has functional methods', () => {
    let testItemID: number;
    beforeAll(async () => {
      await UserStore.create({
        username: 'tony stark',
        email: 'Tony@StarkIndustries.com',
        password: 'iamironman',
      });
      const { id } = await ItemStore.create({
        name: 'Iron Suit',
        description: 'A suit made of iron',
      });
      testItemID = id;
    });
    it('initializes new order', async () => {
      expect(create).toBeDefined();
      const { id, user_id, status } = (await create(1)) as Order;
      expect(id).toBe(1);
      expect(user_id).toBe(1);
      expect(status).toBe('open');
    });
    it('retrieves order', async () => {
      expect(get).toBeDefined();
      const { user_id, status } = (await get(1)) as Order;
      expect(user_id).toBe(1);
      expect(status).toBe('open');
    });
    it('updates item', async () => {
      expect(update).toBeDefined();
      const { updated_at } = (await update(1)) as Order;
      expect(updated_at).toBeCloseTo(Date.now(), -10);
    });
    it('adds an item to an order', async () => {
      expect(addItem).toBeDefined();
      const { items } = (await addItem(1, testItemID, 3)) as Order;
      expect(items.length).toBeDefined();
    });
    afterAll(async () => {
      await remove(1);
      await UserStore.remove(1);
    });
  });
});
