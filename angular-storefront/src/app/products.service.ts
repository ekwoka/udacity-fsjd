import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  get productList() {
    return [...productList];
  }
}

export type Product = {
  id: number;
  name: string;
  price: number;
  category?: number;
};

const productList: Product[] = [
  {
    id: 1,
    name: 'Iron Suit',
    price: 12,
  },
  {
    id: 2,
    name: 'Green Fists',
    price: 11,
  },
];
