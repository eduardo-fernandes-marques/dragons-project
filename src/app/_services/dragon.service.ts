import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { Dragon } from './../_models/dragon';
import { Response } from '../_models/response';
import { ResponseModel } from '../_models/response-model';


@Injectable({
  providedIn: 'root'
})
export class DragonService {
  url  = environment.apiDragons;
  page = 0;
  size = 10;

  constructor(private http: HttpClient) {}

  list(page: number, size: number): Observable<Response> {
    this.page = page;
    this.size = size;
    const params = new HttpParams()
      .set('page', `${page}`)
      .set('size', `${size}`);

    return this.http.get<Response>(this.url, { params });
  }

  get(slug: string): Observable<Dragon> {
    return this.http.get<Dragon>(`${this.url}/${slug}`);
  }

  create(dragon: Dragon): Observable<Dragon> {
    return this.http.post<Dragon>(this.url, dragon);
  }

  update(dragon: Dragon): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(`${this.url}/${dragon.slug}`, dragon);
  }

  delete(slug: string): Observable<ResponseModel> {
    return this.http.delete<ResponseModel>(`${this.url}/${slug}`);
  }
}
