import { Book } from '../../books/model/book';

export class Cart {
  books: Book[] = [];
  totalValue: number = 0;
}
