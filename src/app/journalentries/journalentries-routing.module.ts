import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/security/auth.guard';
import { JournalentriesSearchComponent } from '../journalentries/journalentries-search/journalentries-search.component';
import { JournalentriesRegisterComponent } from '../journalentries/journalentries-register/journalentries-register.component';

const routes: Routes = [
  {
    path: '',
    component: JournalentriesSearchComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SEARCH_JOURNALENTRY'] }
  },
  {
    path: 'new',
    component: JournalentriesRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_REGISTER_JOURNALENTRY'] }
  },
  {
    path: ':id',
    component: JournalentriesRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_REGISTER_JOURNALENTRY'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalEntriesRoutingModule { }
