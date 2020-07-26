export class State {
  id: number;
  name: string;
}

export class City {
  id: number;
  name: string;
  state = new State();
}
export class Address {
  street: string;
  number: string;
  complement: string;
  neighbourhood: string;
  zipCode: string;
  city = new City();
}

export class Contact {
  id: number;
  name: string;
  email: string;
  phone: string;

  constructor(id?: number,
    name?: string,
    email?: string,
    phone?: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
  }
}

export class Person {
  id: number;
  name: string;
  active = true;
  address = new Address();
  contacts = new Array<Contact>();
}


export class Category {
  id: number;
}

export class JournalEntry {
  id: number;
  entryType = 'RECEITA';
  description: string;
  dueDate: Date;
  paymentDate: Date;
  amount: number;
  observation: string;
  person = new Person();
  category = new Category();
}
