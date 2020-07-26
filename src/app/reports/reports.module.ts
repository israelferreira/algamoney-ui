import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from './../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsJournalentriesComponent } from './reports-journalentries/reports-journalentries.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,

    SharedModule,
    ReportsRoutingModule
  ],
  declarations: [ReportsJournalentriesComponent]
})
export class ReportsModule { }
