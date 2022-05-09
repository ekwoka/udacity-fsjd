import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CollectionComponent } from './collection/collection.component';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';
import { HeroIconModule, shoppingCart, x, check } from 'ng-heroicon';
import { CartProductComponent } from './cart-product/cart-product.component';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductComponent,
    CollectionComponent,
    ButtonPrimaryComponent,
    CartProductComponent,
    SelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HeroIconModule.forRoot(
      { shoppingCart, x, check },
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
