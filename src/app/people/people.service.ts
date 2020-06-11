import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Person } from 'app/core/model';
import { environment } from 'environments/environment';
import { MoneyHttp } from 'app/security/money-http';

export class PeopleFilter {
  name: string;
  page = 0;
  recordsPerPage = 10;
}

@Injectable()
export class PeopleService {

  peopleUrl: string;

  constructor(private http: MoneyHttp) {
    this.peopleUrl = `${environment.apiUrl}/people`;
  }

  search(filter: PeopleFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filter.page.toString(),
        size: filter.recordsPerPage.toString()
      }
    });

    if (filter.name) {
      params = params.append('name', filter.name);
    }

    return this.http.get<any>(`${this.peopleUrl}`,
        { params})
      .toPromise()
      .then(response => {
        const people = response.content;

        const result = {
          people,
          total: response.totalElements
        };

        return result;
      })
  }

  getAll(): Promise<any> {
    return this.http.get<any>(this.peopleUrl)
    .toPromise()
    .then(response => response.content);
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.peopleUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  changeStatus(id: number, active: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.put(`${this.peopleUrl}/${id}/active`, active, { headers })
      .toPromise()
      .then(() => null);
  }

  create(person: Person): Promise<Person> {
    return this.http.post<Person>(this.peopleUrl, person)
      .toPromise();
  }

  update(person: Person): Promise<Person> {
    return this.http.put<Person>(`${this.peopleUrl}/${person.id}`, person)
      .toPromise();
  }

  searchById(id: number): Promise<Person> {
    return this.http.get<Person>(`${this.peopleUrl}/${id}`)
      .toPromise();
  }


}
