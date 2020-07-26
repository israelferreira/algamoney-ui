import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from './../shared/shared.module';
import { PeopleRegisterComponent } from './people-register/people-register.component';
import { PeopleSearchComponent } from './people-search/people-search.component';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleRegisterContactsComponent } from './people-register-contacts/people-register-contacts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    DropdownModule,

    SharedModule,
    PeopleRoutingModule
  ],
  declarations: [
    PeopleRegisterComponent,
    PeopleSearchComponent,
    PeopleRegisterContactsComponent
  ],
  exports: []
})
export class PeopleModule { }
