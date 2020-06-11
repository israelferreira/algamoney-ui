import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/security/auth.guard';
import { PeopleSearchComponent } from '../people/people-search/people-search.component';
import { PeopleRegisterComponent } from './people-register/people-register.component';


const routes: Routes = [
  {
    path: '',
    component: PeopleSearchComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SEARCH_PERSON'] }
  },
  {
    path: 'new',
    component: PeopleRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_REGISTER_PERSON'] }
  },
  {
    path: ':id',
    component: PeopleRegisterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_REGISTER_PERSON'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
