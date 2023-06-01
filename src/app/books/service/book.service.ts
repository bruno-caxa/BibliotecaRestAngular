import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Book } from '../model/book';
import { Category } from './../model/category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API = 'api/books';

  constructor(private httpClient: HttpClient) { }

  delete(bookId: number): Observable<any> {
    return this.httpClient.delete<any>(environment.API + this.API + '/' + bookId);
  }

  findAllCategories(): Observable<any> {
    return this.httpClient.get<Category[]>(environment.API + this.API + '/categories');
  }

  findAllPaginated(page: number): Observable<any> {
    return this.httpClient.get<any>(environment.API + this.API + '/page/' + page);
  }

  findByCategory(category: string, page: number): Observable<any> {
    return this.httpClient.get<any>(environment.API + this.API + '/category/' + category + '/page/' + page);
  }

  findByTitle(title: string, page: number): Observable<any> {
    return this.httpClient.get<any>(environment.API + this.API + '/title/' + title + '/page/' + page);
  }

  save(book: Partial<Book>): Observable<Book> {
    return this.httpClient.post<Book>(environment.API + this.API, book);
  }
}
