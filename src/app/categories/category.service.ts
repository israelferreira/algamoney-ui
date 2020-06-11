import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

import { MoneyHttp } from 'app/security/money-http';


@Injectable()
export class CategoryService {

  categoryUrl: string;

  constructor(private http: MoneyHttp ) {
    this.categoryUrl = `${environment.apiUrl}/categories`;
  }

  getAll(): Promise<any> {
    return this.http.get(this.categoryUrl)
    .toPromise();
  }

}
