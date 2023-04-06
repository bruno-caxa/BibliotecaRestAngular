import { Book } from 'src/app/books/model/book';

import { Cart } from '../model/cart';
import { ActionModel } from '../../model/action.model';
import { CartActionsType } from './cart.actions';

export const cart = new Cart();

export function cartReducer(state: any, action: ActionModel) {
  if (!state) {
    state = cart;
  }

  let stateRef = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CartActionsType.Add:
      if (!stateRef.books.find((book: any) => book.id == action.payload.id)) {
        stateRef.books.push(action.payload);
        stateRef.totalValue = calculateTotal(stateRef.books);
      }
      return stateRef;

    case CartActionsType.Delete:
      stateRef = {...stateRef, books: stateRef.books.filter((book: any) => book.id !== action.payload)};
      return {...stateRef,
                 totalValue: calculateTotal(stateRef.books)
             };

    case CartActionsType.Empty:
      return {
        books: [],
        totalValue: 0
      }

    default:
      return stateRef;
  }

}

function calculateTotal(books: Book[]): number {
  let total: number = 0;
  books.forEach(book => {
    total += book.unitPrice;
  });
  return total;
}
