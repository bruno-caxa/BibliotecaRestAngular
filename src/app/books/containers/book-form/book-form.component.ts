import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, take } from 'rxjs';
import { UploadImageRequest } from 'src/app/s3aws/model/upload-image-request';
import { S3AwsService } from 'src/app/s3aws/service/s3-aws-service';

import { Book } from '../../model/book';
import { Category } from '../../model/category';
import { ImageReference } from './../../model/image-reference';
import { BookService } from './../../service/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {

  categories$: Observable<Category[]>;

  formBook = this.formBuilder.group({
    id: 0,
    title: [''],
    image: new ImageReference(),
    imageUrl: [''],
    category: new Category(),
    publishingCompany: [''],
    author: [''],
    totalPages: 0,
    unitPrice: 0,
    description: ['']
  });

  imageFormData = new FormData();

  constructor(
    private bookService: BookService,
    private s3AwsService: S3AwsService,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.categories$ = this.bookService.findAllCategories();
  }

  imageInputChange(event: any) {
    this.imageFormData.delete('image');
    const pictureImage = document.querySelector('.picture-image');

    if (pictureImage) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        this.imageFormData.append('image', file);

        const reader = new FileReader();
          reader.addEventListener('load', function(e) {
            const readerTarget = e.target;

            if (readerTarget?.result) {
              const img = document.createElement('img');
              img.src = readerTarget.result.toString();
              pictureImage.innerHTML = '';
              pictureImage.appendChild(img);
            }
          });
          reader.readAsDataURL(file);
          return;
      }
      pictureImage.innerHTML = '';
      pictureImage.innerHTML = 'Choose an Image!';
    }
  }

  onSave() {
    let book =  {...this.formBook.value};
    const imageData = this.imageFormData.get('image');
    this.snackBar.open('Book "' + book.title + '" saved successfully!', 'close', {duration: 5000});

    if (imageData !== null && imageData instanceof File) {
      this.uploadImageBook(book, imageData);
      return;
    }

    this.bookService.save(book);
  }

  uploadImageBook(book: Partial<Book>, imageData: File) {
    const uploadImageRequest = new UploadImageRequest(imageData.name, imageData.type, imageData.size);

    this.s3AwsService.imageUploadRequest(uploadImageRequest, imageData)
                     .pipe(take(1))
                     .subscribe(result => {
                        const imageReference = new ImageReference();
                        if (book.image) {
                          if (book.image.id != 0) {
                            imageReference.id = book.image.id;
                          }
                        }
                        imageReference.name = imageData.name;
                        imageReference.contentType = imageData.type;
                        imageReference.contentLength = imageData.size;

                        const imageUrl = 'https://bibliotecarestimages.s3.amazonaws.com/images/' + imageData.name;
                        book.image = imageReference;
                        book.imageUrl = imageUrl;
                        this.bookService.save(book);
                      });
  }

}
