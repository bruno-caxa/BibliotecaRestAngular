import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/books/model/book';

export enum CartActionsType {
  Add = '[Cart] Add',
  Delete = '[Cart] Delete',
  Empty = '[Cart] Empty'
}

export const Add = createAction(CartActionsType.Add,
                         props<{book: Book}>());

export const Delete = createAction(CartActionsType.Delete,
                            props<{book: Book}>());

export const Empty = createAction(CartActionsType.Empty);
