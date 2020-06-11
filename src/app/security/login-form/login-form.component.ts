import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ) { }

  login(user: string, password: string) {
    this.auth.login(user, password)
      .then(() => {
        this.router.navigate(['/journalentries']);
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }


}
