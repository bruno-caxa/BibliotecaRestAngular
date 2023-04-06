import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/user/model/user';

import { CartService } from '../../../cart/service/cart.service';
import { Book } from '../../model/book';
import { BookService } from '../../service/book.service';
import { BookSellService } from './../../../user/service/booksell.service';
import { UserService } from './../../../user/service/user.service';
import { BookFormComponent } from './../book-form/book-form.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  books: Book[] = [];
  msg = '';
  page = 0;
  totalPages = 0;
  user = new User();

  private unsubscribe = new Subject<void>;

  constructor(
              private bookService: BookService,
              private bookSellService: BookSellService,
              private cartService: CartService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private formBuilder: NonNullableFormBuilder,
              private snackBar: MatSnackBar
            ) {}

  ngOnInit(): void {
    this.loadBooks(0);
    this.userIsAdmin();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  addInCart(book: Book) {
    this.bookSellService.userPurchasedBooks(this.user.id, book.id)
                        .pipe(takeUntil(this.unsubscribe))
                        .subscribe(data => {
      if (data == 0) {
        this.cartService.addItem(book);
        this.snackBar.open('Book added to cart successfully!', 'close', {duration: 5000});
        this.router.navigate(['/cart']);
        return;
      }
      this.snackBar.open('It is not possible to buy this book, it is already in your library!', 'close', {duration: 5000});
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
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe(data => {
      this.loadBooks(this.page);
      this.snackBar.open('Book deleted successfully!', 'close', {duration: 5000});
    }, error => this.snackBar.open('It is not possible to delete a book that has already been sold!', 'close', {duration: 5000}));
  }

  loadBooks(page: number) {
    this.activatedRoute.queryParams
                       .pipe(takeUntil(this.unsubscribe))
                       .subscribe(params => {
      if (params['category']) {
        this.msg = ' - ' + params['category'];
        this.bookService.findByCategory(params['category'], page)
                        .pipe(takeUntil(this.unsubscribe))
                        .subscribe(data => {
          this.books = data.content;
          this.totalPages = data.totalElements;
        });
      } else if (params['searchBook']) {
        this.msg = ' - ' + params['searchBook'];
        this.bookService.findByTitle(params['searchBook'], page)
                        .pipe(takeUntil(this.unsubscribe))
                        .subscribe(data => {
          this.books = data.content;
          this.totalPages = data.totalElements;
        });
      } else {
        this.msg = '';
        this.bookService.findAllPaginated(page)
                        .pipe(takeUntil(this.unsubscribe))
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
      category: book.category,
      publishingCompany: book.publishingCompany,
      author: book.author,
      totalPages: book.totalPages,
      unitPrice: book.unitPrice,
      description: book.description
    });

    dialogRef.afterClosed()
             .pipe(takeUntil(this.unsubscribe))
             .subscribe(c => {
      this.loadBooks(this.page);
    });
  }

  userIsAdmin() {
    this.userService.getUserStorage()
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe(user => {
      this.user = user;
    });
  }

}
