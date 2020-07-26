import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import localePt from '@angular/common/locales/pt';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from 'app/security/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { JournalentryService } from '../journalentries/journalentry.service';
import { PeopleService } from '../people/people.service';
import { CategoryService } from 'app/categories/category.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';
import { MoneyHttp } from 'app/security/money-http';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { ReportsService } from 'app/reports/reports.service';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    ToastModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    NotAllowedComponent
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    JournalentryService,
    PeopleService,
    ErrorHandlerService,
    CategoryService,
    AuthService,
    MoneyHttp,
    DashboardService,
    ReportsService,

    ConfirmationService,
    MessageService,
    JwtHelperService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
