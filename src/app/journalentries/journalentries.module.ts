import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxCurrencyModule } from 'ngx-currency';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from './../shared/shared.module';
import { JournalentriesRegisterComponent } from './journalentries-register/journalentries-register.component';
import { JournalentriesSearchComponent } from './journalentries-search/journalentries-search.component';
import { JournalEntriesRoutingModule } from './journalentries-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    NgxCurrencyModule,

    SharedModule,
    JournalEntriesRoutingModule
  ],
  declarations: [
    JournalentriesRegisterComponent,
    JournalentriesSearchComponent
  ],
  exports: []
})
export class JournalentriesModule { }
