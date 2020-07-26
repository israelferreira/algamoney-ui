import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { CategoryService } from 'app/categories/category.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { PeopleService } from 'app/people/people.service';
import { JournalEntry } from 'app/core/model';
import { JournalentryService } from '../journalentry.service';

@Component({
  selector: 'app-journalentries-register',
  templateUrl: './journalentries-register.component.html',
  styleUrls: ['./journalentries-register.component.css']
})
export class JournalentriesRegisterComponent implements OnInit {

  types = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categories = [];
  people = [];
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private peopleService: PeopleService,
    private journalEntryService: JournalentryService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configForm();

    this.title.setTitle('Novo lançamento');

    const idJournalEntry = this.route.snapshot.params['id'];

    if (idJournalEntry) {
      this.loadJournalEntry(idJournalEntry);
    }

    this.loadCategories();
    this.loadPeople();
  }

  configForm() {
    this.form = this.formBuilder.group({
      id: [],
      entryType: ['RECEITA', Validators.required],
      dueDate: [null, Validators.required],
      paymentDate: [],
      description: [null, [Validators.required, Validators.minLength(5) ]],
      amount: [null, Validators.required],
      person: this.formBuilder.group({
        id: [null, Validators.required],
        name: []
      }),
      category: this.formBuilder.group({
        id: [null, Validators.required],
        name: []
      }),
      observation: []
    });
  }


  get isEditing() {
    return Boolean(this.form.get('id').value);
  }

  loadJournalEntry(id: number) {
    this.journalEntryService.searchById(id)
      .then(journalEntry => {
        this.form.patchValue(journalEntry);
        this.updateEditTitle();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  save() {
    if (this.isEditing) {
      this.updateJournalEntry();
    } else {
      this.addJournalEntry();
    }
  }

  addJournalEntry() {
    this.journalEntryService.create(this.form.value)
      .then(addedJournalEntry => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });
        this.router.navigate(['/journalentries', addedJournalEntry.id]);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  updateJournalEntry() {
    this.journalEntryService.update(this.form.value)
      .then(journalEntry => {
        this.form.patchValue(journalEntry);

        this.messageService.add({ severity: 'success', detail: 'Lançamento editado com sucesso!' });
        this.updateEditTitle();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  loadCategories() {
    return this.categoryService.getAll()
      .then(categories => {
        this.categories = categories.map(c => ({ label: c.name, value: c.id }));
      })
      .catch(error => this.errorHandler.handle(error));
  }

  loadPeople() {
    return this.peopleService.getAll()
      .then(people => {
       this.people = people.map(p => ({ label: p.name, value: p.id }));
    })
    .catch(error => this.errorHandler.handle(error));
  }

  new() {
    this.form.reset();

    setTimeout(function() {
      this.journalEntry = new JournalEntry();
    }.bind(this), 1);

    this.router.navigate(['/journalentries/new']);
  }

  updateEditTitle() {
    this.title.setTitle(`Edição de lançamento: ${this.form.get('description').value}`);
  }
}
