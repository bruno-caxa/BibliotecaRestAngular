import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { IUserState } from 'src/app/user/store/user.reducer';

import { CartService } from '../../../cart/service/cart.service';
import { Book } from '../../model/book';
import { BookService } from '../../service/book.service';
import { BookSellService } from '../../service/booksell.service';
import { UserService } from './../../../user/service/user.service';
import { BookFormComponent } from './../book-form/book-form.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  userState$ = new Observable<IUserState>();

  books: Book[] = [];
  msg = '';
  page = 0;
  totalPages = 0;

  constructor(
    private bookService: BookService,
    private bookSellService: BookSellService,
    private cartService: CartService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userState$ = this.userService.getUserStorage();
  }

  ngOnInit(): void {
    this.loadBooks(0);
  }

  addInCart(book: Book) {
    this.userState$.pipe(take(1))
                   .subscribe(state => {
                      if (state.loggedIn) {
                        this.bookSellService.userPurchasedBooks(state.user.id, book.id)
                                            .pipe(take(1))
                                            .subscribe(data => {
                                              if (data == 0) {
                                                this.cartService.addItem(book);
                                                this.router.navigate(['/cart']);
                                                this.snackBar.open('Book added to cart successfully!', 'close', {duration: 5000});
                                                return;
                                              }
                                              this.snackBar.open('It is not possible to buy this book, it is already in your library!', 'close', {duration: 5000});
                                              return;
                                            });

                      } else {
                        this.router.navigate(['/login']);
                        this.snackBar.open('Please login!', 'close', {duration: 5000});
                      }
                    });
  }

  changePage(page: number) {
    this.page = page;
    this.loadBooks(page);
  }

  editBook(book: Book) {
    this.openBookForm(book);
  }

  deleteBook(bookId: number) {
    this.bookService.delete(bookId)
                    .pipe(take(1))
                    .subscribe({
                      next: () => {
                        this.snackBar.open('Book deleted successfully!', 'close', {duration: 5000});
                        this.loadBooks(0);
                      },
                      error: (error) => {
                        this.snackBar.open(error.error.error.message, 'close', {duration: 5000});
                      }
                    });
  }

  loadBooks(page: number) {
    this.activatedRoute.queryParams
                       .subscribe(params => {
      if (params['category']) {
        this.msg = ' : ' + params['category'];
        this.bookService.findByCategory(params['category'], page)
                        .pipe(take(1))
                        .subscribe(data => {
          this.books = data.content;
          this.totalPages = data.totalElements;
        });
      } else if (params['searchBook']) {
        this.msg = ' : ' + params['searchBook'];
        this.bookService.findByTitle(params['searchBook'], page)
                        .pipe(take(1))
                        .subscribe(data => {
          this.books = data.content;
          this.totalPages = data.totalElements;
        });
      } else {
        this.msg = '';
        this.bookService.findAllPaginated(page)
                        .pipe(take(1))
                        .subscribe(data => {
          this.books = data.content;
          this.totalPages = data.totalElements;
        });
      }
    });
  }

  openBookForm(book: Book | null) {
    if (book == null) {
      book = new Book();
    }

    const dialogRef = this.dialog.open(BookFormComponent);
    dialogRef.componentInstance.formBook = this.formBuilder.group({
      id: book.id,
      title: book.title,
      image: book.image,
      imageUrl: book.imageUrl,
      category: book.category,
      publishingCompany: book.publishingCompany,
      author: book.author,
      totalPages: book.totalPages,
      unitPrice: book.unitPrice,
      description: book.description
    });

    dialogRef.afterClosed()
             .pipe(take(1))
             .subscribe(c => {
      this.loadBooks(this.page);
    });
  }

}
