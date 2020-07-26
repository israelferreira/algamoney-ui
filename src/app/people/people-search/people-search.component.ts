import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';

import { PeopleService, PeopleFilter } from '../people.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { AuthService } from 'app/security/auth.service';

@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: ['./people-search.component.css']
})
export class PeopleSearchComponent implements OnInit {

  totalElements = 0;
  filter = new PeopleFilter();
  people = [];
  @ViewChild('table', { static: true }) table;

  constructor(
    private peopleService: PeopleService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de pessoas');
  }

  search(page = 0) {
    this.filter.page = page;

    this.peopleService.search(this.filter)
      .then(result => {
        this.totalElements = result.total;
        this.people = result.people;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  onPageChange(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }

  deleteConfirmation(people: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.delete(people);
      }
    });
  }

  delete(people: any) {
    this.peopleService.delete(people.id)
      .then(() => {
        if (this.table.first === 0) {
          this.search();
        } else {
          this.table.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' });
      })
      .catch(error => this.errorHandler.handle(error));
  }

  changeStatus(people: any): void {
    const newStatus = !people.active;

    this.peopleService.changeStatus(people.id, newStatus)
    .then(() => {
      const action = newStatus ? 'ativada' : 'desativada';

      people.active = newStatus;
      this.messageService.add({ severity: 'success', detail: `Pessoa ${action} com sucesso!` });
    })
    .catch(error => this.errorHandler.handle(error));
  }


}
