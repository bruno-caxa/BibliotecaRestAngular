import { Category } from './../model/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API = 'api/books';

  constructor(private httpClient: HttpClient) { }

  delete(bookId: number): Observable<any> {
    return this.httpClient.delete<any>(this.API + '/' + bookId);
  }

  findAllCategories(): Observable<any> {
    return this.httpClient.get<Category[]>(this.API + '/categories');
  }

  findAllPaginated(page: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/page/' + page);
  }

  findByCategory(category: string, page: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/category/' + category + '/page/' + page);
  }

  findByTitle(title: string, page: number): Observable<any> {
    return this.httpClient.get<any>(this.API + '/title/' + title + '/page/' + page);
  }

  save(book: Partial<Book>): Observable<any> {
    return this.httpClient.post<any>(this.API, book);
  }

  saveImage(image: FormData): Observable<any> {
    return this.httpClient.post(this.API + '/upload', image, {responseType: 'text'} );
  }
}
