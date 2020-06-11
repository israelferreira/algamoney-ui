import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SharedModule } from './../shared/shared.module';
import { PeopleRegisterComponent } from './people-register/people-register.component';
import { PeopleSearchComponent } from './people-search/people-search.component';
import { PeopleRoutingModule } from './people-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,

    SharedModule,
    PeopleRoutingModule
  ],
  declarations: [
    PeopleRegisterComponent,
    PeopleSearchComponent
  ],
  exports: []
})
export class PeopleModule { }
