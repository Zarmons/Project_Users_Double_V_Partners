import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { UserListComponent } from './users/components/user-list/user-list.component';
import { UserDetailsComponent } from './users/components/user-details/user-details.component';

import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    ChartModule,
    SharedModule,
    CardModule
  ],
  providers: [],
})
export class ModulesModule { }
