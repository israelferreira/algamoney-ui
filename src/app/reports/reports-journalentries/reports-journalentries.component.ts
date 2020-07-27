import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reports-journalentries',
  templateUrl: './reports-journalentries.component.html',
  styleUrls: ['./reports-journalentries.component.css']
})
export class ReportsJournalentriesComponent implements OnInit {

  periodBegin: Date;
  periodEnd: Date;

  constructor(
    private reportsService: ReportsService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Gerar relatório');
  }

  generate() {
    this.reportsService.reportJournalEntryByPerson(this.periodBegin, this.periodEnd)
      .then(report => {
        const url = window.URL.createObjectURL(report);

        window.open(url);
      });
  }


}
