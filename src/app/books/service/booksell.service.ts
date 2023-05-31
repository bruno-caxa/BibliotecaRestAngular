import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookSellService {

  private readonly API = 'api/booksell';

  constructor(private httpClient: HttpClient) { }

  booksSoldByUser(id_user: number, page: number): Observable<any> {
    return this.httpClient.get<any>(environment + this.API + '/user/' + id_user + '/page/' + page);
  }

  userPurchasedBooks(id_user: number, id_book: number): Observable<number> {
    return this.httpClient.get<any>(environment + this.API + '/user/' + id_user + '/book/' + id_book);
  }
}
