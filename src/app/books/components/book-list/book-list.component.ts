import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Book } from '../../model/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @Input() books: Book[] = [];
  @Input() isAdmin = false;
  @Input() totalPages = 0;

  @Output() addInCart = new EventEmitter();
  @Output() changePage = new EventEmitter();
  @Output() editBook = new EventEmitter();
  @Output() deleteBook = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  handlePageEvent(e: PageEvent) {
    this.changePage.emit(e.pageIndex);
  }

  onAddInCart(book: Book) {
    this.addInCart.emit(book);
  }

  onDeleteBook(bookId: number) {
    this.deleteBook.emit(bookId);
  }

  onEditBook(book: Book) {
    this.editBook.emit(book);
  }

}
