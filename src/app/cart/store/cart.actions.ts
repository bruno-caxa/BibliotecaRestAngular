import { Action } from '@ngrx/store';
import { Book } from 'src/app/books/model/book';

export enum CartActionsType {
  Add = '[Cart] Add',
  Delete = '[Cart] Delete',
  Empty = '[Cart] Empty'
}

export const Add = (book: Book) => {
  return <Action>{ type: CartActionsType.Add, payload: book};
}

export const Delete = (bookId: number) => {
  return <Action>{ type: CartActionsType.Delete, payload: bookId};
}

export const Empty = () => {
  return <Action>{ type: CartActionsType.Empty, payload: ''};
}
