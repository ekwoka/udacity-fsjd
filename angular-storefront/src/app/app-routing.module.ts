import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CollectionComponent } from './components/collection/collection.component';
import { HeroComponent } from './components/hero/hero.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order', component: OrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
