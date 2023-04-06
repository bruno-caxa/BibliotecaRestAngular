import { user } from './../../../user/store/user.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';

import { UserService } from '../../../user/service/user.service';
import { Cart } from '../../model/cart';
import { CartService } from '../../service/cart.service';
import { OrderService } from './../../../user/service/order.service';
import { User } from 'src/app/user/model/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cart$ = new Observable<Cart>();

  private unsubscribe = new Subject<void>;

  readonly displayedColumns = ['book', 'unitPrice', 'action'];

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  deleteItem(bookId: number) {
    this.cartService.deleteItem(bookId);
  }

  finalizeOrder(cart: Cart) {
    if (this.userService.isLoggedIn()) {
      let user = new User();
      this.userService.getUserStorage()
                      .pipe(takeUntil(this.unsubscribe))
                      .subscribe(data => user = data);
      this.ngOnDestroy();
      this.orderService.finalizeOrder(cart, user)
                       .pipe(takeUntil(this.unsubscribe))
                       .subscribe(() => {
        this.router.navigate(['/library']);
        this.cartService.emptyCart();
        this.snackBar.open('Order completed successfully!', 'close', {duration: 5000});
      });

    } else {
      this.snackBar.open('To access this page please login!', 'close', {duration: 5000});
      this.router.navigate(['/login']);
    }
  }
}
