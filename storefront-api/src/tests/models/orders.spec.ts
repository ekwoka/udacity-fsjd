import { ItemStore, Order, OrderStore, UserStore } from '../../models';
import { database } from '../helpers/databaseSetup';

describe('OrderStore Model', () => {
  const { get, create, update, addItem } = OrderStore;

  describe('has functional methods', () => {
    let testItemID: number;
    let testUserID: number;
    let testOrderID: number;
    beforeAll(async () => {
      await database();
      const [items, users] = await Promise.all([
        await ItemStore.index(),
        await UserStore.index(),
      ]);
      testItemID = items[0].id as number;
      testUserID = users[0].id as number;
    });
    it('initializes new order', async () => {
      expect(create).toBeDefined();
      const { id, user_id, status } = (await create(testUserID)) as Order;
      expect(id).toBeDefined();
      expect(user_id).toBe(testUserID);
      expect(status).toBe('open');
      testOrderID = id;
    });
    it('retrieves order', async () => {
      expect(get).toBeDefined();
      const { user_id, status } = (await get(testOrderID)) as Order;
      expect(user_id).toBe(testUserID);
      expect(status).toBe('open');
    });
    it('updates item', async () => {
      expect(update).toBeDefined();
      const { updated_at } = (await update(testOrderID)) as Order;
      expect(updated_at).toBeCloseTo(Date.now(), -10);
    });
    it('adds an item to an order', async () => {
      expect(addItem).toBeDefined();
      const { items } = (await addItem(testOrderID, testItemID, 3)) as Order;
      expect(items.length).toBeDefined();
    });
  });
});
