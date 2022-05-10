import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import {
  Product,
  ProductsService,
} from 'src/app/services/products/products.service';

@Component({
  selector: 'storefront-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    image: '',
    description: '',
  };
  rating: Boolean[] = Array.from({ length: 5 }, (_, i) =>
    i < 5 ? true : false
  );
  productID: number = 0;
  loaded: boolean = false;
  addToCart(): void {
    this.cartService.addToCart(this.product);
  }
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productID = Number(this.route.snapshot.paramMap.get('id'));
    this.productsService.productList.subscribe((products: Product[]) => {
      this.product =
        products.find((product: Product) => product.id === this.productID) ||
        this.product;
      this.loaded = true;
    });
  }
}
