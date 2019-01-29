import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { Dragon } from './../_models/dragon';
import { Response } from './../_models/response';

const url  = environment.apiDragons;

@Injectable({
  providedIn: 'root'
})
export class DragonService {
  page = 0;
  size = 10;

  constructor(private http: HttpClient) {}

  list(page: number, size: number): Observable<Response> {
    this.page = page;
    this.size = size;
    const params = new HttpParams()
      .set('page', `${page}`)
      .set('size', `${size}`);

    return this.http.get<Response>(url, { params });
  }

  get(id: string): Observable<Dragon> {
    return this.http.get<Dragon>(`${url}/${id}`);
  }

  create(dragon: Dragon): Observable<Dragon> {
    return this.http.post<Dragon>(url, dragon);
  }

  update(dragon: Dragon): Observable<Dragon> {
    return this.http.put<Dragon>(`${url}/${dragon.slug}`, dragon);
  }

  delete(id: string): Observable<Dragon> {
    return this.http.delete<Dragon>(`${url}/${id}`);
  }
}
