import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { JournalEntry } from 'app/core/model';

import * as moment from 'moment';
import { MoneyHttp } from 'app/security/money-http';

export class JournalEntryFilter {
  description: string;
  dueDateFrom: Date;
  dueDateTo: Date;
  page = 0;
  recordsPerPage = 10;
}

@Injectable()
export class JournalentryService {
  journalentriesUrl: string;

  constructor(private http: MoneyHttp) {
    this.journalentriesUrl = `${environment.apiUrl}/journalentries`;
  }

  search(filter: JournalEntryFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filter.page.toString(),
        size: filter.recordsPerPage.toString()
      }
    });

    if (filter.description) {
      params = params.append('description', filter.description);
    }

    if (filter.dueDateFrom) {
      params = params.append('dueDateFrom', moment(filter.dueDateFrom).format('YYYY-MM-DD'));
    }

    if (filter.dueDateTo) {
      params = params.append('dueDateTo', moment(filter.dueDateTo).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.journalentriesUrl}?summary`,
        { params })
      .toPromise()
      .then(response => {
        const journalEntries = response.content;

        const result = {
          journalEntries,
          total: response.totalElements
        };

        return result;
      })
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.journalentriesUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

  create(journalEntry: JournalEntry): Promise<JournalEntry> {
    return this.http.post<JournalEntry>(this.journalentriesUrl, journalEntry)
      .toPromise();
  }

  update(journalEntry: JournalEntry): Promise<JournalEntry> {
    return this.http.put<JournalEntry>(`${this.journalentriesUrl}/${journalEntry.id}`, journalEntry)
      .toPromise()
      .then(response => {
        const editedJournalEntry = response;

        this.convertStringToDate([editedJournalEntry]);

        return editedJournalEntry;
      });
  }

  searchById(id: number): Promise<JournalEntry> {
    return this.http.get<JournalEntry>(`${this.journalentriesUrl}/${id}`)
      .toPromise()
      .then(response => {
        const journalEntry = response;

        this.convertStringToDate([journalEntry]);

        return journalEntry;
      });
  }

  private convertStringToDate(journalEntries: JournalEntry[]) {
    for (const journalEntry of journalEntries) {
      journalEntry.dueDate = moment(journalEntry.dueDate,
        'YYYY-MM-DD').toDate();

      if (journalEntry.paymentDate) {
        journalEntry.paymentDate = moment(journalEntry.paymentDate,
          'YYYY-MM-DD').toDate();
      }
    }
  }



}
