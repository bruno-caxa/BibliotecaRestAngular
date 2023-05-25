import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { take } from 'rxjs';
import { Book } from 'src/app/books/model/book';

import { BookSellService } from '../../service/booksell.service';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  books: Book[] = [];
  page = 0;
  totalPages = 0;

  constructor(private bookSellService: BookSellService,
              private userService: UserService) { }

  ngOnInit(): void {
   this.loadBooks(0);
  }

  handlePageEvent(e: PageEvent) {
    this.page = e.pageIndex;
    this.loadBooks(this.page);
  }

  loadBooks(page: number) {
    this.userService.getUserStorage()
                    .pipe(take(1))
                    .subscribe(user => {
                      this.bookSellService.booksSoldByUser(user.id, page)
                                          .pipe(take(1))
                                          .subscribe(data => {
                        this.books = data.content;
                        this.totalPages = data.totalElements;
                      });
    });
  }

}
