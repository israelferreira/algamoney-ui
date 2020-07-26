import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotAuthenticatedError } from 'app/security/money-http';

import { MessageService } from 'primeng/api';
@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let message: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      message = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse &&
        errorResponse.status >= 400 && errorResponse.status <= 499) {

      message = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        message = 'Você não tem permissão para executar esta ação';
      }

      try {
        message = errorResponse.error[0].userMessage;
      } catch (e) { }

      console.log('Ocorreu um erro ', errorResponse);

    } else {
      message = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({ severity: 'error', detail: message });
  }
}
