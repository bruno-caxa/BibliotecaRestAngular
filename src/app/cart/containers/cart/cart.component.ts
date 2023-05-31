import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Book } from 'src/app/books/model/book';

import { UserService } from '../../../user/service/user.service';
import { Cart } from '../../model/cart';
import { CartService } from '../../service/cart.service';
import { OrderService } from '../../../books/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart$ = new Observable<Cart>();

  readonly displayedColumns = ['book', 'unitPrice', 'action'];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.cart$ = this.cartService.getCart();
  }

  deleteItem(book: Book) {
    this.cartService.deleteItem(book);
  }

  finalizeOrder(cart: Cart) {
    this.userService.getUserStorage()
                    .pipe(take(1))
                    .subscribe(state => {
                      if(state.loggedIn) {
                        this.orderService.finalizeOrder(cart, state.user)
                                         .pipe(take(1))
                                         .subscribe(() => {
                                          this.router.navigate(['/library']);
                                          this.cartService.emptyCart();
                                          this.snackBar.open('Order completed successfully!', 'close', {duration: 5000});
                                         });
                      } else {
                        this.snackBar.open('To access this page please login!', 'close', {duration: 5000});
                        this.router.navigate(['/login']);
                      }
                    });
  }
}
