import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Category } from './books/model/category';
import { BookService } from './books/service/book.service';
import { CartService } from './cart/service/cart.service';
import { User } from './user/model/user';
import { UserService } from './user/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  bookSearch = '';
  categories$: Observable<Category[]>;
  cartSize = 0;
  user$ = new Observable<User>();

  private unsubscribe = new Subject<void>;

  constructor(
              private bookService: BookService,
              private cartService: CartService,
              private userService: UserService,
              private snackBar: MatSnackBar
             ) {
    this.categories$ = this.bookService.findAllCategories();
    this.user$ = this.userService.getUserStorage();
  }

  ngOnInit(): void {
    this.cartService.getCart()
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe(data => {
      if (data) {
        this.cartSize = data.books.length;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  logout() {
    this.snackBar.open('User logged out successfully!', 'close', {duration: 5000});
    this.userService.logout();
  }
}
