import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Book } from 'src/app/books/model/book';

import { Cart } from '../model/cart';
import { Add, Delete, Empty } from '../store/cart.actions';
import { ICartState } from '../store/cart.reducer';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private store: Store<{cart: ICartState}>
  ) { }

  addItem(book: Book): void {
    this.store.dispatch(Add({book: book}));
  }

  deleteItem(book: Book): void {
    this.store.dispatch(Delete({book: book}));
  }

  emptyCart(): void {
    this.store.dispatch(Empty());
  }

  getCart(): Observable<Cart> {
   return this.store.select('cart')
              .pipe(map(c => c.cart));
  }

}
