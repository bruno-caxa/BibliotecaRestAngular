import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books' },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(b => b.BooksModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(c => c.CartModule)
  },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then(u => u.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
