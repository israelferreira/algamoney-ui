export class Address {
  street: string;
  number: string;
  complement: string;
  neighbourhood: string;
  zipCode: string;
  city: string;
  state: string;
}

export class Person {
  id: number;
  name: string;
  active = true;
  address = new Address();
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
