import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Contact } from '../../core/model';

@Component({
  selector: 'app-people-register-contacts',
  templateUrl: './people-register-contacts.component.html',
  styleUrls: ['./people-register-contacts.component.css']
})
export class PeopleRegisterContactsComponent {

  @Input() contacts: Array<Contact>;
  contact: Contact;
  showingContactForm = false;
  contactIndex: number;

  constructor() { }

  getNewContact() {
    this.showingContactForm = true;
    this.contact = new Contact();
    this.contactIndex = this.contacts.length;
  }

  getEditContact(contact: Contact, index: number) {
    this.contact = this.cloneContact(contact);
    this.showingContactForm = true;
    this.contactIndex = index;
  }

  confirmContact(form: FormControl) {
    this.contacts[this.contactIndex] = this.cloneContact(this.contact);

    this.showingContactForm = false;

    form.reset();
  }

  removeContact(index: number) {
    this.contacts.splice(index, 1);
  }

  cloneContact(contact: Contact): Contact {
    return new Contact(contact.id,
      contact.name, contact.email, contact.phone);
  }

  get editing() {
    return this.contact && this.contact.id;
  }
}
