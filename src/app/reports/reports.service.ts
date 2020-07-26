import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { MoneyHttp } from '../security/money-http';

@Injectable()
export class ReportsService {

  journalentriesUrl: string;

  constructor(private http: MoneyHttp) {
    this.journalentriesUrl = `${environment.apiUrl}/journalentries`;
  }

  reportJournalEntryByPerson(begin: Date, end: Date) {
    const params = new HttpParams()
      .append('begin', moment(begin).format('YYYY-MM-DD'))
      .append('end', moment(end).format('YYYY-MM-DD'));

    return this.http.get(`${this.journalentriesUrl}/reports/by-person`,
      { params, responseType: 'blob' })
      .toPromise();
  }
}
