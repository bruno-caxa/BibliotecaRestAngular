import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibraryComponent } from './containers/library/library.component';
import { LoginComponent } from './containers/login/login.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RegisterComponent } from './containers/register/register.component';
import { UserAuthenticatedGuard } from './service/user-authenticated.guard';
import { UserUnauthenticatedGuard } from './service/user-unauthenticated.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UserUnauthenticatedGuard] },
  { path: 'library', component: LibraryComponent, canActivate: [UserAuthenticatedGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [UserAuthenticatedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [UserAuthenticatedGuard] },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
