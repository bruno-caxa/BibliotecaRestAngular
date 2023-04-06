import { Book } from '../books/model/book';
import { Order } from './order';

export class BookSell {
  id: number = 0;
  book: Book = new Book();
  order: Order = new Order();
}
