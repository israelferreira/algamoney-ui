import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-allowed',
  template: `
  <div class="container">
    <h1 style="font-size: 40px;">Acesso negado!</h1>
  </div>
  `,
  styles: []
})
export class NotAllowedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
