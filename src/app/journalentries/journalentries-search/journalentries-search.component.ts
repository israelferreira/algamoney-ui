import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { JournalentryService, JournalEntryFilter } from '../journalentry.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { AuthService } from 'app/security/auth.service';

@Component({
  selector: 'app-journalentries-search',
  templateUrl: './journalentries-search.component.html',
  styleUrls: ['./journalentries-search.component.css']
})
export class JournalentriesSearchComponent implements OnInit {

  totalElements = 0;
  filter = new JournalEntryFilter();
  journalEntries = [];
  @ViewChild('table', { static: true }) table;

  constructor(
    private journalentryService: JournalentryService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  search(page = 0) {
    this.filter.page = page;

    this.journalentryService.search(this.filter)
      .then(result => {
        this.totalElements = result.total;
        this.journalEntries = result.journalEntries;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  onPageChange(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }

  deleteConfirmation(journalEntry: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.delete(journalEntry);
      }
    });
  }

  delete(journalEntry: any) {
    this.journalentryService.delete(journalEntry.id)
      .then(() => {
        if (this.table.first === 0) {
          this.search();
        } else {
          this.table.first = 0;
        }

        this.toasty.success('Lançamento excluído com sucesso!');
      })
      .catch(error => this.errorHandler.handle(error));
  }


}
