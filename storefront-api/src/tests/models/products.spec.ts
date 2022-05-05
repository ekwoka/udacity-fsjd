import { ProductDB, ProductStore } from '../../models';
import dotenv from 'dotenv';
import { database } from '../helpers/databaseSetup';

dotenv.config();

describe('ProductStore Model', () => {
  const { index, get, create, update, remove } = ProductStore;
  beforeAll(database);

  describe('has functional methods', () => {
    let testProduct: ProductDB;
    it('indexes products', async () => {
      expect(index).toBeDefined();
      const products = await index();
      expect(products).toBeDefined();
      expect(Array.isArray(products)).toBeTrue();
    });
    it('creates new product', async () => {
      expect(create).toBeDefined();
      const product = (await create({
        name: 'testcreate',
        price: 0.1,
      })) as ProductDB;
      expect(product.id).toBeDefined();
      testProduct = product;
    });
    it('gets product', async () => {
      expect(get).toBeDefined();
      const { name } = (await get(testProduct.id)) as ProductDB;
      expect(name).toBeDefined();
      expect(name).toBe('testcreate');
    });
    it('updates product', async () => {
      expect(update).toBeDefined();
      const { name } = (await update({
        id: testProduct.id,
        name: 'test update',
        price: 20.0,
      })) as ProductDB;
      expect(name).toBeDefined();
      expect(name).toBe('test update');
    });
    it('removes product', async () => {
      expect(remove).toBeDefined();
      const product = (await remove(testProduct.id)) as ProductDB;
      expect(product).toBeDefined();
      expect(product.id).toBe(testProduct.id);
    });
  });
});
