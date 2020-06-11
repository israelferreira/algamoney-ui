import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotAllowedComponent } from './core/not-allowed/not-allowed.component';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { PeopleSearchComponent } from './people/people-search/people-search.component';
import { JournalentriesSearchComponent } from './journalentries/journalentries-search/journalentries-search.component';

const routes: Routes = [
  {
    path: 'journalentries',
    loadChildren: 'app/journalentries/journalentries.module#JournalentriesModule'
  },
  {
    path: 'people',
    loadChildren: 'app/people/people.module#PeopleModule'
  },

  {
    path: '',
    redirectTo: 'journalentries',
    pathMatch: 'full'
  },
  {
    path: 'not-allowed',
    component: NotAllowedComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  /*
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
