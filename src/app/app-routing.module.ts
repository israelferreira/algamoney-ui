import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotAllowedComponent } from './core/not-allowed/not-allowed.component';
import { PageNotFoundComponent } from './core/page-not-found.component';

const routes: Routes = [
  {
    path: 'journalentries',
    loadChildren: () => import('app/journalentries/journalentries.module').then(m => m.JournalentriesModule)
  },
  {
    path: 'people',
    loadChildren: () => import('app/people/people.module').then(m => m.PeopleModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('app/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
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
 {
    path: '**',
    redirectTo: 'page-not-found'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
