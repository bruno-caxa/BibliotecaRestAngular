import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/cart/model/cart';
import { BookSell } from 'src/app/books/model/book-sell';

import { Order } from '../model/order';
import { User } from '../../user/model/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API = 'api/order';

  constructor(private httpClient: HttpClient) { }

  finalizeOrder(cart: Cart, user: User): Observable<any> {
    const bookSellList = new Array<BookSell>();
    const order = new Order();
    order.user = user;

    for(let i=0; i < cart.books.length; i++) {
      const bookSell = new BookSell();
      order.totalValue += cart.books[i].unitPrice;
      bookSell.book = cart.books[i];
      bookSell.order = order;
      bookSellList.push(bookSell);
    }

    const finalizedOrderDto = {
      order: order,
      booksSell: bookSellList
    }

    return this.httpClient.post<any>(this.API, finalizedOrderDto);
  }

  findByIdUserPaginated(id: number, page: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/user/' + id + '/page/' + page);
  }

}
