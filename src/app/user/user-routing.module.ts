import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibraryComponent } from './containers/library/library.component';
import { LoginComponent } from './containers/login/login.component';
import { OrdersComponent } from './containers/orders/orders.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RegisterComponent } from './containers/register/register.component';
import { userAuthenticatedGuard } from './guard/user-authenticated.guard';
import { userUnauthenticatedGuard } from './guard/user-unauthenticated.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [userUnauthenticatedGuard] },
  { path: 'library', component: LibraryComponent, canActivate: [userAuthenticatedGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [userAuthenticatedGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [userAuthenticatedGuard] },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
