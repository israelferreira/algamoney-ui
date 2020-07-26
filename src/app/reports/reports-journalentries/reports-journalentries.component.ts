import { Component } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-reports-journalentries',
  templateUrl: './reports-journalentries.component.html',
  styleUrls: ['./reports-journalentries.component.css']
})
export class ReportsJournalentriesComponent {

  periodBegin: Date;
  periodEnd: Date;

  constructor(private reportsService: ReportsService) { }

  generate() {
    this.reportsService.reportJournalEntryByPerson(this.periodBegin, this.periodEnd)
      .then(report => {
        const url = window.URL.createObjectURL(report);

        window.open(url);
      });
  }


}
