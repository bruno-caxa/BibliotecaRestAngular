import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { SharedModule } from '../shared/shared.module';
import { LibraryComponent } from './containers/library/library.component';
import { LoginComponent } from './containers/login/login.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RegisterComponent } from './containers/register/register.component';
import { UserFormComponent } from './containers/user-form/user-form.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [ LoginComponent, LibraryComponent, OrdersComponent, ProfileComponent, RegisterComponent, UserFormComponent ],
  imports: [
    CommonModule,
    NgxMaskModule.forChild(),
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
