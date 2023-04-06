import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { UserService } from '../../service/user.service';
import { Order } from './../../../model/order';
import { OrderService } from './../../service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  page = 0;
  totalPages = 0;

  userSubscription = new Subscription();
  orderSubscription = new Subscription();

  constructor(private orderService: OrderService,
              private userService: UserService,) { }

  ngOnInit(): void {
    this.loadOrders(0);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
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
    this.ngOnDestroy();
    this.userSubscription = this.userService.getUserStorage().subscribe(user => {
      this.orderSubscription = this.orderService.findByIdUserPaginated(user.id, page).subscribe(data => {
        this.orders = data.content;
        this.totalPages = data.totalElements;
      });
    });
  }

}
