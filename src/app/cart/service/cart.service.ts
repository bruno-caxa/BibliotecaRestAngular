import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Book } from 'src/app/books/model/book';

import { Cart } from '../model/cart';
import { Add, Delete, Empty } from '../store/cart.actions';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private store: Store<any>) { }

  addItem(book: Book): void {
    this.store.dispatch(Add(book));
  }

  deleteItem(bookId: number): void {
    this.store.dispatch(Delete(bookId));
  }

  emptyCart(): void {
    this.store.dispatch(Empty());
  }


  getCart(): Observable<Cart> {
    return this.store.select('cart');
  }

}
