import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';

import { Category } from '../../model/category';
import { BookService } from './../../service/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnDestroy {

  categories$: Observable<Category[]>;
  formBook = this.formBuilder.group({
    id: 0,
    title: [''],
    image: [''],
    category: new Category(),
    publishingCompany: [''],
    author: [''],
    totalPages: 0,
    unitPrice: 0,
    description: ['']
  });
  imageBook = new FormData();

  private unsubscribe = new Subject<void>;

  constructor(
              private bookService: BookService,
              private formBuilder: NonNullableFormBuilder,
              private snackBar: MatSnackBar
            ) {
    this.categories$ = this.bookService.findAllCategories();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  inputFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.imageBook.append('image', file);
    }
  }

  onSave() {
    let book =  {...this.formBook.value};

    this.bookService.saveImage(this.imageBook)
                    .pipe(takeUntil(this.unsubscribe))
                    .subscribe(data => {
      book.image = data;

      this.bookService.save(book)
                      .pipe(takeUntil(this.unsubscribe))
                      .subscribe(data => {
        this.snackBar.open('Book successfully saved!', 'close', {duration: 5000});
      });
    });

  }

}
