import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './containers/cart/cart.component';

@NgModule({
  declarations: [ CartComponent ],
  imports: [
    CartRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class CartModule { }
