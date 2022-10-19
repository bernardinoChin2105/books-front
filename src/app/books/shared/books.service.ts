import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from './book';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from './category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  apiUrl= `${ environment.apiBaseUrl }/${ environment.endpointsUrl.books }`; 

  constructor(private httpClient: HttpClient) {
  }

  getBooks(title: string = '', category: string = ''): Observable<Book[]> {
    const data: Book[] = [];    
    let params = new HttpParams();
    if (category)
      params = params.set('category', category);
    if (title)
      params = params.set('title', title);

    return this.httpClient.get<any[]>(this.apiUrl, { params: params })
      .pipe(
        map(result => {
          result.map(b => {
            data.push({
              id: b.id,
              title: b.title,
              author: b.author,
              year: b.year,
              category: {
                id: b.category.id,
                name: b.category.name
              } as Category,
              rateAverage: b.rateAverage
            } as Book)
          });
          return data;
        })
      );
  }

  postBook(book: Book): Observable<any> {
    return this.httpClient.post(this.apiUrl, {
      title: book.title,
      author: book.author,
      year: +book.year,
      category: book.category
    });

  }

  rateBook(id: string, value: number) {
    return this.httpClient.post(`${this.apiUrl}/${id}/rate`, { value: value });
  }
}