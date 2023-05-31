import { BookSell } from './book-sell';
import { User } from "src/app/user/model/user";

export class Order {
  id: number = 0;
  user: User = new User();
  date: Date = new Date();
  totalValue: number = 0;
  booksSell: BookSell[] = [];
}
