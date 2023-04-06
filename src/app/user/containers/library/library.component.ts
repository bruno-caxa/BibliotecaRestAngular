import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Book } from 'src/app/books/model/book';
import { Order } from 'src/app/model/order';

import { OrderService } from './../../service/order.service';
import { BookSellService } from '../../service/booksell.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  books: Book[] = [];
  page = 0;
  totalPages = 0;

  constructor(private bookSellService: BookSellService) { }

  ngOnInit(): void {
   this.loadBooks(0);
  }

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.loadBooks(this.page);
  }

  loadBooks(page: number) {
    this.bookSellService.booksSoldByUser(2, page)
                        .pipe()
                        .subscribe(data => {
      this.books = data.content;
      this.totalPages = data.totalElements;
    });
  }

}
