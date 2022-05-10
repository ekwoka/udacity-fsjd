import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  private productsURL = 'assets/data.json';
  get productList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL);
  }
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
}

export type Product = {
  id: number;
  name: string;
  price: number;
  category?: number;
  image: string;
  description: string;
};
