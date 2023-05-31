import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { take } from 'rxjs';

import { Order } from '../../../books/model/order';
import { OrderService } from '../../../books/service/order.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  page = 0;
  totalPages = 0;

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadOrders(0);
  }

  formatDate(date: Date): string {
    const validDate = new Date(date);
    return validDate.getDate() + '/' + (validDate.getMonth() + 1) + '/' + validDate.getFullYear();
  }

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.loadOrders(this.page);
  }

  loadOrders(page: number) {
    this.userService.getUserStorage()
                    .pipe(take(1))
                    .subscribe(state => {
                      this.orderService.findByIdUserPaginated(state.user.id, page)
                                       .pipe(take(1))
                                       .subscribe(data => {
                                        this.orders = data.content;
                                        this.totalPages = data.totalElements
                                       });
                    });
  }

}
