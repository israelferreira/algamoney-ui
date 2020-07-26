import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'app/core/error-handler.service';
import { PeopleService } from 'app/people/people.service';
import { Person } from 'app/core/model';

@Component({
  selector: 'app-people-register',
  templateUrl: './people-register.component.html',
  styleUrls: ['./people-register.component.css']
})
export class PeopleRegisterComponent implements OnInit {

  person = new Person();
  states: any[];
  cities: any[];
  selectedState: number;

  constructor(
    private peopleService: PeopleService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova pessoa');

    const idPerson = this.route.snapshot.params['id'];

    this.loadStates();

    if (idPerson) {
      this.loadPerson(idPerson);
    }
  }

  loadStates() {
    this.peopleService.getAllStates().then(list => {
      this.states = list.map(s => ({ label: s.name, value: s.id }));
    })
    .catch(error => this.errorHandler.handle(error));
  }

  loadCities() {
    this.peopleService.searchCities(this.selectedState).then(list => {
      this.cities = list.map(c => ({ label: c.name, value: c.id }));
    })
    .catch(error => this.errorHandler.handle(error));
  }

  get isEditing() {
    return Boolean(this.person.id);
  }

  loadPerson(id: number) {
    this.peopleService.searchById(id)
      .then(person => {
        this.person = person;

        this.selectedState = (this.person.address.city) ?
            this.person.address.city.state.id : null;

        if (this.selectedState) {
          this.loadCities();
        }

        this.updateEditTitle();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  save(form: FormControl) {
    if (this.isEditing) {
      this.updatePerson(form);
    } else {
      this.addPerson(form);
    }
  }

  addPerson(form: FormControl) {
    this.peopleService.create(this.person)
    .then((addedPerson) => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso' });
      this.router.navigate(['/people', addedPerson.id]);
    })
    .catch(error => this.errorHandler.handle(error));
  }

  updatePerson(form: FormControl) {
    this.peopleService.update(this.person)
      .then(person => {
        this.person = person;

        this.messageService.add({ severity: 'success', detail: 'Pessoa editada com sucesso!' });
        this.updateEditTitle();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  new(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.person = new Person();
    }.bind(this), 1);

    this.router.navigate(['/people/new']);
  }

  updateEditTitle() {
    this.title.setTitle(`Edição de pessoa: ${this.person.name}`);
  }
}
