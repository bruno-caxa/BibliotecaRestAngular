import { createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/books/model/book';

import { Cart } from '../model/cart';
import { Add, Delete, Empty } from './cart.actions';

export interface ICartState {
  cart: Cart;
}

export const cartInitialState: ICartState = {
  cart: new Cart()
}

export const cartReducer = createReducer(
  cartInitialState,
  on(Add, (state, payload) => {
    let stateRef = JSON.parse(JSON.stringify(state));

    if (!stateRef.cart.books.find((book: any) => book.id == payload.book.id)) {
      stateRef.cart.books.push(payload.book);
    }
    stateRef.cart.totalValue = calculateTotal(stateRef.cart.books);
    return stateRef;
  }),
  on(Delete, (state, payload) => {
    let stateRef = JSON.parse(JSON.stringify(state));

    stateRef.cart = {...stateRef.cart,
                        books: stateRef.cart.books.filter((book: any) => book.id !== payload.book.id),
                    };

    stateRef.cart = {...stateRef.cart,
                        totalValue: calculateTotal(stateRef.cart.books)};

    return stateRef
  }),
  on(Empty, () => {
    return cartInitialState;
  })
)

function calculateTotal(books: Book[]): number {
  let total: number = 0;
  books.forEach(book => {
    total += book.unitPrice;
  });
  return total;
}
