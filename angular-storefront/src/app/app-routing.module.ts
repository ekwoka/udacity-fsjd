import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: 'collection', component: CollectionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
