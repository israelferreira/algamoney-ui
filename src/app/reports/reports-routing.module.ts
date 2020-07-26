import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsJournalentriesComponent } from './reports-journalentries/reports-journalentries.component';
import { AuthGuard } from '../security/auth.guard';

const routes: Routes = [
  {
    path: 'journalentries',
    component: ReportsJournalentriesComponent,
    canActivate: [ AuthGuard ],
    data: { roles: ['ROLE_SEARCH_JOURNALENTRY'] }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
