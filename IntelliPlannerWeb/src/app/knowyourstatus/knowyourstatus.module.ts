import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnowyourstatusRoutingModule } from './knowyourstatus-routing.module';
import { LoginKnowYourStatusComponent } from './login-know-your-status/login-know-your-status.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { ShowKnowYourStatusComponent } from './show-know-your-status/show-know-your-status.component';

@NgModule({
  declarations: [LoginKnowYourStatusComponent, ShowKnowYourStatusComponent],
  imports: [
    AngularMaterialModule,
    CommonModule,
    KnowyourstatusRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class KnowyourstatusModule { }
