import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { CollectionProductComponent } from './components/collection-product/collection-product.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { HeroIconModule, shoppingCart, x, check, star } from 'ng-heroicon';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { SelectComponent } from './components/select/select.component';
import { ToastControllerComponent } from './components/toast-controller/toast-controller.component';
import { ToastItemComponent } from './components/toast-item/toast-item.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    CollectionProductComponent,
    CollectionComponent,
    ButtonPrimaryComponent,
    CartProductComponent,
    SelectComponent,
    ToastControllerComponent,
    ToastItemComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeroIconModule.forRoot(
      { shoppingCart, x, check, star },
      {
        defaultHostDisplay: 'inlineBlock', // default 'none'
        attachDefaultDimensionsIfNoneFound: true, // default 'false'
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
