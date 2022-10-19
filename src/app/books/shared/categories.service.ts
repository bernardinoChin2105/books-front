import { Injectable } from '@angular/core';
import { Category } from './category';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiUrl = `${environment.apiBaseUrl}/${environment.endpointsUrl.categories}`;

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    const data: Category[] = [];
    return this.httpClient.get<any[]>(this.apiUrl)
      .pipe(
        map(result => {

          result.map(c => {
            data.push({
              id: c.id,
              name: c.name
            } as Category)
          });

          return data;
        })
      );
  }
}