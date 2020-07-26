import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { MoneyHttp } from '../security/money-http';

@Injectable()
export class DashboardService {

  journalEntriesUrl: string;

  constructor(private http: MoneyHttp) {
    this.journalEntriesUrl = `${environment.apiUrl}/journalentries`;
  }

  journalEntriesByCategory(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.journalEntriesUrl}/statistics/by-category`)
      .toPromise();
  }

  journalEntriesByDay(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.journalEntriesUrl}/statistics/by-day`)
      .toPromise()
      .then(response => {
        const data = response;
        this.convertStringsToDates(data);

        return data;
      });
  }

  private convertStringsToDates(infos: Array<any>) {
    for (const info of infos) {
      info.day = moment(info.day, 'YYYY-MM-DD').toDate();
    }
  }
}
