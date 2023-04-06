import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './containers/book-form/book-form.component';
import { BookComponent } from './containers/book/book.component';



@NgModule({
  declarations: [ BookComponent, BookListComponent, BookFormComponent ],
  imports: [
    BooksRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class BooksModule { }
