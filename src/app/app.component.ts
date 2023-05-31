import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject, take, takeUntil } from 'rxjs';

import { Category } from './books/model/category';
import { BookService } from './books/service/book.service';
import { CartService } from './cart/service/cart.service';
import { UserService } from './user/service/user.service';
import { IUserState } from './user/store/user.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;
  userState$ = new Observable<IUserState>();

  destroy$: Subject<boolean> = new Subject<boolean>();

  bookSearch = '';
  cartSize = 0;
  show = false;

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.categories$ = this.bookService.findAllCategories();
    this.userState$ = this.userService.getUserStorage();
  }

  ngOnInit(): void {
    this.loadCartSize();
    this.loadUserByToken();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  loadCartSize() {
    this.cartService.getCart()
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(cart => {
                      this.cartSize = cart.books.length;
                    });
  }

  loadUserByToken() {
    const token = localStorage.getItem('token');

    if (token != null) {
      this.userService.findByToken(token)
                      .pipe(take(1))
                      .subscribe({
                        next: (user) => {
                          this.userService.loadUserInStore(user);
                        },
                        error: () => {
                          this.userService.logout();
                          this.snackBar.open('Invalid token, please login again!', 'close', {duration: 5000});
                          this.router.navigate(['/login']);
                        }
                      });
    }
  }

  logout() {
    this.userService.logout();
    this.snackBar.open('Logout successful!', 'close', {duration: 5000});
    this.router.navigate(['/login']);
  }

  openSidenavResponsible() {
    const menuSection = document.querySelector(".menu-section");
    menuSection?.classList.toggle("on", this.show);
    document.body.style.overflow = this.show ? 'hidden' : 'initial';
    this.show = !this.show;
  }

}
