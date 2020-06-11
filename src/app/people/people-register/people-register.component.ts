import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from 'app/core/error-handler.service';
import { PeopleService } from 'app/people/people.service';
import { Person } from 'app/core/model';

@Component({
  selector: 'app-people-register',
  templateUrl: './people-register.component.html',
  styleUrls: ['./people-register.component.css']
})
export class PeopleRegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private peopleService: PeopleService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configForm();

    this.title.setTitle('Nova pessoa');

    const idPerson = this.route.snapshot.params['id'];

    if (idPerson) {
      this.loadPerson(idPerson);
    }
  }

  configForm() {
    this.form = this.formBuilder.group({
      id: [],
      active: [true],
      name: [null, [Validators.required, Validators.minLength(5)]],
      address: this.formBuilder.group({
        street: [null, Validators.required],
        number: [null, Validators.required],
        complement: [],
        neighbourhood: [null, Validators.required],
        zipCode: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required]
      })
    });
  }

  get isEditing() {
    return Boolean(this.form.get('id').value);
  }

  loadPerson(id: number) {
    this.peopleService.searchById(id)
      .then(person => {
        this.form.patchValue(person);
        this.updateEditTitle();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  save() {
    if (this.isEditing) {
      this.updatePerson();
    } else {
      this.addPerson();
    }
  }

  addPerson() {
    this.peopleService.create(this.form.value)
    .then(() => {
      this.toasty.success('Pessoa adicionada com sucesso');
      this.form.reset();
    })
    .catch(error => this.errorHandler.handle(error));
  }

  updatePerson() {
    this.peopleService.update(this.form.value)
      .then(person => {
        this.form.patchValue(person);

        this.toasty.success('Pessoa editado com sucesso!');
        this.updateEditTitle();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  new() {
    this.form.reset();

    setTimeout(function() {
      this.person = new Person();
    }.bind(this), 1);

    this.router.navigate(['/people/new']);
  }

  updateEditTitle() {
    this.title.setTitle(`Edição de pessoa: ${this.form.get('name').value}`);
  }
}
